import { NextRequest, NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { AIChatMessage, HumanChatMessage } from 'langchain/schema'
import { ChatOpenAI } from 'langchain/chat_models/openai'


export async function POST(req: NextRequest) {
  const body = await req.json()

  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  })

  const index = client.Index('mud-docs');

  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(body)
  let queryResponse = await index.query({
    queryRequest: {
      topK: 10,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });

  const llm = new ChatOpenAI({
    maxTokens: 2000,
    modelName: "gpt-3.5-turbo",
  });


  if (queryResponse.matches?.length) {


    const chain = loadQAStuffChain(llm);
    const concatenatedPageContent = queryResponse.matches
      .map((match) => (match.metadata as { pageContent: string }).pageContent)
      .join(" ");

    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: body,
    });


    return NextResponse.json({
      data: result.text
    })
  } else {
    return NextResponse.json({
      data: 'no matches'
    })
  }

}
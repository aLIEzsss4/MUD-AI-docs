const express = require('express');
const app = express();
require('dotenv').config()

const { PineconeClient } = require('@pinecone-database/pinecone');

const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

const { loadQAStuffChain } = require('langchain/chains');

const { Document } = require('langchain/document');

const { ChatOpenAI } = require('langchain/chat_models/openai');


let index = ''

const init = async () => {
  const client = new PineconeClient();

  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
  });

  index = client.Index('mud-docs');
}






app.get('/', async (req, res) => {



  let params = req.query;

  console.log('Received params:', params);

  try {

    const queryEmbedding = await new OpenAIEmbeddings().embedQuery(params.query);

    let queryResponse = await index.query({
      queryRequest: {
        topK: 5,
        vector: queryEmbedding,
        includeMetadata: true,
        includeValues: true,
      },
    });

    const llm = new ChatOpenAI({
      maxTokens: 2000,
      modelName: 'gpt-3.5-turbo',
    });
    //   console.log(queryEmbedding,'queryEmbedding')

    //   console.log(`Found ${queryResponse.matches.length} matches...`);

    console.log(`Asking question: ${params.query}...`);

    if (queryResponse.matches?.length) {
      const chain = loadQAStuffChain(llm);

      const concatenatedPageContent = queryResponse.matches
        .map((match) => match.metadata.pageContent)
        .join(' ');

      const result = await chain.call({
        input_documents: [new Document({ pageContent: concatenatedPageContent })],
        question: params.query,
      });
      console.log(result)

      return res.json({
        data: result.text
      });

    } else {
      console.log('Since there are no matches');

      res.status(404).send('No result found');
    }
  } catch (error) {
    console.log(error)
    res.status(404).send('Error');

  }


});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);

  init()

});
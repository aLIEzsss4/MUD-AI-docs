import { IconSpinner } from "@/ui/icons";
import { MessagesContent } from "@/hooks/useQAlangchain";
import cx from "classnames";


interface MessagesProps {
  messages: MessagesContent[]
  isLoading: boolean
}

interface MessagePorps {
  message: MessagesContent
}


const Message = ({ message}: MessagePorps) => {
  return (
    <p className={cx("leading-normal text-muted-foreground whitespace-pre-line", {
      'font-semibold': message.role == 'user',
      'mb-2': message.role !== 'user',
      'text-user':message.role == 'user',
    })}>
      {message.content}
    </p>
  )
}



export default function Messages({ messages, isLoading }: MessagesProps) {
  return (
    <div className={'pb-[200px] pt-4 md:pt-20'}>
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg border bg-background p-8">
          <h1 className="mb-2 text-lg font-semibold">
            <a href="/mud" target="_blank" className="h-auto p-0 text-mud mr-2">MUD</a>
            AI Docs!
          </h1>
          <p className="mb-4 leading-normal text-muted-foreground">
            Ask me questions about MUD and I will answer you like ChatGPT.
          </p>
          {messages?.map(message => (
            <Message key={message.content} message={message}  />
          )
          )}
          {isLoading && <IconSpinner />}
        </div>
      </div>
    </div>
  );
}

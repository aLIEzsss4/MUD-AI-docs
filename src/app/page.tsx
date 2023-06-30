'use client'
import ChatPanel from '@/ui/chat-bottom'
import { useQAlangchain } from "@/hooks/useQAlangchain";
import Made from '@/ui/made'
import Messages from '@/ui/messages';

export default function Chat() {
  const { isLoading, messages, input, setInput, onSubmit } = useQAlangchain()


  return (
    <>
      <Made />
      <Messages messages={messages} isLoading={isLoading} />
      <ChatPanel isLoading={isLoading} input={input} setInput={setInput} onSubmit={onSubmit} />
    </>

  )
}
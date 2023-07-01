'use client'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { Button, buttonVariants } from './button'
import { IconArrowElbow, } from './icons'
import { cn } from '../lib/utils'

import { ChatPanelProps } from './chat-bottom'
import Image from 'next/image'

import MUDimg from '@/app/logo512-black.png'

export interface PromptProps extends ChatPanelProps {

}


export default function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <div className={cn(
          buttonVariants({ size: 'sm', variant: 'outline' }),
          'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
        )}>
          <Image src={MUDimg} alt='MUD' width={30} height={30} />

        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e =>isLoading?null:setInput(e.target.value)}
          placeholder="Ask MUD AI"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || input === ''}
          >
            <IconArrowElbow />
            <span className="sr-only">Ask MUD AI</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

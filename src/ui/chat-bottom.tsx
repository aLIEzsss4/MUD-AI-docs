
import PromptForm from './prompt-form'
import {  IconSpinner } from './icons'

export interface ChatPanelProps {
  input: string
  setInput: (value: string) => void
  onSubmit: (value: string) => void
  isLoading: boolean
}

export default function ChatPanel({
  isLoading,
  onSubmit,
  input,
  setInput,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading && (
            <IconSpinner className="mr-2 animate-spin" />
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4" style={{background:'#fff'}}>
          <PromptForm
            onSubmit={onSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

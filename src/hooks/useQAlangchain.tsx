import {
  useState
} from 'react'

export interface MessagesContent {
  content: string;
  role: 'system' | 'user';
}

export function useQAlangchain() {

  const [query, setQuery] = useState<string>('')
  const [result, setResult] = useState<MessagesContent[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function sendQuery(input: string) {
    if (!input) return
    setResult(result => [...result, { role: 'user', content: input }])
    setLoading(true)
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_SEVER_URL}/api?query=${JSON.stringify(input)}`, {
        method: "GET",
      })
      const json = await result.json()
      setResult(result => [...result, { role: 'system', content: json.data }])
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }


  return {
    isLoading: loading,
    messages: result,
    input: query,
    setInput: setQuery,
    onSubmit: sendQuery,
  }
}
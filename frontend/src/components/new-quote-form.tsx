import { useState } from 'react'
import { useQuotes } from '../contexts/QuotesContext'

const NewQuoteForm = () => {
  const { saveQuote, refetchQuotes } = useQuotes()

  const [quote, setQuote] = useState<{
    text: string
    tags: string[]
  }>({
    text: '',
    tags: []
  })
  const handleTags = (e: React.FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value || ''

    setQuote({
      ...quote,
      tags: [...new Set(string.split(',').map(tag => tag.trim()))]
    })
  }
  const handleText = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setQuote({ ...quote, text: e.currentTarget.value })
  }

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await saveQuote(quote.text, quote.tags)
    setQuote({ text: '', tags: [] })
    refetchQuotes()
  }
  return (
    <div className="w-1/3 flex flex-col space-y-2 p-4 m-2 mt-0 items-start rounded-xl bg-white border-2 border-gray-700">
      <label className="flex space-x-2 w-full">
        <span className="w-12 mt-2 text-sm font-bold">Quote</span>
        <textarea
          name="text"
          id="body"
          value={quote.text}
          onChange={handleText}
          className="w-full rounded-xl focus:outline-none border-2 border-gray-700 shadow-solid p-4"
          placeholder="Add a new quote"
        />
      </label>
      <div className="w-full flex space-x-6">
        <label className="flex space-x-2 w-full">
          <span className="w-12 mt-2 text-sm font-bold">Tags</span>
          <input
            type="text"
            name="tags"
            id="tags"
            value={quote.tags}
            onChange={handleTags}
            className="h-12 w-full rounded-xl focus:outline-none border-2 border-gray-700 shadow-solid p-4"
            placeholder="Comma-separated list of tags"
          />
        </label>
        <button
          id="save-quote"
          onClick={submit}
          className="h-12 text-sm font-bold rounded-xl bg-white px-4 py-1 shadow-solid transition duration-300 ease-in-out hover:shadow-none hover:translate-x-2 hover:translate-y-2 border-2 border-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default NewQuoteForm

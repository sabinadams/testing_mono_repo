import type { Quote as IQuote } from '../types'
import { useQuotes } from '../contexts/QuotesContext'
interface Props {
  quote: IQuote
}

const Quote = ({ quote }: Props) => {
  const { deleteQuote } = useQuotes()

  const getContrastYIQ = (hexcolor: string) => {
    const r = parseInt(hexcolor.substring(1, 3), 16)
    const g = parseInt(hexcolor.substring(3, 5), 16)
    const b = parseInt(hexcolor.substring(5, 7), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? 'black' : 'white'
  }

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteQuote(quote.id)
    }
  }

  return (
    <div
      key={quote.id}
      className="relative bg-white rounded-md shadow-solid p-4 transition duration-300 ease-in-out hover:shadow-none hover:translate-x-2 hover:translate-y-2 border-2 border-gray-700"
    >
      <button
        className="absolute top-2 right-4"
        onClick={handleDelete}
        id={`delete-${quote.id}`}
      >
        🗑
      </button>
      <p className="text-gray-800">{quote.text}</p>
      <div className="flex gap-2 flex-wrap items-center mt-4">
        {quote.tags?.map(tag => (
          <div
            key={tag.id}
            className="text-xs py-1 px-2 rounded-lg border-2 border-gray-800"
            style={{
              backgroundColor: tag.color,
              color: getContrastYIQ(tag.color)
            }}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Quote

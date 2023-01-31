import Layout from './components/layout'
import Quote from './components/quote'
import { useQuotes } from './contexts/QuotesContext'

const Home = () => {
  const { quotes } = useQuotes()
  return (
    <Layout>
      <div className="grid grid-cols-3 mx-auto w-2/3 gap-3">
        {quotes.map(quote => (
          <Quote quote={quote} key={quote.id} />
        ))}
      </div>
    </Layout>
  )
}

export default Home

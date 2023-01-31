import React, { useContext, useState, createContext } from 'react'
import * as _quotes from '../services/QuotesService'
import type { Quote, QuotesContextType } from '../types'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

let QuotesContext: React.Context<QuotesContextType>

export const useQuotes = () => {
  return useContext(QuotesContext)
}

export const QuotesProvider: React.FC<Props> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  const refetchQuotes = () => {
    _quotes
      .getQuotes()
      .then(data => {
        setQuotes(data)
        setLoading(false)
      })
      .catch(console.error)
  }

  const deleteQuote = async (id: number) => {
    await _quotes.deleteQuote(id)
    setQuotes(quotes.filter(quote => quote.id !== id))
  }

  const saveQuote = async (text: string, tags: string[]) => {
    const quote = await _quotes.saveQuote(text, tags)
    setQuotes([...quotes, quote])
  }

  const value = {
    saveQuote,
    refetchQuotes,
    deleteQuote,
    quotes
  }

  QuotesContext = createContext(value)

  useEffect(() => {
    refetchQuotes()
  }, [])

  return (
    <QuotesContext.Provider value={value}>
      {!loading && children}
    </QuotesContext.Provider>
  )
}

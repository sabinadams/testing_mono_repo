import { toast } from 'react-toastify'
import axios from './HttpService'
import type { Quote, CreateQuoteResponse } from '../types'

export const getQuotes = async () => {
  const { data, status } = await axios.get<Quote[]>(`/quotes`)

  if (status !== 200) {
    toast.error('Could not get your quotes...')
  }

  return data
}

export const saveQuote = async (text: string, tags: string[]) => {
  const { data, status } = await axios.post<CreateQuoteResponse>(`/quotes`, {
    text,
    tags
  })

  if (status !== 200) {
    toast.error(data.message)
  }

  return data.quote
}

export const deleteQuote = async (id: number) => {
  const { data, status } = await axios.delete(`/quotes/${id}`)

  if (status !== 200) {
    toast.error(data.message)
  }

  return id
}

export type User = {
  id: number
  username: string
  token: string
}

export type AuthResponse = {
  token: string
  message: string
  user: User
}

export type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  signup: (username: string, password: string) => Promise<void>
}

export type QuotesContextType = {
  quotes: Quote[]
  refetchQuotes: () => void
  deleteQuote: (id: number) => Promise<void>
  saveQuote: (text: string, tags: string[]) => Promise<void>
}

export type Tag = {
  id: number
  name: string
  color: string
}

export type Quote = {
  id: number
  text: string
  tags?: Tag[]
  user: Omit<User, 'token'>
}

export type CreateQuoteResponse = {
  message: string
  quote: Quote
}

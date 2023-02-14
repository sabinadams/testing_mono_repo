import axios from 'axios'

export const createUser = async (username: string, password: string) => {
  const response = await axios.post<{
    user: {
      username: string
    }
  }>('http://localhost:3000/auth/signup', {
    username,
    password
  })

  return response.data.user
}

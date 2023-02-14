import axios from 'axios'

export const createUser = async (username = '', password = '') => {
  let response

  try {
    response = await axios.post<{
      user: {
        username: string
      }
    }>('http://localhost:3000/auth/signup', {
      username,
      password
    })
  } catch (e) {
    console.log(e)
    throw e.message
  }

  return response.data.user
}

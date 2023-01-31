import { useEffect, useState } from 'react'
import Layout from './components/layout'
import { useAuth } from './contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const { login, signup, user } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { name } = e.currentTarget as HTMLButtonElement
    if (!form.username.length || !form.password.length) {
      toast.warn('Please enter a username and password')
      return
    }
    if (name === 'login') {
      return await login(form.username, form.password)
    }
    if (name === 'signup') {
      return await signup(form.username, form.password)
    }
  }

  useEffect(() => {
    if (user) {
      navigate(state?.path || '/')
    }
  }, [user])

  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        <div className="border-2 border-gray-700 rounded-xl bg-white shadow-solid p-4 w-1/3">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 mb-12">
            Welcome to Quoot!
          </h2>
          <div className="px-0 lg:px-12">
            <label className="text-xl text-gray-700 font-bold">
              <p className="py-1">Username</p>
              <input
                className={`w-full rounded-xl p-2 shadow-solid border-2 border-gray-700 focus:outline-none mb-4 transition duration-300 ease-in-out ${
                  form.username.length
                    ? 'border-gray-700'
                    : `shadow-none translate-x-2 translate-y-2 border-gray-400`
                }`}
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                placeholder="username"
              />
            </label>

            <br />
            <label className="text-xl text-gray-700 font-bold">
              <p className="py-1">Password</p>
              <input
                id="password"
                className={`w-full rounded-xl p-2 shadow-solid border-2 border-gray-700 focus:outline-none mb-4 transition duration-300 ease-in-out ${
                  form.password.length
                    ? 'border-gray-700'
                    : `shadow-none translate-x-2 translate-y-2 border-gray-400`
                }`}
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="password"
              />
            </label>
          </div>

          <div className="flex justify-evenly border-t-2 pt-6 mt-12">
            <button
              id="login"
              name="login"
              className="font-bold rounded-md bg-white px-2 py-1 shadow-solid transition duration-300 ease-in-out hover:shadow-none hover:translate-x-2 hover:translate-y-2 border-2 border-gray-700"
              onClick={submit}
            >
              Login
            </button>
            <button
              id="signup"
              name="signup"
              className="font-bold rounded-md bg-white px-2 py-1 shadow-solid transition duration-300 ease-in-out hover:shadow-none hover:translate-x-2 hover:translate-y-2 border-2 border-gray-700"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login

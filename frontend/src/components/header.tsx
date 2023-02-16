import { useAuth } from '../contexts/AuthContext'
import NewQuoteForm from './new-quote-form'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const { logout, user } = useAuth()
  const location = useLocation()

  return (
    <header className="px-6 py-4 text-gray-800 flex items-start justify-between">
      <h1 className="text-xl font-extrabold">Quoot</h1>

      {user && (
        <>
          {location.pathname != '/login' && <NewQuoteForm />}
          <button
            id="logout"
            onClick={logout}
            className="text-sm font-bold rounded-md bg-white p-4 shadow-solid transition duration-300 ease-in-out hover:shadow-none hover:translate-x-2 hover:translate-y-2 border-2 border-gray-700"
          >
            Logout
          </button>
        </>
      )}
    </header>
  )
}

export default Header

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Login from '../login'
import Home from '../home'

import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthProvider } from '../contexts/AuthContext'
import { QuotesProvider } from '../contexts/QuotesContext'
export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <QuotesProvider>
              <Home />
            </QuotesProvider>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
    </Route>
  )
)

// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'
import Home from './pages/main/Home'
import MovieDetails from './pages/main/MovieDetails'
import SearchMovies from './pages/main/SearchMovies'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'
import AuthVerification from './pages/auth/AuthVerification'

function App() {
  Modal.setAppElement('#root')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="search" element={<SearchMovies />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verification" element={<AuthVerification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  
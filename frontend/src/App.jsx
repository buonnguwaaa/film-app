// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'
import Home from './pages/main/Home'
import MovieDetails from './components/features/movies/MovieDetails'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'

function App() {
  Modal.setAppElement('#root')
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  
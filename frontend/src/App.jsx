// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import MainLayout from './components/layouts/MainLayout'
import Home from './pages/home/Home'

function App() {
  Modal.setAppElement('#root')
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  
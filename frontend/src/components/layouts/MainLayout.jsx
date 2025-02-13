// components/layouts/MainLayout/index.jsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import useMovies from '@/hooks/useMovies'

const MainLayout = () => {
  const { handleSearch } = useMovies()

  return (
    <div>
      <Header onSearch={handleSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
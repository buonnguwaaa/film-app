// components/layouts/MainLayout/index.jsx
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import useMovies from '@/hooks/useMovies'

const MainLayout = () => {
  const { handleSearch } = useMovies()


  return (
    <div className='bg-black'>
      <Header onSearch={handleSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
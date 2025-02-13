// store/movieStore.js
import { create } from 'zustand'

const useMovieStore = create((set) => ({
  movies: {
    popular: [],
    topRated: [],
    searched: []
  },
  pagination: {
    currentPage: 1,
    totalPages: 0
  },
  search: {
    term: '',
    isSearching: false
  },
  setMovies: (type, data) => set(state => ({
    movies: { ...state.movies, [type]: data }
  })),
  setPagination: (data) => set({ pagination: data }),
  setSearch: (data) => set({ search: data })
}))

export default useMovieStore;
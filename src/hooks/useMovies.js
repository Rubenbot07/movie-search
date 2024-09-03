import { useState, useRef, useCallback} from 'react'
import { searchMovies } from '../services/movies'
export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const prevSearch = useRef(search)
  
  const getMovies = useCallback(async ({ search }) => {
      if (search === prevSearch.current) return
      try {
        setLoading(true)
        setError(null)
        prevSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
  }, []) 

  return { movies, loading, getMovies }
}
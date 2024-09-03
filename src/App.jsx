import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import './App.css'
import { useEffect, useState, useRef } from 'react'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('You can\'t search an empty input')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('You can\'t search numbers')
      return
    }

    if (search.length < 3) {
      setError('The search must be at least 3 characters long')
      return
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error}
}

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }


  return (
    <div className='page'>
      <header>
        <h1>Technical Test</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" placeholder='Avengers, matrix ...'/>
          <button>Search</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
          <Movies movies={movies} /> 
        }
      </main>
    </div>
  )
}

export default App

import { useEffect, useState, useRef } from 'react'

export function useSearch () {
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
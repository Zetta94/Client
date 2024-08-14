import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Movie, searchMovies } from '../../store/movieSlice'
import { RootState, AppDispatch } from '../../store'
import { useParams } from 'react-router-dom'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const CardDetailsApi: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { title } = useParams<{ title: string }>() 
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie)

  useEffect(() => {
    if (isAuthenticated && title && !selectedMovie) {
      dispatch(searchMovies(title))
    }
  }, [dispatch, title, isAuthenticated, selectedMovie])

  if (!selectedMovie) return <p>Loading...</p>

  const { poster_path, title: movieTitle, original_title, release_date, overview, vote_average, vote_count } = selectedMovie
  const posterUrl = `${IMAGE_BASE_URL}${poster_path}`

  return (
    <div className="home rounded-lg shadow-lg overflow-hidden flex min-w-fit min-h-screen p-6">
        <img
          src={posterUrl}
          alt={movieTitle}
          className="h-[500px] object-cover rounded-lg"
        />
        <div className="p-4 rounded-xl flex flex-col items-start justify-center gap-2 bg-white/75 w-3/4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{movieTitle}</h3>
          <p className="text-gray-500 mb-2">{release_date}</p>
          <p className="text-gray-700 mb-2 w-3/4">{overview}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-2">Rating:</span>
            <span>{vote_average.toFixed(1)} / 10</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-gray-600 mr-2">Votes:</span>
            <span>{vote_count}</span>
          </div>
        </div>
    </div>
  )
}

export default CardDetailsApi

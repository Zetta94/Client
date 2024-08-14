import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDbMovies, sortDbMoviesAlphabetically, sortDbMoviesByVoteAverage } from '../../store/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

const MovieDB: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const movies = useSelector((state: RootState) => state.movies.dbMovies)
    const status = useSelector((state: RootState) => state.movies.status)
    const error = useSelector((state: RootState) => state.movies.error)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    
    const [sortAlphabet, setSortAlphabet] = useState<'asc' | 'desc' | ''>('')
    const [sortVoteAverage, setSortVoteAverage] = useState<'asc' | 'desc' | ''>('')

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchDbMovies())
        } else {
            navigate('/login')
        }
    }, [dispatch, isAuthenticated, navigate])

    const handleSortAlphabetically = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as 'asc' | 'desc'
        setSortAlphabet(value)
        if (value) {
            dispatch(sortDbMoviesAlphabetically(value))
        }
    }

    const handleSortByVoteAverage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as 'asc' | 'desc'
        setSortVoteAverage(value)
        if (value) {
            dispatch(sortDbMoviesByVoteAverage(value))
        }
    }

    const handleReset = () => {
        setSortAlphabet('')
        setSortVoteAverage('')
        dispatch(fetchDbMovies())
    }

    return (
        <div className='home'>
            <div className="min-w-screen">
                <div className="rounded-b-xl bg-slate-700 p-3 shadow-lg">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="sort-alphabet" className="text-slate-300 text-sm font-medium"></label>
                                <select
                                    id="sort-alphabet"
                                    className="block w-48 rounded-md border border-gray-200 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={sortAlphabet}
                                    onChange={handleSortAlphabetically}
                                >
                                    <option value="">Sort Name</option>
                                    <option value="asc">A B - Z</option>
                                    <option value="desc">Z Y - A</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="sort-vote-average" className="text-slate-300 text-sm font-medium"></label>
                                <select
                                    id="sort-vote-average"
                                    className="block w-48 rounded-md border border-gray-200 px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={sortVoteAverage}
                                    onChange={handleSortByVoteAverage}
                                >
                                    <option value="">Sort Rating</option>
                                    <option value="desc">Best to Poor</option>
                                    <option value="asc">Poor to Best</option>
                                </select>
                            </div>

                            <button
                                className="w-48 rounded-lg bg-gray-200 px-3 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                                onClick={handleReset}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 px-10 py-6">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        type="notfavourite"
                    />
                ))}
            </div>
        </div>
    )
}

export default MovieDB

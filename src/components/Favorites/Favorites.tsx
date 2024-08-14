import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moviesFavourites,fetchDBMovieById, Movie } from '../../store/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

const Favourites: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.movies.status);
    const error = useSelector((state: RootState) => state.movies.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.userProfile);
    const movies2 = useSelector((state:RootState)=> state.movies.favouritesMovies)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        } 
        if (user?._id) {
            console.log(movies2)
            dispatch(moviesFavourites(user._id));
        }
    }, [dispatch, isAuthenticated]);

    return (
        <>
        <div className='home font-railway'>
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 px-10 py-6">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && movies2.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        type="favourites"
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default Favourites;

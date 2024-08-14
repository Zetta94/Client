import React, { useState, useEffect } from 'react';
import { Movie, searchMovies } from '../../store/movieSlice';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const MovieSearch: React.FC = () => {
    const [title, setTitle] = useState('');
    const [busqueda, setBusqueda] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { apiMovies, selectedMovie, status, error } = useSelector((state: RootState) => state.movies);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: { duration: 3000 }
      });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        // Reset search state when status changes
        if (status === 'succeeded' || status === 'failed') {
            setBusqueda(true);
        }
    }, [status]);

    const handleSearch = () => {
        if (title.trim() !== '') {
            dispatch(searchMovies(title));
            setBusqueda(false); // Reset search state when a new search is initiated
        }
    };

    return (
        <div className="home min-h-screen flex flex-col items-center justify-center p-6">
            <div className='p-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-white/75 w-full max-w-md'>
                <h1 className="text-2xl font-bold mb-4">Search movie</h1>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter movie title"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button 
                    className='mt-4 active:scale-95 rounded-lg bg-slate-500 px-5 py-1 font-medium text-white outline-none focus:ring hover:opacity-90' 
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {status === 'loading' && <p className="mt-4 text-lg">Loading...</p>}
            {error && <p className="mt-4 text-lg text-red-500">Error: {error}</p>}

            {status === 'succeeded' && apiMovies.length === 0 && busqueda && (
                <div className='mt-8 rounded-lg shadow-lg flex flex-col items-center justify-center p-6 bg-white/80'>
                    <animated.img
                        src="https://eagleworksolutions.co.uk/images/no-search-found.png" // Cambia esta URL por la de tu imagen de "no resultados"
                        alt="No results"
                        className='max-w-xs h-auto rounded-xl'
                        style={props}
                    />
                    <p className='mt-4 text-lg font-bold'>No results found</p>
                </div>
            )}

            {status === 'succeeded' && selectedMovie && apiMovies.length > 0 && (
                <div className='mt-8 rounded-lg shadow-lg flex flex-col items-center p-6 bg-white/80'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                        alt={selectedMovie.title}
                        style={{ width: '200px' }}
                        className='rounded-xl'
                    />
                    <div className='mt-4 text-center'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>{selectedMovie.title}</h3>
                        <p className='text-gray-500 mb-2'>{selectedMovie.release_date}</p>
                        <p className='text-gray-700 mb-2'>{selectedMovie.overview}</p>
                        <div className="flex items-center justify-center mt-2">
                            <span className="text-yellow-400 mr-2">Rating:</span>
                            <span>{selectedMovie.vote_average.toFixed(1)} / 10</span>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <span className="text-gray-600 mr-2">Popularity:</span>
                            <span>{selectedMovie.popularity.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;

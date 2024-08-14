import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApiMovies } from '../../store/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.apiMovies);
  const status = useSelector((state: RootState) => state.movies.status);
  const error = useSelector((state: RootState) => state.movies.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate()

  const [current, setCurrent] = useState<number>(1);
  const totalPages = 500; 
  const pagesToShow = 5;

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchApiMovies(current))   
    }else{
        navigate('/login')
    }
      
  }, [dispatch, current]);

  const handleNewPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrent(page);
    }
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(1, current - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleNewPage(i)}
          className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium 
          ${current === i ? 'bg-slate-600 text-white' : 'bg-white text-slate-600 border border-slate-600'}
          hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='home'>
      <nav aria-label="Page navigation example" className="flex justify-center items-center font-railway pt-4">
        <button
          onClick={() => handleNewPage(current - 1)}
          disabled={current === 1}
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg 
          ${current === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white'}
          focus:outline-none focus:ring-2 focus:ring-slate-500`}
        >
          Previous
        </button>

        <div className="flex">
          {current > Math.floor(pagesToShow / 2) && (
            <button
              onClick={() => handleNewPage(1)}
              className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              1
            </button>
          )}
          {current > Math.floor(pagesToShow / 2) && <span className="mx-1 text-slate-600">...</span>}
          {renderPageNumbers()}
          {current < totalPages - Math.floor(pagesToShow / 2) && <span className="mx-1 text-slate-600">...</span>}
          {current < totalPages - Math.floor(pagesToShow / 2) && (
            <button
              onClick={() => handleNewPage(totalPages)}
              className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          onClick={() => handleNewPage(current + 1)}
          disabled={current === totalPages}
          className={`px-4 py-2 ml-2 text-sm font-medium rounded-lg 
          ${current === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white'}
          focus:outline-none focus:ring-2 focus:ring-slate-500`}
        >
          Next
        </button>
      </nav>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 px-10 py-6">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            type="api"
          />
        ))}
      </div>
      <nav aria-label="Page navigation example" className="flex justify-center items-center font-railway pb-4">
        <button
          onClick={() => handleNewPage(current - 1)}
          disabled={current === 1}
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg 
          ${current === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white'}
          focus:outline-none focus:ring-2 focus:ring-slate-500`}
        >
          Previous
        </button>

        <div className="flex">
          {current > Math.floor(pagesToShow / 2) && (
            <button
              onClick={() => handleNewPage(1)}
              className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              1
            </button>
          )}
          {current > Math.floor(pagesToShow / 2) && <span className="mx-1 text-slate-600">...</span>}
          {renderPageNumbers()}
          {current < totalPages - Math.floor(pagesToShow / 2) && <span className="mx-1 text-slate-600">...</span>}
          {current < totalPages - Math.floor(pagesToShow / 2) && (
            <button
              onClick={() => handleNewPage(totalPages)}
              className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          onClick={() => handleNewPage(current + 1)}
          disabled={current === totalPages}
          className={`px-4 py-2 ml-2 text-sm font-medium rounded-lg 
          ${current === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-slate-600 border border-slate-600 hover:bg-slate-500 hover:text-white'}
          focus:outline-none focus:ring-2 focus:ring-slate-500`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default MovieList;

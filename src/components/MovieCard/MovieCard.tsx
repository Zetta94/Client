import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Movie, addFavourites, deleteFavourites,createMovie,searchMovies } from '../../store/movieSlice'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
  movie: Movie
  type: string
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const MovieCard: React.FC<MovieCardProps> = ({ movie, type}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.userProfile);

  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [dispatch]);

  const handleClick = (_id: string) => {
    navigate(`/carddetails/${_id}`)
    navigate(0)
  }

  const handleAddFavourite = (e: React.MouseEvent<HTMLButtonElement>, { uid, mid }: { uid: string; mid: string }) => {
    e.preventDefault()
    dispatch(addFavourites({ uid, mid }));
    window.alert("Pelicula agregada a favoritos");
  };

  const handleDeleteFavourite = ({ uid, mid }: { uid: string; mid: string })=>{
    dispatch(deleteFavourites({ uid, mid }))
    navigate(0)
    window.alert("Pelicula eliminada de favoritos")
  } 

  const handleCreateMovie = (movie : Movie)=>{
    dispatch(createMovie(movie))
    navigate(0)
    window.alert("Pelicula agregada a MONGODB")
  } 

  const handleSearchsearchMovies = (title: string) => {
    navigate(`/carddetailsapi/${encodeURIComponent(title)}`)
    navigate(0)
  }

  return (
    <div className="bg-white font-railway rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 w-fit border border-slate-500 h-max [box-shadow:_0_0_6px_#000] hover:[box-shadow:_0_0_2px_#000] bg-slate-200">
      
      {user !== null && type !== "api" && (
        <img
          src={posterUrl}
          alt={movie.title}
          className="object-cover rounded-xl cursor-pointer"
          onClick={()=>handleClick(movie._id)}
        />
      )}

    {user !== null && type === "api" && (
        <img
          src={posterUrl}
          alt={movie.title}
          className="object-cover rounded-xl cursor-pointer"
          onClick={()=>handleSearchsearchMovies(movie.title)}
        />
      )}
      
      <div className="p-2">
        <h3 className="text-sm text-gray-900 font-semibold text-center overflow-hidden mb-2">{movie.title}</h3>
        <h3 className="text-sm text-gray-900 font-semibold text-center overflow-hidden mb-2">Rating: {Math.floor(movie.vote_average)}/10</h3>
        <div className="flex flex-col gap-2">
        {user !== null && type === "notfavourite" && (
          <button
          onClick={(e) => handleAddFavourite(e, { uid: user._id, mid: movie._id })}
          className="w-full bg-slate-600 text-white py-3 px-5 rounded-lg hover:bg-slate-800 transition-colors duration-300 relative"
        >
          Add to Favorites
        </button>
        )}
        {user !== null && type === "favourites" && (
          <button
            onClick={() => handleDeleteFavourite({ uid: user._id, mid: movie._id })}
            className="w-full bg-slate-600 text-white py-3 px-5 rounded-lg hover:bg-slate-800 transition-colors duration-300 relative"
          >
            Delete favourites
          </button>
        )}
        {user !== null && type === "api" && (
          <button 
          onClick={() => handleCreateMovie(movie)}
            className="w-full bg-slate-600 text-white py-3 px-5 rounded-lg hover:bg-slate-800 transition-colors duration-300 relative"
          >
            Add to MONGODB
          </button>
        )}
        </div>

      </div>
    </div>
  );
};

export default MovieCard;

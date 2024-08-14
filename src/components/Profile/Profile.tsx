import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { moviesFavourites } from '../../store/movieSlice'

const Profile: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const status = useSelector((state: RootState) => state.movies.status)
  const user = useSelector((state: RootState) => state.auth.userProfile)
  const movies = useSelector((state: RootState) => state.movies.favouritesMovies)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    if (user?._id) {
      dispatch(moviesFavourites(user._id))
    }
  }, [isAuthenticated, navigate, dispatch, user?._id])

  return (
    <div className="home rounded-lg shadow-lg overflow-hidden flex justify-center min-w-fit min-h-screen p-6">
      <div className="p-4 rounded-xl flex flex-col items-center justify-start gap-2 bg-white/75 w-fit">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {user?.first_name.toLocaleUpperCase()} {user?.last_name.toLocaleUpperCase()}
          </h3>
          <p className="text-gray-500 mb-2">Email: {user?.email}</p>
          <h2 className="text-lg font-semibold mt-4">Películas favoritas</h2>
          {status === 'succeeded' && movies.length > 0 ? (
            <ul className="list-disc pl-5">
              {movies.map((movie) => (
                <li key={movie._id} className="text-gray-500 mb-2">
                  {movie.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-2">No tienes películas favoritas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

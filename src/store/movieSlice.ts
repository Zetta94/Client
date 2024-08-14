import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la interfaz para las películas
export interface Movie {
  _id: string
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string; 
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


// Define el estado inicial
interface MovieState {
  apiMovies: Movie[];
  dbMovies: Movie[];
  selectedMovie: Movie | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  favouritesMovies : Movie[]
}

const initialState: MovieState = {
  apiMovies: [],
  dbMovies: [],
  selectedMovie: null,
  status: 'idle',
  error: null,
  favouritesMovies: []
};

// ## API

//Devuelve todas las peliculas de la API
export const fetchApiMovies = createAsyncThunk(
  'movies/fetchApiMovies',
  async (page: number) => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/movies?page=${page}`);
    return response.data.payload;
  }
);

//Busca peliculas por nombre en la API
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (title: string) => {
    const response = await axios.get('https://api-prueba-tecnica.onrender.com/api/movies/search', {
      params: { title }
    })
    console.log("title: ", response.data.payload);
    return response.data.payload;
  }
);


// ## DATABASE

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (movie: Movie) => {
      const response = await axios.post('https://api-prueba-tecnica.onrender.com/api/movies/db', movie)
      return response.data.payload
  }
)

//Devuelve todas las peliculas de la DB
export const fetchDbMovies = createAsyncThunk(
  'movies/fetchDbMovies',
  async () => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/movies/db`);
    return response.data.payload;
  }
);


// Busca peliculas por id en la DB
export const fetchDBMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (_id: string) => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/movies/db/${_id}`)
    return response.data.payload
  }
);

//Agrega una pelicula a favoritos
export const addFavourites = createAsyncThunk(
  'movies/addFavourites',
  async ({ uid, mid }: { uid: string; mid: string }) => {
    const response = await axios.put(`https://api-prueba-tecnica.onrender.com/api/users/${uid}/favourite/${mid}`)
    return response.data.payload
  }
)

//Elimina una pelicula de favoritos
export const deleteFavourites = createAsyncThunk(
  'movies/deleteFavourites',
  async ({ uid, mid }: { uid: string; mid: string }) => {
    const response = await axios.delete(`https://api-prueba-tecnica.onrender.com/api/users/${uid}/favourite/${mid}`)
    return response.data.payload
  }
)

//Trae todas las peliculas favoritas de un usuario
export const moviesFavourites = createAsyncThunk(
  'movies/moviesFavourites',
  async ( uid: string) => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/users/${uid}/favourite`)
    return response.data.payload
  }
)

//Ordenar alfabeticamente
export const sortDbMoviesAlphabetically = createAsyncThunk(
  'movies/sortDbMoviesAlphabetically',
  async (order: 'asc' | 'desc') => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/movies/db`);
    const movies = response.data.payload;
    return movies.sort((a: Movie, b: Movie) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })
  }
)

//Ordenar por vote average
export const sortDbMoviesByVoteAverage = createAsyncThunk(
  'movies/sortDbMoviesByVoteAverage',
  async (order: 'asc' | 'desc') => {
    const response = await axios.get(`https://api-prueba-tecnica.onrender.com/api/movies/db`);
    const movies = response.data.payload;
    return movies.sort((a: Movie, b: Movie) => {
      if (order === 'asc') {
        return a.vote_average - b.vote_average
      } else {
        return b.vote_average - a.vote_average
      }
    })
  }
)


const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiMovies = action.payload;
      })
      .addCase(fetchApiMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch API movies';
      })
      .addCase(fetchDbMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDbMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dbMovies = action.payload;
      })
      .addCase(fetchDbMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch DB movies';
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiMovies = action.payload; 
        state.selectedMovie = action.payload.length > 0 ? action.payload[0] : null; 
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(fetchDBMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDBMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchDBMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movie by ID';
      })
      .addCase(addFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavourites.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addFavourites.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add movie to favourites';
      })
      .addCase(deleteFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFavourites.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteFavourites.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add movie to favourites';
      })
      .addCase(moviesFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(moviesFavourites.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.favouritesMovies = action.payload
      })
      .addCase(moviesFavourites.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add movie to favourites';
      })
      .addCase(sortDbMoviesAlphabetically.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortDbMoviesAlphabetically.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dbMovies = action.payload;
      })
      .addCase(sortDbMoviesAlphabetically.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to sort movies alphabetically';
      })
      .addCase(sortDbMoviesByVoteAverage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortDbMoviesByVoteAverage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dbMovies = action.payload;
      })
      .addCase(sortDbMoviesByVoteAverage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to sort movies by vote average';
      })
      .addCase(createMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dbMovies.push(action.payload); // Agrega la nueva película a la lista de películas de la DB
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create movie';
      });

  },
});

export default movieSlice.reducer;

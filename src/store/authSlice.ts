// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import axios from 'axios';


interface User {
  _id: string
  first_name: string, 
  last_name: string,
  email: string,
  favourite_movies: string[]
}

interface AuthState {
  isAuthenticated: boolean;
  userProfile: User | null
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  userProfile: JSON.parse(localStorage.getItem('userProfile') || 'null'),
  loading: false,
  error: null,
};

export const selectAuth = (state: RootState) => state.auth;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://api-prueba-tecnica.onrender.com/login', {
        email,
        password,
      }, { withCredentials: true })
      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.post('https://api-prueba-tecnica.onrender.com/logout', {}, { withCredentials: true });
      return {}; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstName, lastName, email, password }: { firstName:string, lastName:string ,email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://api-prueba-tecnica.onrender.com/register', {
        first_name:firstName, 
        last_name:lastName,
        email,
        password,
      }, { withCredentials: true });
      return response.data.user; // Ajusta según lo que devuelve tu backend
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload
        state.loading = false;
        state.isAuthenticated = true
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userProfile', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userProfile = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userProfile');
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(checkAuthStatus.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<User>) => {
      //   state.userProfile = action.payload;
      //   state.isAuthenticated = true;
      //   state.loading = false;
      // })
      // .addCase(checkAuthStatus.rejected, (state, action: PayloadAction<any>) => {
      //   state.isAuthenticated = false;
      //   state.userProfile = null;
      //   state.loading = false;
      //   state.error = action.payload || 'Failed to check authentication status';
      // });
  },
});


export default authSlice.reducer;

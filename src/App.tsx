import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MovieList from './components/MovieList/MovieList';
import MovieDB from './components/MovieDB/MovieDB';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home'
import CardDetails from './components/CardDetails/CardDetails';
import Favourites from './components/Favorites/Favorites'
import Profile from './components/Profile/Profile'
import MovieSearch from './components/SearchMovieAPI/searchMovieApi'
import CardDetailsApi from './components/CardDetailsApi/CardDetailsApi';

const AppContent: React.FC = () => {
  const location = useLocation()
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/'

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apimovies" element={<MovieList />} />
        <Route path="/dbmovies" element={<MovieDB />} />
        <Route path="/carddetails/:id" element={<CardDetails/>} />
        <Route path="/favourites" element={<Favourites/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/searchapi" element={<MovieSearch/>} />        
        <Route path="/carddetailsapi/:title" element={<CardDetailsApi/>} />

      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { getTrendingMovies, searchMovies } from './api/tmdb';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrendingMovies();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch trending movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      fetchTrending();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchTrending();
  };

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} onLogoClick={clearSearch} />
      
      <main className="main-content">
        <div className="section-header container animate-fade-in">
          {searchQuery ? (
            <h2>Search Results for <span className="text-gradient">"{searchQuery}"</span></h2>
          ) : (
            <h2>Trending <span className="text-gradient">Now</span></h2>
          )}
        </div>

        {error && (
          <div className="error-message container animate-fade-in">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loader-spinner"></div>
        ) : (
          <MovieList 
            movies={movies} 
            onMovieClick={(movie) => setSelectedMovieId(movie.id)} 
          />
        )}
      </main>

      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}

      <footer className="footer container">
        <p>© {new Date().getFullYear()} MovieFlix. Built meticulously with React & TMDB API.</p>
      </footer>
    </div>
  );
}

export default App;
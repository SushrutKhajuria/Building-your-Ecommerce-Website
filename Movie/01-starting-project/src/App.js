import React, { useState, useEffect, useRef } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimeoutRef = useRef(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('https://swapi.py4e.com/api/films/');
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const data = await response.json();
  
      if (!data.results) {
        throw new Error('No data received');
      }
  
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
  
      setMovies(transformedMovies);
      setIsRetrying(false);
      clearTimeout(retryTimeoutRef.current);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong... Retrying');
      setIsRetrying(true);
      retryTimeoutRef.current = setTimeout(fetchMoviesHandler, 5000);
    } finally {
      setIsLoading(false);
    }
  }
  
  function handleFetchClick() {
    clearTimeout(retryTimeoutRef.current);
    setIsRetrying(false);
    fetchMoviesHandler();
  }

  function handleCancelRetry() {
    clearTimeout(retryTimeoutRef.current);
    setIsRetrying(false);
    setError('Retry cancelled.');
  }

  useEffect(() => {
    return () => {
      clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  return (
    <div className="app-container">
      <button onClick={handleFetchClick} disabled={isRetrying}>
        {isRetrying ? 'Retrying...' : 'Fetch Movies'}
      </button>
      {isRetrying && (
        <button onClick={handleCancelRetry} className="cancel-button">
          Cancel Retry
        </button>
      )}

      {isLoading && <div className="loader"></div>}
      {!isLoading && error && <p className="error-message">{error}</p>}
      {!isLoading && !error && movies.length > 0 && <MoviesList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && (
        <p className="no-movies">No movies to display</p>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: ''
  });

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.py4e.com/api/films/');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      if (!data.results) throw new Error('No data received');

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMovies(transformedMovies);
      setIsRetrying(false);
    } catch (err) {
      setError('Something went wrong... Retrying');
      setIsRetrying(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchMoviesHandler();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = () => {
    const updatedMovies = [
      ...movies,
      {
        id: Math.random().toString(), 
        title: newMovie.title,
        openingText: newMovie.openingText,
        releaseDate: newMovie.releaseDate,
      }
    ];

    setMovies(updatedMovies);
    console.log("New Movie Added:", newMovie);  
    setNewMovie({ title: '', openingText: '', releaseDate: '' }); 
  };

  return (
    <div className="app-container">
      <div className="add-movie-form">
        <div>
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            placeholder="Enter movie title"
          />
        </div>
        <div>
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            id="openingText"
            name="openingText"
            value={newMovie.openingText}
            onChange={handleInputChange}
            placeholder="Enter opening text"
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddMovie} className="fetch-button">
          Add Movie
        </button>
      </div>

      <button onClick={handleFetchClick} disabled={isRetrying} className="fetch-button">
        {isRetrying ? 'Retrying...' : 'Fetch Movies'}
      </button>

      {isLoading && <div className="loader"></div>}
      {!isLoading && error && <p className="no-movies">{error}</p>}
      {!isLoading && !error && movies.length > 0 && <MoviesList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && <p className="no-movies">No movies to display</p>}
    </div>
  );
};

export default App;

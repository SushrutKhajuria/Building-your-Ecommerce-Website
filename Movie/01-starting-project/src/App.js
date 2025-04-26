import React, { useState } from 'react';
import MoviesList from './MoviesList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      const data = await response.json();
      
      const transformedMovies = data.results.map(movieData => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }));
      
      setMovies(transformedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <div className="loader">Loading...</div> // Add your loader component/style here
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
    </React.Fragment>
  );
};

export default App;
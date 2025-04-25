import React ,{useState}from 'react'

const App = () => {

  const [movies , setMovies] = useState([])

  function fetchMoviesHandler(){
    fetch('https://swapi.dev/api/films').then(response =>{
      response.json();
    }).then(data =>{
      setMovies(data.results);
    });
  }
  return (
    <React.Fragment>
      <section>
    <button> Fetch Movies</button>
      </section>
      <section>
      <MoviesList movies ={movies} />
      </section>
    </React.Fragment>
  )
}

export default App 
import React, {useState, useEffect} from 'react';
import Header from './Header';
import Slider from './Slider';
import noPicture from '../img/nopicture.gif';

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";


function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`);
      response = await response.json();

      setMovies(response.results.slice(0, 10));
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchPopularPeople = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=1`);
      response = await response.json();

      setPeople(response.results.slice(0, 10));
    };

    fetchPopularPeople();
  }, []);

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <div className="container-fluid px-0">
      <div className="row w-100 mx-0">
        <Header/>
      </div>
      <div className="row w-100 mx-0">
        <div className="col-3">
          <h5 className="font-weight-bold">Popular people</h5>
          <div className="row flex-wrap d-flex">
            {people.length && people.map(person => {
              if (person.profile_path) {
                return (
                  <div className="col-6" key={person.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt="poster"
                      className="card-img-top"
                    />
                    {person.name}
                  </div>
                )
              }
              return (
                <div className="col-6" key={person.id}>
                  <img
                    src={noPicture}
                    alt="poster"
                    className="card-img-top"
                  />
                  {person.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-6 mx-auto my-2">
          <Slider/>
        </div>
        <div className="col-3">
          <h5 className="font-weight-bold">Trending movies</h5>
          <div className="row flex-wrap d-flex">
          {movies.length && movies.map((movie) => {
            return (
              <div className="col-6" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt="poster"
                  className="card-img-top"
                />
                {movie.title}, {movie.vote_average}
              </div>
              )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}


export default HomePage;
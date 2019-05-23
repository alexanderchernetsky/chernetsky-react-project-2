import React, {useState, useEffect} from 'react';
import Header from '../../common/Header/Header';
import Slider from '../../common/Slider';
import noPicture from '../../../img/nopicture.gif';
import './style.sass';
import * as $ from "jquery";

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";


function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`);
      response = await response.json();
      setMovies(response.results.slice(0, 8));
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchPopularPeople = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=1`);
      response = await response.json();
      setPeople(response.results.slice(0, 8));
    };

    fetchPopularPeople();
  }, []);

  const showPersonInfo = personName => async () => {
    console.log(personName);
    let personId;
    await fetch(`https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${personName}&page=1`)
      .then(res => res.json())
      .then(res => {
        personId = res.results[0].id;
      });

    await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${api_key}&language=en-US`)
      .then(res => res.json())
      .then(res => {
        setPerson(res);
        console.log(res);
      });

  };

  return (
    <div className="container-fluid px-0">
      <div className="row w-100 mx-0">
        <Header/>
      </div>

      <div className="row w-100 mx-auto home-page-container">
        <div className="col-md-3 order-md-1 order-2">
          <h5 className="font-weight-bold text-center">Popular people</h5>
          <div className="row flex-wrap d-flex justify-content-center">
            {people && people.map(person => {
              if (person.profile_path) {
                return (
                  <div className="col-6 poster" key={person.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt="poster"
                      className="card-img-top"
                    />
                    <span onClick={showPersonInfo(person.name)} className="poster-caption">{person.name}</span>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      Launch demo modal
                    </button>
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
                  <span className="poster-caption">{person.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-md-6 mx-auto my-2 order-md-2 order-1">
          <Slider/>
        </div>
        <div className="col-12 col-md-3 order-md-3 order-3">
          <h5 className="font-weight-bold text-center">Trending movies</h5>
          <div className="row flex-wrap d-flex justify-content-center">
            {movies && movies.map((movie) => {
              return (
                <div className="col-6 poster" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt="poster"
                    className="card-img-top"
                  />
                  <span className="poster-caption">{movie.title}, {movie.vote_average}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default HomePage;
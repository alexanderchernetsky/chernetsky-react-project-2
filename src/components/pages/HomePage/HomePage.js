import React, {useState, useEffect} from 'react';
import Header from '../../common/Header/Header';
import Slider from '../../common/Slider';
import noPicture from '../../../img/nopicture.gif';
import './style.sass';

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";

function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      console.log(response.results.slice(0, 8));
      setPeople(response.results.slice(0, 8));
    };

    fetchPopularPeople();
  }, []);

  const showPersonInfo = id => async () => {

    await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=en-US`)
      .then(res => res.json())
      .then(res => {
        setPersonInfo(res);
        console.log(res);
      });

    setShowModal(true);

  };

  const hideModal = () => {
    setShowModal(false);
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
              return (
                <div className="col-6 poster" key={person.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path ? person.profile_path : noPicture}`}
                    alt="poster"
                    className="card-img-top"
                  />
                  <span onClick={showPersonInfo(person.id)} className="poster-caption">{person.name}</span>
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
                  <span className="poster-caption">{movie.title}</span>
                  <span className="badge badge-primary">{movie.vote_average}</span>
                </div>
              )
            })}
          </div>
        </div>

        {
          showModal &&
          <>
            <div className="shadow"></div>
            <div className="jumbotron modal-window">
              <h1 className="display-4">{personInfo.name}</h1>
              <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                attention to featured content or information.</p>
              <hr className="my-4"/>
              <p>{personInfo.biography}</p>
              <p className="lead">
                <button className="btn btn-primary btn-lg" onClick={hideModal}>Close</button>
              </p>
            </div>
          </>
        }

      </div>
    </div>
  )
}


export default HomePage;
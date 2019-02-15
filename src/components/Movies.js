import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Movies = (props) => {
  return (
        <div className="card-deck">
          {props.movies.map(movie => (
          <div className="card movie__container" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" className="card-img-top movie-card"/>
              <div className="card-body">
                <h5 className="card-title">{movie.original_title}</h5>
                <p className="card-title">
                  {movie.release_date}
                  <span> Vote average: {movie.vote_average}</span>
                  <span> Vote count: {movie.vote_count}</span>
                </p>
                <p className="card-text">
                  {movie.overview.length < 100 ? movie.overview : movie.overview.substr(0, 100)+ '...'}
                </p>
                <button className="btn btn-primary">
                  <Link to={{pathname: `/movie/${movie.id}`}} className="movie__link">More</Link>
                </button>
              </div>
          </div>
          ))}
        </div>
  )
};

Movies.propTypes = {
  movies: PropTypes.array,
};

export default Movies;
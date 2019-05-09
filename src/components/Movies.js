import React from "react";
import PropTypes from "prop-types";
import NoResults from "./NoResults";

const Movies = props => {
  return (
      <React.Fragment>
        {props.movies.length === 0 ?
            <NoResults
                title='No results found.'
                description='Perform a new search using the search bar.'/> :
            <div className="card-deck flex-row flex-wrap mx-0 d-flex justify-content-around mt-2">
              {props.movies.map(movie => (
                  <div className="card mb-2" key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="poster"
                        className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.original_title}</h5>
                      <p className="card-title">
                        {movie.release_date}
                        <span> Vote average: {movie.vote_average}</span>
                        <span> Vote count: {movie.vote_count}</span>
                      </p>
                      <p className="card-text">
                        {movie.overview.length < 100
                            ? movie.overview
                            : movie.overview.substr(0, 100) + "..."}
                      </p>
                      <button className="btn btn-primary" onClick={() => props.moreButtonHandler(movie.id)}>
                        More
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        }
      </React.Fragment>
  );
};

Movies.propTypes = {
  movies: PropTypes.array
};

export default Movies;

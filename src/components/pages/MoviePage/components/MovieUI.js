import React from "react";

const MovieUI = ({state, handler}) => {
  const { movie } = state;
  return (
      <div className="container">
        {state.movie && (
            <div className="jumbotron pt-2 d-flex flex-column flex-lg-row mb-0">
              <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="poster"
                  className="w-50 rounded mx-auto d-block"
              />
              <div className="pl-0 pl-lg-2 text-center">
                <h1 className="display-4">{movie.title}</h1>
                <p className="lead">{movie.tagline}</p>
                <p className="lead">
                  Duration:{movie.runtime} min. Release date: {movie.release_date}
                  . Original language: {movie.original_language}
                </p>
                <hr className="my-4" />
                <ul className="list-group">
                  {movie.genres.map((genre, index) => (
                      <li className="list-group-item" key={index}>
                        {genre.name}
                      </li>
                  ))}
                </ul>
                <hr className="my-4" />
                <p className="text">Description: {movie.overview}</p>
                <ul className="list-group list-group-horizontal">
                  {movie.production_companies.map(company => (
                      <li className="list-group-item mb-0 mx-auto" key={company.id}>
                        {company.name}
                      </li>
                  ))}
                </ul>
                <button
                    onClick={handler}
                    className="btn btn-primary btn-lg mt-3"
                >
                  Return Back
                </button>
              </div>
            </div>
        )}
      </div>
  )
};

export default MovieUI;
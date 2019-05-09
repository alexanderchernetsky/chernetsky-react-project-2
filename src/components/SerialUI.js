import React from "react";

const SerialUI = ({state, handler}) => {
  const { movie } = state;
  console.log(movie);
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
                  Duration:{movie.runtime} min. First air date: {movie.first_air_date}
                  . Original language: {movie.original_language} . Status: {movie.status}
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

                <div className="accordion mt-2" id="seasons">
                  {movie.seasons.map(season => (
                      <div className="card mx-auto" key={season.id}>
                        <div className="card-header" id={season.id}>
                          <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + season.id}
                                    aria-expanded="false" aria-controls={season.id + "info"}>
                              {season.name}
                            </button>
                          </h2>
                        </div>
                        <div id={"collapse" + season.id} className="collapse" aria-labelledby={season.id}
                             data-parent="#seasons">
                          <div className="card-body">
                            {season.overview}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

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

export default SerialUI;

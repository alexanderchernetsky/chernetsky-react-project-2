import React from "react";
import PropTypes from "prop-types";

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";

class MoviePage extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  };

  state = {
    movie: undefined
  };

  componentDidMount = async () => {
    const movieId = this.props.match.params.movieId;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
    ).then(res => res.json());

    this.setState({ movie: data });
  };

  render() {
    const { movie } = this.state;
    return (
      <div className="container">
        {this.state.movie && (
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
                onClick={this.props.history.goBack}
                className="btn btn-primary btn-lg mt-3"
              >
                Return Back
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MoviePage;

import React from 'react';

const Movies = (props) => {
  return (
      <div className="card-columns">
        {props.movies.map(movie => (
          <div className="card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" className="card-img-top movie-card"/>
            <div className="card-body">
              <h5 className="card-title">Card title that wraps to a new line</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
            </div>
          </div>
        ))}
      </div>
  )
};

export default Movies;
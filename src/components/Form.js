import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Form = (props) => {
  return (
      <header className="app-header">
        <div className="app-header__name-wrapper">
          <Link to='/' className="app-header__name mb-2 text-white text-decoration-none">Movie Search</Link>
        </div>
        <form onSubmit={props.findMovies}>
          <label htmlFor="filmName">Type the name of the film: </label>
          <input type="text" name="filmName"/>
          <button type="submit">Search</button>
        </form>
      </header>
  )
};

Form.propTypes = {
  findMovies: PropTypes.func,
};

export default Form;
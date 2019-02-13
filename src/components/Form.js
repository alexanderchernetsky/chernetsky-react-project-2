import React from 'react';

const Form = (props) => {
  return (
      <header className="app-header">
        <form onSubmit={props.findMovies}>
          <label htmlFor="filmName">Type the name of the film: </label>
          <input type="text" name="filmName"/>
          <button type="submit">Search</button>
        </form>
      </header>
  )
};

export default Form;
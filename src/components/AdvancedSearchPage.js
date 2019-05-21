import React from 'react';
import Header from './Header';

function AdvancedSearchPage(props) {
  return (
    <>
      <Header/>
      <div className="container-fluid col-9 bg-secondary mt-4">
        <div className="mx-auto col-3 text-center font-weight-bold mt-4">Advanced Search</div>
        <form onSubmit={findFilm}>
          <div className="form-row">
            <label htmlFor="filmName">Type the name of the film: </label>
            <input type="text" className="form-control" name="filmName"/>
          </div>
          <div className="form-row">
            <div className="col-4">
              <label htmlFor="sorting">Sort by:</label>
              <select className="form-control">
                <option disabled selected value> -- select an option -- </option>
                <option value="popularity">most popular</option>
                <option value="date">newest</option>
                <option value="revenue">the most profitable</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="genre">Genre:</label>
              <select className="form-control">
                <option disabled selected value> -- select an option -- </option>
                <option value="drama">drama</option>
                <option value="comedy">comedy</option>
                <option value="thriller">thriller</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="release-year">Release date:</label>
              <input type="text" className="form-control" name="release-year"/>
            </div>
          </div>
          <br/>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" name="TVserial" className="custom-control-input" id="TVserial"/>
            <label className="custom-control-label" htmlFor="TVserial">Search for TV-serial</label>
          </div>
          <br/>
          <button className="btn btn-primary mb-4" type="submit">Find</button>
        </form>
      </div>
    </>
  )
}

function findFilm(event) {
  event.preventDefault();
  console.log(event);
}

export default AdvancedSearchPage;

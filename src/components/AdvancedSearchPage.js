import React, {useEffect} from 'react';
import Header from './Header';
import createSearchString from '../helpers/createSearchString';
import getFilledParams from '../helpers/getFilledParams';


const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";


function AdvancedSearchPage(props) {

  const findFilmByParams = async event => {
    event.preventDefault();
    const {genre, sorting, release_date, TVserial, keyword} = event.target;

    const params = {
      with_genres: genre.value,
      sort_by: sorting.value,
      primary_release_year: release_date.value,
    };

    if (keyword) {
      let keywordsArray;
      let keywordsIdArray = [];
      await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${api_key}&query=${keyword.value}&page=1`)
        .then(res => res.json())
        .then(res => {
          keywordsArray = res.results;
          keywordsArray.forEach(obj => keywordsIdArray.push(obj.id));
          params.with_keywords = keywordsIdArray.join('|');
        })
    }

    let type;
    TVserial.checked ? type = "tv" : type = "movie";
    props.history.push(`search/${type}${createSearchString(getFilledParams(params))}`);
  };

  const findFilmByName = event  => {
    event.preventDefault();
    const {TVserial2} = event.target;
    const filmName = event.target.filmName.value;
    let type;
    TVserial2.checked ? type = "tv" : type = "movie";
    props.history.push(`search/${type}?title=${filmName}`);
  };

  return (
    <>
      <Header/>

      <div className="container-fluid col-9 bg-secondary mt-4">
        <div className="mx-auto col-3 text-center font-weight-bold mt-4">Advanced Search</div>

        <form onSubmit={findFilmByName} className="bg-light p-3">
          <div className="form-row">
            <label htmlFor="filmName">Search by the name of the film: </label>
            <input type="text" className="form-control" name="filmName"/>
          </div>
          <br/>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" name="TVserial" className="custom-control-input" id="TVserial"/>
            <label className="custom-control-label" htmlFor="TVserial">Search for TV-serial/TV-show</label>
          </div>
          <br/>
          <button className="btn btn-primary mb-4" type="submit">Find</button>
        </form>
        <br/>

        <form onSubmit={findFilmByParams} className="bg-light p-3">
          <div className="form-row">
            <label htmlFor="keyword">Enter keyword: </label>
            <input type="text" className="form-control" name="keyword"/>
          </div>
          <div className="form-row">
            <div className="col-4">
              <label htmlFor="sorting">Sort by:</label>
              <select className="form-control" name="sorting">
                <option label=" "></option>
                <option value="popularity.desc">most popular</option>
                <option value="release_date.desc">newest</option>
                <option value="revenue.desc">most profitable</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="genre">Genre:</label>
              <select className="form-control" name="genre" defaultValue="select an option">
                <option label=" "></option>
                <option value="18">drama</option>
                <option value="35">comedy</option>
                <option value="878">science fiction</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="release_date">Release date:</label>
              <input type="text" className="form-control" name="release_date"/>
            </div>
          </div>
          <br/>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" name="TVserial" className="custom-control-input" id="TVserial2"/>
            <label className="custom-control-label" htmlFor="TVserial2">Search for TV-serial/TV-show</label>
          </div>
          <br/>
          <button className="btn btn-primary mb-4" type="submit">Find</button>
        </form>
      </div>
    </>
  )
}

export default AdvancedSearchPage;

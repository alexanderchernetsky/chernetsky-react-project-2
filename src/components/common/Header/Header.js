import React from 'react';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {faSpinner, faSearch, faSlidersH} from '@fortawesome/free-solid-svg-icons/index';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import './style.sass';

function Header(props) {
  const findFilm = event => {
    event.preventDefault();
    const {history} = props;
    const searchFieldValue = event.target.filmName.value;
    history.push(`/search/movie?title=${searchFieldValue}`);
  };

  const openAdvancedSearchPage = () => {
    props.history.push('/advanced');
  };

  return (
    <header className="app-header">
      <div className="app-header__name-wrapper">
        <Link
          to="/"
          className="app-header__name mb-2 text-white text-decoration-none"
        >
          Movie Search
        </Link>
      </div>
      <form onSubmit={findFilm}>
        <label htmlFor="filmName">Type the name of the movie: </label>
        <input type="text" name="filmName"/>
        <button className="app-header__button" type="button" onClick={openAdvancedSearchPage}>
          <FontAwesomeIcon icon={faSlidersH}/>
        </button>
        <button type="submit" className="app-header__button">
          {props.loading ?
            <FontAwesomeIcon icon={faSpinner} spin/> :
            <FontAwesomeIcon icon={faSearch}/>
          }
        </button>
      </form>
    </header>
  );
}

Header.propTypes = {
  goToSearchPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default withRouter(Header);

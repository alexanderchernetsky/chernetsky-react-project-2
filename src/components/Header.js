import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {faSpinner, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = props => {
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
      <form onSubmit={props.findMovies}>
        <label htmlFor="filmName">Type the name of the film: </label>
        <input type="text" name="filmName" />
        <button type="submit">
          {props.loading ?
              <FontAwesomeIcon icon={faSpinner} spin/> :
              <FontAwesomeIcon icon={faSearch} />
          }
        </button>
      </form>
    </header>
  );
};

Header.propTypes = {
  goToSearchPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default Header;

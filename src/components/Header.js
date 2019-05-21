import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {faSpinner, faSearch, faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Header extends Component {
  findFilm = event => {
    const {history} = this.props;
    event.preventDefault();
    const isItTVSerial = event.target.TVserial.checked;
    const searchFieldValue = event.target.filmName.value;
    if (isItTVSerial) {
      history.push(`/search?type=tv&query=${searchFieldValue}&page=1`);
    } else {
      history.push(`/search?type=movie&query=${searchFieldValue}&page=1`);
    }
  };

  openAdvancedSearchPage = () => {
    this.props.history.push('/s');
  };

  render() {
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
        <form onSubmit={this.findFilm}>
          <label htmlFor="filmName">Type the name of the film: </label>
          <input type="text" name="filmName"/>
          <button type="button" onClick={this.openAdvancedSearchPage}>
            <FontAwesomeIcon icon={faSlidersH}/>
          </button>
          <button type="submit">
            {this.props.loading ?
              <FontAwesomeIcon icon={faSpinner} spin/> :
              <FontAwesomeIcon icon={faSearch}/>
            }
          </button>
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  goToSearchPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default withRouter(Header);

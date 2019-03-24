import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from "./Form";
import Slider from './Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch  } from '@fortawesome/free-solid-svg-icons';

class Welcome extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  goToSearchPage = (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    this.props.history.push(`/search/${searchFieldValue}/1`);
  };

  render() {
    return (
        <React.Fragment>
          <FontAwesomeIcon icon={faSpinner} spin />
          <Form findMovies={this.goToSearchPage}/>
          <Slider/>
        </React.Fragment>
    )
  }
}

export default Welcome;
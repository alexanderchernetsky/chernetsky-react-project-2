import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from "./Form";
import Slider from './Slider';

class Welcome extends Component {
  static propTypes = {
    goToSearchPage: PropTypes.func,
  };

  goToSearchPage = (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    this.props.history.push(`/search/${searchFieldValue}/1`);
  };

  render() {
    return (
        <React.Fragment>
          <Form findMovies={this.goToSearchPage}/>
          <Slider/>
        </React.Fragment>
    )
  }
}

export default Welcome;
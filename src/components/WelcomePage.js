import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";
import Slider from './Slider';

class WelcomePage extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  goToSearchPage = event => {
    const { history } = this.props;
    event.preventDefault();
    const searchFieldValue = event.target.filmName.value;
    history.push(`/search/${searchFieldValue}/1`);
  };

  render() {
    return (
        <React.Fragment>
          <Header findMovies={this.goToSearchPage}/>
          <Slider/>
        </React.Fragment>
    )
  }
}

export default WelcomePage;
import React, {Component} from 'react';
import Form from "./Form";
import Slider from './Slider';

class Welcome extends Component {

  goToSearchPage = (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    const query = searchFieldValue.replace(' ', '%20');
    this.props.history.push(`/search/${query}`);
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
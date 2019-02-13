import React, {Component} from 'react';

class Welcome extends Component {

  goToSearchPage = (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    const query = searchFieldValue.replace(' ', '%20');
    this.props.history.push(`/search/${query}`);
  };

  render() {
    return (
        <form onSubmit={this.goToSearchPage}>
          <label htmlFor="filmName">Type the name of the film:</label>
          <input type="text" name="filmName"/>
          <button type="submit">Search</button>
        </form>
    )
  }
}

export default Welcome;
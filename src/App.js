import {Component} from 'react';
import Form from './components/Form';
import Movies from './components/Movies';
import React from 'react';
import './style.css';

const api_key = 'eeb7c73b7cfc09ed59ca3805d5018bd0';

class App extends Component {
  state = {
    movies: undefined,
    total: undefined,
  };

  findMovies = async (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    const query = searchFieldValue.replace(' ', '%20');
    console.log(query);
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(res => res.json());

    this.setState({
      movies: data.results,
      total: data.total_results,
    })

  };

  render() {
    return (
        <div>
          <Form findMovies={this.findMovies}/>
          {this.state.total&&<p>Results found: {this.state.total}</p>}
          {this.state.movies&&<Movies movies={this.state.movies}/>}
        </div>
    );
  }
}

export default App;
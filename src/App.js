import {Component} from 'react';
import Form from './components/Form';
import Movies from './components/Movies';
import React from 'react';
import './style.css';

const api_key = 'eeb7c73b7cfc09ed59ca3805d5018bd0';

class App extends Component {
  state = {
    query: undefined,
    movies: undefined,
    total: undefined,
    page: undefined,
    totalPages: undefined,
  };

  findMovies = async (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    const query = searchFieldValue.replace(' ', '%20');
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(res => res.json());

    console.log(data);

    this.setState({
      query: query,
      movies: data.results,
      total: data.total_results,
      page: data.page,
      totalPages: data.total_pages,
    })
  };

  switchToPage = async (direction) => {
    const page = this.state.page + direction;
    const query = this.state.query;
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
        .then(res => res.json());

    console.log(data);

    this.setState({
      movies: data.results,
      page: data.page,
    })
  };

  render() {
    const {page, totalPages, total} = this.state;
    return (
        <div>
          <Form findMovies={this.findMovies}/>
          {total&&<p>Results found: {total}</p>}
          {page&&
          <p>
            {totalPages&&page !==1&&<span onClick={() => this.switchToPage(-1)} className="badge badge-secondary">previous</span>}
            Page: {page} from {totalPages}
            {totalPages&&totalPages !==1&&(page !== totalPages)&&<span onClick={() => this.switchToPage(1)} className="badge badge-secondary">next</span>}
          </p>}
          {this.state.movies&&<Movies movies={this.state.movies}/>}
        </div>
    );
  }
}

export default App;
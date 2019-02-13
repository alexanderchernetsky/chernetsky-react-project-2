import {Component} from 'react';
import Form from './components/Form';
import Movies from './components/Movies';
import React from 'react';
import './style.css';

const api_key = 'eeb7c73b7cfc09ed59ca3805d5018bd0';

class App extends Component {
  state = {
    query: undefined,
    results: {},
  };

  componentDidMount = async () => {
    const pathName = this.props.location.pathname;
    const query = pathName.replace('/search/','').replace(' ', '%20');
    console.log(query);
    const data = JSON.parse(localStorage.getItem(`/search/${query}`));
    console.log(data);
    if (data) {
      this.setState({query: query, results: data});
    } else {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`)
          .then(res => res.json());

      console.log(data);

      this.setState({
        query: query,
        results: data,
      });

      localStorage.setItem(`/search/${this.state.query}`,JSON.stringify(this.state.results));
    }
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
      results: data,
    });

    this.props.history.push(`/search/${query}`);

    localStorage.setItem(`/search/${this.state.query}`,JSON.stringify(this.state.results));
  };

  changePage = async (direction) => {
    const page = this.state.results.page + direction;
    const query = this.state.query;
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
        .then(res => res.json());

    console.log(data);

    this.setState({
      results: data,
    })
  };

  render() {
    const {total_pages, total_results, results, page} = this.state.results;
    return (
        <div>
          <Form findMovies={this.findMovies}/>
          {total_results&&<p>Results found: {total_results}</p>}
          {page&&
          <p>
            {total_pages&&page !==1&&<span onClick={() => this.changePage(-1)} className="badge badge-secondary">previous</span>}
            Page: {page} from {total_pages}
            {total_pages&&total_pages !==1&&(page !== total_pages)&&<span onClick={() => this.changePage(1)} className="badge badge-secondary">next</span>}
          </p>}
          {results&&<Movies movies={results}/>}
        </div>
    );
  }
}

export default App;
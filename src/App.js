import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Movies from './components/Movies';
import SortForm from './components/SortForm';
import Pagination from './components/Pagination';
import './style.css';

const api_key = 'eeb7c73b7cfc09ed59ca3805d5018bd0';

class App extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  };

  state = {
    query: undefined,
    page: undefined,
    results: {},
    sorted: 'no',
  };

  componentDidMount = async () => {
    console.log('did mount works!');
    const {page, query} = this.props.match.params;
    console.log(page);
    console.log(query);

    const data = JSON.parse(localStorage.getItem(`/search/${query}/${page}`));
    console.log(data);
    if (data) {
      this.setState({
        query: query,
        results: data,
        page: page,
      });
    } else {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
          .then(res => res.json());

      console.log(data);

      this.setState({
        query: query,
        page: page,
        results: data,
      });

      localStorage.setItem(`/search/${query}/${page}`,JSON.stringify(this.state.results));
    }
  };

  componentDidUpdate = async (prevProps, prevState, prevContext) => {
    console.log('did update works!');
    if (prevProps.match.params.page !== this.props.match.params.page) {
      console.log('page changed!');
      const {page, query} = this.props.match.params;
      console.log(page);
      console.log(query);

      const data = JSON.parse(localStorage.getItem(`/search/${query}/${page}`));
      console.log(data);
      if (data) {
        this.setState({
          query: query,
          results: data,
          page: page,
        });
      } else {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
            .then(res => res.json());

        console.log(data);

        this.setState({
          query: query,
          page: page,
          results: data,
        });

        localStorage.setItem(`/search/${query}/${page}`, JSON.stringify(this.state.results));
      }
      setTimeout(this.sortResults, 50); // to prevent bugs caused by asynchronous nature of setState
    }

    if(prevState.sorted !== this.state.sorted) {
      this.sortResults();
    }
  };

  findMovies = async (e) => {
    e.preventDefault();
    const searchFieldValue = e.target.filmName.value;
    const query = searchFieldValue.replace(' ', '%20');
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(res => res.json());

    console.log(data);

    const page = data.page;

    this.setState({
      query: query,
      page,
      results: data,
    });

    this.props.history.push(`/search/${query}/${page}`);

    localStorage.setItem(`/search/${query}/${page}`,JSON.stringify(this.state.results));

    setTimeout(this.sortResults, 50); // to prevent bugs caused by asynchronous nature of setState
  };

  changePage = async (direction) => {
    const page = this.state.results.page + direction;
    const query = this.state.query;

    this.setState({
      page,
    });

    this.props.history.push(`/search/${query}/${page}`);
  };

  setSorting = (e) => {
    console.log(e.currentTarget.value);
    this.setState({sorted: e.currentTarget.value});
  };

  sortResults = () => {
    console.log('sorting works!');
    const data = {...this.state.results};
    console.log(data);
    let sorted;
    if (this.state.sorted === 'vote_average') {
      sorted = data.results.sort((first, second) => {
        return second.vote_average - first.vote_average;
      });
      data.results = sorted;
    }
    if(this.state.sorted === 'no') {
      sorted = data.results.sort((first, second) => {
        return second.id - first.id;
      });
      data.results = sorted;
    }
    if(this.state.sorted === 'date') {
      sorted = data.results.sort((first, second) => {
        return second.release_date.split('-').join('') - first.release_date.split('-').join('');
      });
      data.results = sorted;
    }
    console.log(sorted);
    this.setState({results: data});
  };

  render() {
    const {results} = this.state.results;
    return (
        <div>
          <Form findMovies={this.findMovies}/>
          <Pagination results={this.state.results} changePage={this.changePage}/>
          <SortForm setSorting={this.setSorting}/>
          {results&&<Movies movies={results}/>}
        </div>
    );
  }
}

export default App;
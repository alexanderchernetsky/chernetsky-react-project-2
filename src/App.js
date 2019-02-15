import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Movies from './components/Movies';
import SortForm from './components/SortForm';
import Pagination from './components/Pagination';
import './style.sass';

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
    const {page, query} = this.props.match.params;

    const data = JSON.parse(localStorage.getItem(`/search/${query}/${page}`));
    if (data) {
      this.setState({
        query: query,
        results: data,
        page: page,
      });
    } else {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
          .then(res => res.json());

      this.setState({
        query: query,
        page: page,
        results: data,
      });

      localStorage.setItem(`/search/${query}/${page}`,JSON.stringify(this.state.results));
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      const {page, query} = this.props.match.params;
      const data = JSON.parse(localStorage.getItem(`/search/${query}/${page}`));
      if (data) {
        this.setState({
          query: query,
          results: data,
          page: page,
        });
      } else {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
            .then(res => res.json());

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
    this.setState({sorted: e.currentTarget.value});
  };

  sortResults = () => {
    const data = {...this.state.results};
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
    this.setState({results: data});
  };

  render() {
    const {results, total_results} = this.state.results;
    return (
        <div>
          <Form findMovies={this.findMovies}/>
          <div className="container-fluid">
            <div className="row bg-secondary">
              <div className="col-12 col-md-3 col-xl-4">
                {total_results&&<p className='pb-1 mb-0 text-center'>Results found: {total_results}</p>}
              </div>
              <div className="col-12 col-md-3 col-xl-4">
                <Pagination results={this.state.results} changePage={this.changePage}/>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <SortForm setSorting={this.setSorting}/>
              </div>
            </div>
          </div>
          {results&&<Movies movies={results}/>}
        </div>
    );
  }
}

export default App;
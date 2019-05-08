import React, {Component} from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Movies from "./Movies";
import PaginationAndSorting from "./PaginationAndSorting";
import "../style.sass";

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";

export const MyContext = React.createContext();

export class SearchPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  };

  state = {
    query: undefined,
    page: undefined,
    results: {},
    sorted: "no",
    loading: false
  };

  componentDidMount() {
    const {page, query} = this.props.match.params;
    this.getResults(page, query);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      const {page, query} = this.props.match.params;
      await this.getResults(page, query);
      this.sortResults();
    }
    if (prevState.sorted !== this.state.sorted) {
      this.sortResults();
    }
  };


  getResults = async (page, query) => {
    this.setState({loading: true});

    const data = JSON.parse(localStorage.getItem(`/search/${query}/${page}`));

    if (data) {
      this.setState({
        query: query,
        page: page,
        results: data,
      });
    } else {
      const data = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`
      ).then(res => res.json());
      this.setState({
        query: query,
        page: page,
        results: data,
      });
      localStorage.setItem(`/search/${query}/${page}`, JSON.stringify(data));
    }
    this.setState({loading: false});
  };

  findMovies = async event => {
    const {history} = this.props;
    event.preventDefault();
    const searchFieldValue = event.target.filmName.value;
    const query = searchFieldValue.replace(" ", "%20");
    await this.getResults(1, query);
    history.push(`/search/${query}/1`);
    this.sortResults();
  };

  changePage = async direction => {
    const page = this.state.results.page + direction;
    const query = this.state.query;

    this.setState({
      page
    });

    this.props.history.push(`/search/${query}/${page}`);
  };

  setSorting = e => {
    this.setState({sorted: e.currentTarget.value});
  };

  sortResults = () => {
    const data = {...this.state.results};
    let sorted;
    if (this.state.sorted === "vote_average") {
      sorted = data.results.sort((first, second) => {
        return second.vote_average - first.vote_average;
      });
      data.results = sorted;
    }
    if (this.state.sorted === "no") {
      sorted = data.results.sort((first, second) => {
        return second.id - first.id;
      });
      data.results = sorted;
    }
    if (this.state.sorted === "date") {
      sorted = data.results.sort((first, second) => {
        return (
            second.release_date.split("-").join("") -
            first.release_date.split("-").join("")
        );
      });
      data.results = sorted;
    }
    this.setState({results: data});
  };

  render() {
    const {results, total_results} = this.state.results;
    return (
        <MyContext.Provider value={{ state: this.state }}>
          <Header findMovies={this.findMovies} loading={this.state.loading}/>
          <div className="container-fluid">
            <div className="row bg-secondary">
              <PaginationAndSorting setSorting={this.setSorting} changePage={this.changePage}/>
            </div>
          </div>
          {results && <Movies movies={results}/>}
        </MyContext.Provider>
    );
  }
}


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
    page: undefined,
    results: [],
    sorted: "no",
    loading: false
  };

  componentDidMount() {
    this.getResults();
  }

  /*componentDidUpdate = async (prevProps, prevState) => {
    console.log('componentDidUpdate');
    if (prevProps.location.search !== this.props.location.search) {
      await this.getResults();
      /!*this.sortResults();*!/
    }
    if (prevState.sorted !== this.state.sorted) {
      this.sortResults();
    }
  };*/


  getResults = async () => {
    const {params} = this.props.match;
    const paramsString = this.props.location.search;
    const type = params.type;

    this.setState({loading: true});

    let data = await fetch(
      `https://api.themoviedb.org/3/discover/${type}${paramsString}&api_key=${api_key}&page=1`
    );
    data = await data.json();
    console.log(data.results);
    this.setState({
      results: data.results,
    });

    this.setState({loading: false});
  };

  /*changePage = async direction => {
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
  };*/

  moreButtonHandler = id => {
    this.props.history.push(`/preview/${this.state.type}/${id}`);
  };

  render() {
    const {results} = this.state;
    console.log(results);
    return (
      <MyContext.Provider value={{state: this.state}}>
        <Header loading={this.state.loading}/>
        <div className="container-fluid">
          <div className="row bg-secondary">
            <PaginationAndSorting setSorting={this.setSorting} changePage={this.changePage}/>
          </div>
        </div>
        {results && <Movies movies={results} moreButtonHandler={this.moreButtonHandler}/>}
      </MyContext.Provider>
    );
  }
}


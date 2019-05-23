import React, {Component} from "react";
import PropTypes from "prop-types";
import Header from "../../common/Header/Header";
import Movies from "./components/Movies";


const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";

const MyContext = React.createContext();

class SearchPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  };

  state = {
    type: undefined,
    query: '',
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
    const paramsString = this.props.location.search;
    const type = this.props.match.params.type;
    const params = new URLSearchParams(paramsString);
    this.setState({loading: true});
    let data;
    if (params.has('title')) {
      const title = params.get('title');
      data = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${api_key}&language=en-US&query=${title}&page=1`)
    } else {
      data = await fetch(
        `https://api.themoviedb.org/3/discover/${type}${paramsString}&api_key=${api_key}&page=1`
      );
    }

    data = await data.json();
    this.setState({
      type: type,
      query: paramsString,
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
            pagination
          </div>
        </div>
        {results && <Movies movies={results} moreButtonHandler={this.moreButtonHandler}/>}
      </MyContext.Provider>
    );
  }
}

export default SearchPage;
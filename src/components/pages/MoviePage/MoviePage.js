import React from "react";
import PropTypes from "prop-types";
import SerialUI from "./components/SerialUI";
import MovieUI from "./components/MovieUI";

const api_key = "eeb7c73b7cfc09ed59ca3805d5018bd0";

class FilmPage extends React.Component {
  static propTypes = {
    props: PropTypes.shape({
      match: PropTypes.object,
      history: PropTypes.object
    })
  };

  state = {
    movie: undefined
  };

  backButtonHandler = () => {
    const { props } = this.props;
    props.history.goBack();
  };

  componentDidMount = async () => {
    const { props } = this.props;
    const filmId = props.match.params.filmId;
    const filmType = props.match.params.filmType;
    const data = await fetch(
      `https://api.themoviedb.org/3/${filmType}/${filmId}?api_key=${api_key}&language=en-US`
    ).then(res => res.json());

    this.setState({ movie: data });
  };

  render() {
    return (
        <div className="container">
          {this.props.children(this.state, this.backButtonHandler)}
        </div>
    );
  }
}

const MoviePageComponent = props => {
  const {filmType} = props.match.params;
  return (
      <React.Fragment>
      {
      (filmType === "movie") ?
          <FilmPage props={props}>{(state, handler) => <MovieUI state={state} handler={handler}/>}</FilmPage> :
          <FilmPage props={props}>{(state, handler) => <SerialUI state={state} handler={handler}/>}</FilmPage>
      }
      </React.Fragment>
  )
};

export default MoviePageComponent;

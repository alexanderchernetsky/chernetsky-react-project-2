import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Movie from './Movie';
import NotFound from './NotFound';

const Router = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/search/:query' component={App}/>
          <Route path='/movie/:movieId' component={Movie}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
  )
};

export default Router;

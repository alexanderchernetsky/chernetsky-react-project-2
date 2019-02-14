import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Movie from './Movie';
import NotFound from './NotFound';
import Welcome from './Welcome';

const Router = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Welcome}/>
          <Route path='/search/:query/:page' component={App}/>
          <Route path='/movie/:movieId' component={Movie}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
  )
};

export default Router;

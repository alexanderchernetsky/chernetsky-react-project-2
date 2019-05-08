import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SearchPage } from "./SearchPage";
import Fallback from './Fallback';
import NoResults from "./NoResults";
const MoviePage = lazy(() => import ("./MoviePage"));
const WelcomePage = lazy(() => import ("./HomePage"));


const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={Fallback}>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/search/:query/:page" component={SearchPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route render={() => <NoResults title='The page doesnt exist!' />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

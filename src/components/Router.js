import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SearchPage } from "./SearchPage";
import Fallback from './Fallback';
import NoResults from "./NoResults";
const MoviePageComponent = lazy(() => import ("./MoviePage"));
const HomePage = lazy(() => import ("./HomePage"));
const AdvancedSearchPage = lazy(() => import ("./AdvancedSearchPage"));


const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={Fallback}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/:type" component={SearchPage} />
          <Route path="/s" component={AdvancedSearchPage} />
          <Route path="/preview/:filmType/:filmId" component={MoviePageComponent} />
          <Route render={() => <NoResults title='The page doesnt exist!' />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

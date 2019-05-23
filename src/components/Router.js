import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Fallback from './common/Fallback';
import NoResults from "./common/NoResults";
const MoviePageComponent = lazy(() => import ("./pages/MoviePage/MoviePage"));
const SearchPage = lazy(() => import ("./pages/SearchPage/SearchPage"));
const HomePage = lazy(() => import ("./pages/HomePage/HomePage"));
const AdvancedSearchPage = lazy(() => import ("./pages/AdvancedSearchPage/AdvancedSearchPage"));


const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={Fallback}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/search/:type" component={SearchPage}/>
          <Route path="/advanced" component={AdvancedSearchPage}/>
          <Route path="/preview/:filmType/:filmId" component={MoviePageComponent}/>
          <Route render={() => <NoResults title="Sorry. This page doesn't exist!"/>}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

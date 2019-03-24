import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
const Movie = lazy(() => import ("./Movie"));
const NotFound = lazy(() => import ("./NotFound"));
const Welcome = lazy(() => import ("./Welcome"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/search/:query/:page" component={App} />
          <Route path="/movie/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

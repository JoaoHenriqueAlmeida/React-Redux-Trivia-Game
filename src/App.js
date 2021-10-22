import React from 'react';
import { Route, Switch } from 'react-router';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}

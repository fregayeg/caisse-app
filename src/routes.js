/********************Imports*************************/
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// We import all our components (pages)
import App from './components/App';
import HomePage from './components/home/HomePage';
import TasksPage from './components/task/TasksPage';

/********************The Route object*************************/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/tasks" component={TasksPage}/>
  </Route>
);

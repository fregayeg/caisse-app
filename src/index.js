/********************Imports*************************/
// this is necessary for transpiling
import 'babel-polyfill';

// Independent Library, which allow to use React components
import React from 'react';

// Independent library which transmit our react component into a React virtual DOM
import ReactDOM from 'react-dom';

// Router : is the element where we store our routes
// browserHistory : holds and handle the navigation history
import { Router, browserHistory } from 'react-router';

// We need to reference our routes already done, to the Router component in this file
import routes from './routes';

// Webpack let's us import css like we do with js modules!
import './styles/styles.css'; //Webpack can import CSS files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/********************Constants*************************/
// we use constants to simplify development

const element = (<Router history={browserHistory} routes={routes} />);
const htmlRoot = document.getElementById('root');

/***********************ReactDOM**************************/
ReactDOM.render(element, htmlRoot);

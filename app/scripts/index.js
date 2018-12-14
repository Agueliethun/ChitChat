import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './MainPage';
import AboutPage from './AboutPage';
import '../css/base.css';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={MainPage}/>
		<Route path='/api/about/' component={AboutPage}/>
	</Router>
  ), document.getElementById('content')
);
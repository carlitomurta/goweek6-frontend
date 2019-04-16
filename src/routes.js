import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/main';
import Box from './pages/box';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/box/:id" component={Box} />
		</Switch>
	</BrowserRouter>
);
export default Routes;

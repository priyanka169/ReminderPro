import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app';
import reminders from './reducer';

const store = (createStore);

ReactDOM.render(
	<Provider store={store(reminders)}>
		<App />
	</Provider>, document.querySelector('.container'));

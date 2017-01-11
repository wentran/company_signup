import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import counterApp from './reducers'
// import App from 'src/'
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 3000;

app.use(handleRender);

function handleRender (req, res) {
	const store = createStore(counterApp);

const html = renderToString(
	<Provider store={store}>
	  <App />
	</Provider>
	);

const preloadedState = store.getState();

res.send(renderFullPage(html, preloadedState))

};

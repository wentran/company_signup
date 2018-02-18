import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers'
import App from 'src/'
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 3000;

app.use(handleRender);

//invoked evertime client requests to app
function handleRender (req, res) {
	const store = createStore(counterApp);

//render the component to a string for SEO crawler and performance boost - App as root component to be wrapped inside a provider to make the store available to all components in the component tree

//render initial HTML of component before we send it to clinet sire
const html = renderToString(
	<Provider store={store}>
	  <App />
	</Provider>
	);

//grab initial state from Redux store
const preloadedState = store.getState();

//send the rendered page back to the client.
res.send(renderFullPage(html, preloadedState))
};


function renderFullPage (html, preloadedState) {
	return '
    <!doctype html>
    <html>
      <head>

	'
}
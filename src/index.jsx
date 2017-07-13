import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const everyChospeed = document.getElementById('every-chospeed');
if(everyChospeed) {
	ReactDOM.render(<App/>, document.getElementById('every-chospeed'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import "normalize.css";
import './index.css';

import BlogApp from './BlogApp';
import configureStore from './configureStore';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BlogApp/>
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext';
import { MoviesProvider } from './context/MoviesContext';
ReactDOM.render(
  <React.StrictMode>
    <MoviesProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </MoviesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext';
import { MoviesProvider } from './context/MoviesContext';
import { CustomersProvider } from './context/CustomersContext';
import { EpisodesProvider } from './context/ContextEpisodes'; // Import EpisodesProvider

ReactDOM.render(
  <React.StrictMode>
    <CustomersProvider>
      <MoviesProvider>
        <CategoriesProvider>
          <EpisodesProvider> 
            <App />
          </EpisodesProvider>
        </CategoriesProvider>
      </MoviesProvider>
    </CustomersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

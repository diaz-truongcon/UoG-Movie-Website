import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext';
import { MoviesProvider } from './context/MoviesContext';
import { CustomersProvider } from './context/CustomersContext';
import { EpisodesProvider } from './context/ContextEpisodes'; // Import EpisodesProvider
import { CustomerLoginProvider } from './context/CustomerLoginContext';
import { BrowserRouter } from 'react-router-dom';
import { PlansProvider } from './context/PlansContext'; // Import PlansProvider
import { FeaturesProvider } from './context/ContextFeatures';
import { CommentsProvider } from './context/CommentsProvider'; // Import CommentsProvider
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomersProvider>
        <MoviesProvider>
          <CategoriesProvider>
            <EpisodesProvider>
              <PlansProvider>
                <FeaturesProvider>
                  <CommentsProvider>
                    <CustomerLoginProvider>
                      <App />
                    </CustomerLoginProvider>
                  </CommentsProvider>
                </FeaturesProvider>
              </PlansProvider>
            </EpisodesProvider>
          </CategoriesProvider>
        </MoviesProvider>
      </CustomersProvider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

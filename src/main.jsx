import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext';
import { MoviesProvider } from './context/MoviesContext';
import { CustomersProvider } from './context/CustomersContext';
import { EpisodesProvider } from './context/ContextEpisodes'; // Import EpisodesProvider
import { CustomerLoginProvider } from './context/CustomerLoginContext';
import { BrowserRouter} from 'react-router-dom';
import { PlansProvider } from './context/PlansContext'; // Import PlansProvider
import { FeaturesProvider } from './context/ContextFeatures';
ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <CustomerLoginProvider>
    <CustomersProvider>
      <MoviesProvider>
        <CategoriesProvider>
          <EpisodesProvider>
         <PlansProvider>
          <FeaturesProvider>
           <App />
          </FeaturesProvider>
        </PlansProvider>        
          </EpisodesProvider>
        </CategoriesProvider>
      </MoviesProvider>
    </CustomersProvider>
  </CustomerLoginProvider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

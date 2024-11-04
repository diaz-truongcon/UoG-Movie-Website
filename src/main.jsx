import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesContext';
import { MoviesProvider } from './context/MoviesContext';
import { CustomersProvider } from './context/CustomersContext';
import { EpisodesProvider } from './context/ContextEpisodes';
import { CustomerLoginProvider } from './context/CustomerLoginContext';
import { PlansProvider } from './context/PlansContext';
import { FeaturesProvider } from './context/ContextFeatures';
import { CommentsProvider } from './context/CommentsProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import { WatchHistoryProvider } from './context/WatchHistoryProvider';
import { MessagesProvider } from './context/MessagesProvider';
import { RentMoviesProvider } from './context/RentMoviesProvider';
import { SubscriptionsProvider } from './context/SubscriptionsProvider';
// Mảng chứa tất cả các provider
const providers = [
    WatchHistoryProvider,
    CustomersProvider,
    MoviesProvider,
    CategoriesProvider,
    EpisodesProvider,
    PlansProvider,
    FeaturesProvider,
    CommentsProvider,
    RentMoviesProvider,
    CustomerLoginProvider,
    FavoritesProvider,
    MessagesProvider,
    SubscriptionsProvider
];

// Hàm để bọc các provider
const ProviderWrapper = ({ children }) => {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProviderWrapper>
                <App />
            </ProviderWrapper>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

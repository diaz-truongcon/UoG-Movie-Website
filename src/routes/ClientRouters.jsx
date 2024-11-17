import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../components/client/Main/Welcome';
import Main from '../components/client/Main/Main';
import Favorites from '../components/client/Favorite/Favorites';
import MovieDetail from '../components/client/Detail/MovieDetail';
import PlayMovie from '../components/client/Detail/PlayMovie';
import SubscriptionPlan from '../components/client/Vip/SubscriptionPlan';
import PaymentPage from '../components/client/Vip/PaymentPage';
import Search from '../components/client/Search/Search';
import AccountPage from '../components/client/AccountPage/AccountPage';
import RentMovies from '../components/client/Main/RentMovies';
import FAQ from '../components/client/Support/FAQ';
import Promotions from '../components/client/Support/Promotions';
import RentMovie from '../components/client/Vip/RentMovie';
import DeviceManagement from '../components/client/AccountPage/DeviceManagement';
import Offers from '../components/client/AccountPage/Offers';
import Rentflix from '../components/client/AccountPage/Rentflix';
import EditProfile from '../components/client/AccountPage/EditProfile';
import Pay from '../components/client/Vip/Pay';
const routes = [
    { path: "/", element: <Welcome /> },
    { path: "/main", element: <Main /> },
    { path: "/favorites", element: <Favorites /> },
    { path: "/moviedetail/:id", element: <MovieDetail /> },
    { path: "/playmovie/:id", element: <PlayMovie /> },
    { path: "/subscriptionplan", element: <SubscriptionPlan /> },
    { path: "/paymentpage/:id", element: <PaymentPage /> },
    { path: "/pay/:id", element: <Pay /> },
    { path: "/search", element: <Search /> },
    { 
        path: "/accountpage", 
        element: <AccountPage />,
        subRoutes: [
            { path: "", element: <EditProfile /> },
            { path: "rentflix", element: <Rentflix /> },
            { path: "device-management", element: <DeviceManagement /> },
            { path: "offers", element: <Offers /> },
        ]
    },
    { path: "/rent_movies", element: <RentMovies /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/promotions", element: <Promotions /> },
    { path: "/rentmovie/:id", element: <RentMovie /> },
];

// Recursive function to render both top-level and nested routes
function renderRoutes(routeArray) {
    return routeArray.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.subRoutes && renderRoutes(route.subRoutes)}
        </Route>
    ));
}

function ClientRouters() {
    return (
        <Routes>
            {renderRoutes(routes)}
        </Routes>
    );
}

export default ClientRouters;

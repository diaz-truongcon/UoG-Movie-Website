import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Categories from '../components/admin/Categories/Categories';
import Movies from '../components/admin/Movies/Movies';
import Episodes from '../components/admin/Episodes/Episodes';
import Customers from '../components/admin/Customers/Customers';
import Comments from '../components/admin/Movies/Comments';
import Plans from '../components/admin/Vip/Plans';
import Packages from '../components/admin/Vip/Packages';
import Features from '../components/admin/Vip/Features';
import Profile from '../components/admin/Profile/Profile';
import DashBoard from '../components/admin/DashBoard/DashBoard';

const routes = [
    { path: "/", element: <DashBoard/> },
    { path: "/categories", element: <Categories /> },
    { path: "/movies", element: <Movies /> },
    { path: "/episodes", element: <Episodes /> },
    { path: "/customers", element: <Customers /> },
    { path: "/comments", element: <Comments /> },
    { path: "/vip/plans", element: <Plans /> },
    { path: "/vip/packages", element: <Packages /> },
    { path: "/vip/features", element: <Features /> },
    { path: "/profile", element: <Profile /> },
];

function AdminRouters() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
}

export default AdminRouters;

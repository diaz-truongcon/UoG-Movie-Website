import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

function MenuApp({ isInline }) {
    const navigate = useNavigate();
    
    // Map `key` values to routes
    const menuRoutes = {
        home: "/",
        main: "/main",
        contacts: "/faq",
        rent_movies: "/rent_movies",
        promotions: "/promotions",
    };

    const handleMenuClick = (key) => {
        const route = menuRoutes[key];
        if (route) {
            navigate(route);
        }
    };

    // Memoize menu items to avoid unnecessary re-rendering
    const menuItems = useMemo(() => [
        { label: "Home", key: "home" },
        { label: "Movie Store", key: "main" },
        { label: "Rent Movies", key: "rent_movies" },
        { label: "Promotions", key: "promotions" },
        { label: "Contacts", key: "contacts" },
    ], []);

    return (
        <div>
            <Menu
                style={{ background: "none" }}
                mode={isInline ? "inline" : "horizontal"}
                onClick={({ key }) => handleMenuClick(key)}
                items={menuItems}
            />
        </div>
    );
}

export default MenuApp;

import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
function MenuApp({isInline}) {
    const navigate = useNavigate();
    const handleMenuClick = (key) => {
       if (key === "home") {
        navigate("/");
       }
       if (key === "main") {
        navigate("/main");
       }
       if (key === "promotions") {
        navigate("/faq");
       }
    };   
    return (
        <div>
            <Menu
                style={{ background: "none" }}
                mode={isInline ? "inline" : "horizontal"}
                onClick={({ key }) => handleMenuClick(key)}
                items={[
                    {
                        label: "Home",
                        key: "home",
                    },
                    {
                        label: "Movie Store",
                        key: "main",
                    },
                    {
                        label: "Rent Movies",
                        key: "rent_movies",
                    },
                    {
                        label: "VIP Movies",
                        key: "vipmovies",
                    },
                    {
                        label: "Promotions",
                        key: "promotions",
                    }
                ]}
            />
        </div>
    );
}

export default MenuApp;
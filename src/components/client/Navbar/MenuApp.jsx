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
       if (key === "contacts") {
        navigate("/faq");
       }
       if (key === "rent_movies") {
        navigate("/rent_movies");
       }
       if (key === "promotions") {
        navigate("/promotions");
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
                    ,
                    {
                        label: "Promotions",
                        key: "promotions",
                    },
                    {
                        label: "Contacts",
                        key: "contacts",
                    }
                ]}
            />
        </div>
    );
}

export default MenuApp;
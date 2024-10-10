import React, { useState, useEffect, createContext, useContext } from 'react';
import HomeAdmin from './components/admin/HomeAdmin/HomeAdmin';
import "./App.css";
import "./styles/Client.css" ;
import Home from './components/client/Home/Home';
import { ConfigProvider } from 'antd';
import { ligthTheme, darkTheme } from './components/theme/Theme';
import { CustomerLoginContext } from './context/CustomerLoginContext';


function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const { isLoggedIn } = useContext(CustomerLoginContext);
  
  return (
    <div>
          <ConfigProvider theme={{
            token: currentTheme === "dark" ? darkTheme : ligthTheme ,
          }}>
            {isLoggedIn.role == "admin" || isLoggedIn.role == "moderator" ? 
            <HomeAdmin currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}></HomeAdmin> : <Home ></Home> 
          }
          </ConfigProvider>
    </div>
  );
}

export default App;

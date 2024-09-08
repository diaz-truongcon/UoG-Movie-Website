import React, { useState, useEffect, createContext } from 'react';
import HomeAdmin from './components/admin/HomeAdmin/HomeAdmin';
import "./App.css";
import Home from './components/client/Home/Home';
import { ConfigProvider } from 'antd';
import { ligthTheme, darkTheme } from './components/theme/Theme';



function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [admin, setAdmin] = useState(false);
  return (
    <div>
          <ConfigProvider theme={{
            token: currentTheme === "dark" ? darkTheme : ligthTheme ,
          }}>
            {admin ? 
            <HomeAdmin currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}></HomeAdmin> : <Home setAdmin={setAdmin}></Home> 
          }
          </ConfigProvider>
    </div>
  );
}

export default App;

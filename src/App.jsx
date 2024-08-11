import React, { useState, useEffect, createContext } from 'react';
import HomeAdmin from './components/admin/HomeAdmin/HomeAdmin';
import "./App.css";
import Home from './components/client/Home/Home';
import { ConfigProvider } from 'antd';
import { ligthTheme, darkTheme } from './components/theme/Theme';



function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  return (
    <div>
          <ConfigProvider theme={{
            token: currentTheme === "dark" ? darkTheme : ligthTheme ,
          }}>
            <HomeAdmin currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}></HomeAdmin> 
          </ConfigProvider>
          {/* <Home></Home> */}
    </div>
  );
}

export default App;

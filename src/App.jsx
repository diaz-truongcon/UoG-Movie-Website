import React, { useState, useContext } from 'react';
import HomeAdmin from './components/admin/HomeAdmin/HomeAdmin';
import './App.css';
import Home from './components/client/Home/Home';
import { ConfigProvider } from 'antd';
import { ligthTheme, darkTheme } from './components/theme/Theme';
import { CustomerLoginContext } from './context/CustomerLoginContext';

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const { isLoggedIn } = useContext(CustomerLoginContext);

  // Xác định component cần render dựa trên vai trò người dùng
  const isAdminOrModerator = isLoggedIn?.role === 'admin' || isLoggedIn?.role === 'moderator';
  const ComponentToRender = isAdminOrModerator ? HomeAdmin : Home;

  return (
    <ConfigProvider
      theme={{
        token: currentTheme === 'dark' ? darkTheme : ligthTheme,
      }}
    >
      <ComponentToRender currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
    </ConfigProvider>
  );
}

export default App;

import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const CustomerLoginContext = createContext();

export const CustomerLoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Lấy trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('customerLogin');
    if (loggedInStatus) {
      setIsLoggedIn(JSON.parse(loggedInStatus));
    }
  }, []);
  // Lưu trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('customerLogin', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <CustomerLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </CustomerLoginContext.Provider>
  );
};

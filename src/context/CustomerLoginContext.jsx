import React, { createContext, useState, useEffect, useContext } from 'react';
import  { ContextCustomers } from '../context/CustomersContext'; 

// Tạo Context
export const CustomerLoginContext = createContext();

export const CustomerLoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const customers = useContext(ContextCustomers); 

  // Lấy trạng thái đăng nhập từ localStorage khi component lần đầu render
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('customerLogin');
    if (loggedInStatus) {
      setIsLoggedIn(JSON.parse(loggedInStatus));
    }
  }, []);

  // Lưu trạng thái vào localStorage mỗi khi isLoggedIn thay đổi
  useEffect(() => {
    localStorage.setItem('customerLogin', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // useEffect mới lắng nghe khi dữ liệu customers được load
  useEffect(() => {
    if (customers && customers.length > 0) {
      // Kiểm tra xem trạng thái đăng nhập hiện tại có khớp với một customer nào không
      const loggedInStatus = localStorage.getItem('customerLogin');
      if (loggedInStatus) {
        const parsedLogin = JSON.parse(loggedInStatus);
        const customer = customers.find(cust => cust.id === parsedLogin.id);
        console.log(customer);
        
        if (customer) {
          setIsLoggedIn(customer); // Cập nhật trạng thái đăng nhập
        } else {
          setIsLoggedIn(false); // Nếu không tìm thấy customer, coi như chưa đăng nhập
          localStorage.removeItem('customerLogin');
        }
      }
    }
  }, [customers]); // Lắng nghe sự thay đổi của customers
console.log(customers);

  return (
    <CustomerLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </CustomerLoginContext.Provider>
  );
};

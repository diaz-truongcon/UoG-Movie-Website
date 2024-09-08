import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments ,subscribeToCollection } from "../Service/FirebaseService";
export const ContextCustomers = createContext();


// Tạo Provider cho Categories
export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchDocuments('Customers');
      setCustomers(customersData);
    };
    fetchData();
    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Customers', (newCustomersData) => {
      setCustomers(newCustomersData);
    });

    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);

  return (
    <ContextCustomers.Provider value={customers}>
      {children}
    </ContextCustomers.Provider>
  );
};

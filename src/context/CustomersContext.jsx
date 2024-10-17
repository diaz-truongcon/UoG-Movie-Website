import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from "../Service/FirebaseService";
export const ContextCustomers = createContext();


// Tạo Provider cho Categories
export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Customers", (customersList) => {
      setCustomers(customersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCustomers.Provider value={customers}>
      {children}
    </ContextCustomers.Provider>
  );
};

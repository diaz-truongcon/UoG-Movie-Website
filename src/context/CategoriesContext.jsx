import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextCategories = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Categories", (categoriesList) => {
      setCategories(categoriesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCategories.Provider value={categories}>
      {children}
    </ContextCategories.Provider>
  );
};

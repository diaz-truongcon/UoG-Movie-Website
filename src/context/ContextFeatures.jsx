import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../Service/FirebaseService";

export const ContextFeatures = createContext();

// Tạo Provider cho Features
export const FeaturesProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const featuresData = await fetchDocuments('Features');
      setFeatures(featuresData);
    };
    fetchData();

    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Features', (newFeaturesData) => {
      setFeatures(newFeaturesData);
    });
    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);

  return (
    <ContextFeatures.Provider value={features}>
      {children}
    </ContextFeatures.Provider>
  );
};

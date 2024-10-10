import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../Service/FirebaseService";

export const ContextPlans = createContext();

// Tạo Provider cho Plans
export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plansData = await fetchDocuments('Plans');
      setPlans(plansData);
    };
    fetchData();

    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Plans', (newPlansData) => {
      setPlans(newPlansData);
    });
    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);

  return (
    <ContextPlans.Provider value={plans}>
      {children}
    </ContextPlans.Provider>
  );
};

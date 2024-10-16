import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextPlans = createContext();

// Tạo Provider cho Plans
export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Plans", (planList) => {
      setPlans(planList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPlans.Provider value={plans}>
      {children}
    </ContextPlans.Provider>
  );
};

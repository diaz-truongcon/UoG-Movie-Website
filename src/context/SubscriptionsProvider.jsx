import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextSubscriptions = createContext();

export const SubscriptionsProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // Using fetchDocumentsRealtime to listen for real-time updates
    const unsubscribe = fetchDocumentsRealtime("Subscriptions", (subscriptionsList) => {
      setSubscriptions(subscriptionsList);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <ContextSubscriptions.Provider value={subscriptions}>
      {children}
    </ContextSubscriptions.Provider>
  );
};

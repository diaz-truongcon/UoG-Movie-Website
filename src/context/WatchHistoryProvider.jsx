import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextWatchHistory = createContext();

export const WatchHistoryProvider = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Using fetchDocumentsRealtime to listen to real-time updates for WatchHistory
    const unsubscribe = fetchDocumentsRealtime("WatchHistory", (historyList) => {
      setWatchHistory(historyList);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextWatchHistory.Provider value={watchHistory}>
      {children}
    </ContextWatchHistory.Provider>
  );
};

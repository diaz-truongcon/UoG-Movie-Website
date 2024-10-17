import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

// Tạo Context cho Episodes
export const ContextEpisodes = createContext();

// Tạo Provider cho Episodes
export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Episodes", (episodesList) => {
      setEpisodes(episodesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextEpisodes.Provider value={episodes}>
      {children}
    </ContextEpisodes.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../Service/FirebaseService";

// Tạo Context cho Episodes
export const ContextEpisodes = createContext();

// Tạo Provider cho Episodes
export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const episodesData = await fetchDocuments('Episodes');
      setEpisodes(episodesData);
    };
    fetchData();
    
    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Episodes', (newEpisodesData) => {
      setEpisodes(newEpisodesData);
    });

    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);

  return (
    <ContextEpisodes.Provider value={episodes}>
      {children}
    </ContextEpisodes.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextFavorites = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu real-time từ collection "Favorites"
    const unsubscribe = fetchDocumentsRealtime("Favorites", (favoritesList) => {
      setFavorites(favoritesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextFavorites.Provider value={favorites}>
      {children}
    </ContextFavorites.Provider>
  );
};

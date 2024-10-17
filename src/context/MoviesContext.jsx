import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from '../Service/FirebaseService';

// Tạo Context
export const ContextMovies = createContext();

// Tạo Provider cho Movies
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Movies", (movieList) => {
      setMovies(movieList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextMovies.Provider value={movies}>
      {children}
    </ContextMovies.Provider>
  );
};
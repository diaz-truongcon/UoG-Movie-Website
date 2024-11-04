import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextRentMovies = createContext();

// Tạo Provider cho RentMovies
export const RentMoviesProvider = ({ children }) => {
  const [rentMovies, setRentMovies] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime từ RentMovies
    const unsubscribe = fetchDocumentsRealtime("RentMovies", (rentMoviesList) => {
      setRentMovies(rentMoviesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextRentMovies.Provider value={rentMovies}>
      {children}
    </ContextRentMovies.Provider>
  );
};

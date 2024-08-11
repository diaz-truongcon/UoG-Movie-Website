import React, { createContext, useState, useEffect } from 'react';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Tạo Context
export const ContextMovies = createContext();

// Tạo Provider cho Movies
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "Movies");

  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(moviesCollectionRef);
      const moviesData = [];
      querySnapshot.forEach((doc) => {
        moviesData.push({ id: doc.id, ...doc.data() });
      });
      setMovies(moviesData);
    };
    fetchMovies();
  }, []);

  return (
    <ContextMovies.Provider value={movies}>
      {children}
    </ContextMovies.Provider>
  );
};
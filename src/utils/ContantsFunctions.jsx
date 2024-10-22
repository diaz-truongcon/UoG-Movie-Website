import { useContext } from 'react';
import { ContextMovies } from '../context/MoviesContext';
import { checkVipEligibility } from '../Service/FirebaseService';

// Using `useContext` inside a function that can be reused
export const getTopLikedMovies = (count) => {
    const movies = useContext(ContextMovies);
    return [...movies]
        .sort((a, b) => b.likeCount - a.likeCount) // Sort by likeCount in descending order
        .slice(0, count) // Get the top 10 movies
        .map((movie, index) => ({
            ...movie, // Keep all movie data
            rank: index + 1 // Add a rank field starting from 1
        }));
};

// Function to get the top 10 movies based on views and add ranking
export const getTopViewedMovies = (count) => {
    const movies = useContext(ContextMovies);
    return [...movies]
        .sort((a, b) => b.views - a.views) // Sort by views in descending order
        .slice(0, count) // Get the top 10 movies
        .map((movie, index) => ({
            ...movie, // Keep all movie data
            rank: index + 1 // Add a rank field starting from 1
        }));
};

// Function to create a seed based on the current date (YYYYMMDD format)
const getSeedFromDate = () => {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(); // YYYYMMDD format
};

// Random function based on seed to shuffle movies list
const randomWithSeed = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Function to get 10 random movies each day based on seed
export const getRandomMovies = (count = 10) => {
    const movies = useContext(ContextMovies);
    const seed = getSeedFromDate();
    const randomMovies = [...movies];
    for (let i = randomMovies.length - 1; i > 0; i--) {
        const j = Math.floor(randomWithSeed(seed + i) * (i + 1));
        [randomMovies[i], randomMovies[j]] = [randomMovies[j], randomMovies[i]]; // Swap movies randomly
    }
    return randomMovies.slice(0, count);
};


export const handleClick = async (movie, isLoggedIn, plans, navigate) => {
    if (!isLoggedIn) {
        message.warning('Bạn cần đăng nhập để xem phim');
        return;
    }   
    const status = await checkVipEligibility(isLoggedIn.id, plans, movie);

    if (status) {
        navigate(`/moviedetail/${movie.id}`);
    } else {
        navigate(`/subscriptionplan`);
    }
};
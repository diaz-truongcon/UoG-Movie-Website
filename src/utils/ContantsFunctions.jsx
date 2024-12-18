import { useContext } from 'react';
import { ContextMovies } from '../context/MoviesContext';
import { checkIfMovieRented } from '../Service/PlanService';
import { checkVipEligibility } from "../Service/PlanService";
import { message } from 'antd';
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
        return;
     }
    const checkRentMovie = await checkIfMovieRented(isLoggedIn.id, movie.id);
    if (checkRentMovie) {
        navigate(`/moviedetail/${movie.id}`);
        return;
    }
    const plan = plans.find(p => p.id === movie.vip);
    if(plan.level > 2) {
        navigate(`/pay/${movie.id}`);
    } else {
        navigate(`/subscriptionplan`);
    }
};

export const formatCommentTime = (commentDate) => {
    const now = new Date();
    const createdAt = commentDate.toDate();
    // Tính toán chênh lệch thời gian
    const diffInMilliseconds = now - createdAt;

    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`; // Hiển thị số phút trước nếu dưới 1 giờ
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`; // Hiển thị số giờ trước nếu dưới 1 ngày
    } else if (diffInDays <= 10) {
        return `${diffInDays} days ago`; // Hiển thị số ngày trước nếu từ 1 đến 10 ngày
    } else {
        return formatFirebaseTimestamp(commentDate); // Hiển thị ngày bình luận nếu quá 10 ngày
    }
};
// Function to format Firebase timestamp and calculate expiry date
export const formatFirebaseTimestamp = (timestamp, additionalDays = 0) => {
    const date = new Date(timestamp.seconds * 1000);
    date.setDate(date.getDate() + additionalDays);
    return date.toLocaleDateString('vi-VN'); // Convert to Vietnamese date format
};

export const calculateRemainingDays = (expiryDate) => {
    // Split the expiryDate in DD/MM/YYYY format
    const [day, month, year] = expiryDate.split('/').map(Number);
    // Create a Date object in the format YYYY, MM (0-indexed), DD
    const expiry = new Date(year, month - 1, day);

    const today = new Date();

    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0; // Return 0 if the date is past
};
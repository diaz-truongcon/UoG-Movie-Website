// Main.jsx
import { useState, useContext } from 'react';
import Slideshow from '../Slideshow/Slideshow';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { ContextMovies } from '../../../context/MoviesContext';

function Main(props) {
    const movies = useContext(ContextMovies);
    // Lấy top 10 phim có likeCount nhiều nhất và thêm xếp hạng (rank)
    const topLikedMovies = [...movies]
        .sort((a, b) => b.likeCount - a.likeCount) // Sắp xếp theo likeCount giảm dần
        .slice(0, 10) // Lấy 10 phim đầu tiên
        .map((movie, index) => ({
            ...movie, // Giữ lại tất cả dữ liệu của phim
            rank: index + 1 // Thêm trường rank, bắt đầu từ 1
        }));
    // Lấy top 10 phim có likeCount nhiều nhất và thêm xếp hạng (rank)
    const topViewsMovies = [...movies]
        .sort((a, b) => b.views - a.views) // Sắp xếp theo likeCount giảm dần
        .slice(0, 10) // Lấy 10 phim đầu tiên
        .map((movie, index) => ({
            ...movie, // Giữ lại tất cả dữ liệu của phim
            rank: index + 1 // Thêm trường rank, bắt đầu từ 1
        }));
    return (
        < >
            <Slideshow></Slideshow>
            <ItemCarousel data={topLikedMovies} title="Top Phim Yêu Thích" />
            <ItemCarousel data={topViewsMovies} title="Top Phim Được Xem Nhiều Nhất" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
            <ItemCarousel data={movies} title="Danh Sách Phim" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
        </>
    );
}

export default Main;

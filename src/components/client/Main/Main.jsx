// Main.jsx
import { useState, useContext } from 'react';
import Slideshow from '../Slideshow/Slideshow';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { ContextMovies } from '../../../context/MoviesContext';


function Main(props) {
    const movies = useContext(ContextMovies);
    return (
        < >
            <Slideshow></Slideshow>
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
            <ItemCarousel data={movies} title="Danh Sách Phim" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
            <ItemCarousel data={movies} title="Danh Sách Phim" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
            <ItemCarousel data={movies} title="Danh Sách Phim" />
        </>
    );
}

export default Main;

import React, { useContext } from 'react';
import SlideRent from '../Slideshow/SlideRent';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { ContextMovies } from '../../../context/MoviesContext';

function RentMovies(props) {
    const movies = useContext(ContextMovies);
    return (
        <>
            <SlideRent />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
        </>
    );
}

export default RentMovies;
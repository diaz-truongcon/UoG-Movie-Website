import React, { useContext } from 'react';
import SlideRent from '../Slideshow/SlideRent';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { ContextMovies } from '../../../context/MoviesContext';

function RentMovies(props) {
    const movies = useContext(ContextMovies);
    return (
        <>
            <SlideRent />
            <ItemCarousel data={movies} title="New Trending Movies On Beta Movie" />
            <ItemCarousel data={movies} title="New Trending Movies On Beta Movie" />
        </>
    );
}

export default RentMovies;
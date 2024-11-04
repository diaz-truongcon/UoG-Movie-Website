import { useContext } from 'react';
import Slideshow from '../Slideshow/Slideshow';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { ContextMovies } from '../../../context/MoviesContext';
import { getTopViewedMovies, getTopLikedMovies, getRandomMovies } from '../../../utils/ContantsFunctions';

function Main(props) {
    const movies = useContext(ContextMovies); // Get the movies from context

    // Call the functions to get the data
    const topLikedMovies = getTopLikedMovies(10);
    const topViewedMovies = getTopViewedMovies(10);
    const randomMovies = getRandomMovies(10); // Get 10 random movies

    return (
        <>
            <Slideshow />
            <ItemCarousel data={topLikedMovies} title="Top Favorite Movies" />
            <ItemCarousel data={topViewedMovies} title="Top Most Viewed Movies" />
            <ItemCarousel data={randomMovies} title="What to Watch Today" />
            <ItemCarousel data={movies} title="Movie List From Beta Movie" />
            <ItemCarousel data={movies} title="New Trending Movies On Beta Movie" />
        </>
    );
}

export default Main;

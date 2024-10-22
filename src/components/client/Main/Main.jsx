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
            <ItemCarousel data={topLikedMovies} title="Top Phim Yêu Thích" />
            <ItemCarousel data={topViewedMovies} title="Top Phim Được Xem Nhiều Nhất" />
            <ItemCarousel data={randomMovies} title="Xem Gì Hôm Nay" />
            <ItemCarousel data={movies} title="Danh Sách Phim" />
            <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
        </>
    );
}

export default Main;

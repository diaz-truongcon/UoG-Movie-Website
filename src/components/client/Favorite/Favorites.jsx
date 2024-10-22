import React, { useEffect, useState, useContext } from 'react';
import { Row, Empty } from 'antd';
import { CustomerLoginContext } from "../../../context/CustomerLoginContext";
import { ContextMovies } from '../../../context/MoviesContext';
import CardItem from "../ItemCarousel/CardItem";
import { ContextFavorites } from '../../../context/FavoritesProvider';
function Favorites() {
    const [favoritesMovies, setFavoritesMovies] = useState([]);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const movies = useContext(ContextMovies);
    const favorites = useContext(ContextFavorites);
    // Fetching favorite movies and likes
    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn && movies.length > 0) {
                const favoritesData = favorites.filter(fa => fa.userId === isLoggedIn.id);
                const filteredMovies = movies.filter(movie =>
                    favoritesData.some(favorite => favorite.movieId === movie.id)
                );
                setFavoritesMovies(filteredMovies);
            }
        };
        fetchData();
    }, [isLoggedIn, favorites]); // Track 'movies' and 'update'

    return (
        <div style={{ padding: '35px' }}>
            <h1 style={{ margin: "20px", color: "white", textAlign: "center" }}>Danh sách yêu thích của bạn</h1>
            {favoritesMovies.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {favoritesMovies.map((movie, index) => (
                        <CardItem element={movie} index={index} />
                    ))}
                </Row>
            ) : (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Empty
                        description={<span style={{ color: 'white' }}>Bạn chưa có phim yêu thích nào.</span>}
                    />
                </div>
            )}
        </div>
    );
}

export default Favorites;

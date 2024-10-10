import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Tooltip, message } from 'antd';
import { PlayCircleOutlined, HeartOutlined, MinusOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getFavorites, deleteDocument, fetchDocuments, addDocument, updateDocument } from '../../../Service/FirebaseService'; // Firebase service functions
import { CustomerLoginContext } from "../../../context/CustomerLoginContext";
import { ContextMovies } from '../../../context/MoviesContext';
import { Link } from 'react-router-dom';

function Favorites() {
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const movies = useContext(ContextMovies); // All movies
    const [likes, setLikes] = useState([]);
    const [update, setUpdate] = useState(false);
    const [favoritesByUser, setFavoritesByUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Fetching favorite movies and likes
    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn && movies.length > 0) {
                const favoritesData = await getFavorites(isLoggedIn.id);
                setFavoritesByUser(favoritesData);
                
                // Fetch likes
                const likesData = await fetchDocuments('Likes');
                setLikes(likesData.filter(like => like.userId === isLoggedIn.id));

                // Show all movies initially
                setFilteredMovies(movies); 
            }
        };
        fetchData();
    }, [isLoggedIn, movies, update]); // Track 'movies' and 'update'

    const checkFavoritesMovies = (id) => {
        return favoritesByUser.find(a => a.movieId === id);
    };

    const checkLikes = (id) => {
        return likes.find(a => a.movieId === id);
    };

    const handleLikeClick = async (movie) => {
        if (!isLoggedIn) {
            message.warning('Bạn cần đăng nhập để yêu thích');
            return;
        }

        const likedMovie = checkLikes(movie.id);
        if (likedMovie) {
            // Decrease like count and remove from Likes collection
            await updateDocument('Movies', movie.id, { likeCount: movie.likeCount - 1 });
            await deleteDocument('Likes', likedMovie.id);
            message.success('Đã xóa yêu thích của phim');
        } else {
            // Increase like count and add to Likes collection
            const newLike = { userId: isLoggedIn.id, movieId: movie.id };
            await updateDocument('Movies', movie.id, { likeCount: movie.likeCount + 1 });
            await addDocument('Likes', newLike);
            message.success('Đã thêm yêu thích cho phim');
        }
        setUpdate(!update); // Trigger re-fetch
    };

    const handleFavoriteClick = async (movie) => {
        const favorite = { userId: isLoggedIn.id, movieId: movie.id, createdAt: new Date().toISOString() };
        const favoritesMovies = checkFavoritesMovies(movie.id);

        if (favoritesMovies) {
            // Remove from Favorites
            await deleteDocument("Favorites", favoritesMovies.id);
            message.error('Đã xóa khỏi danh sách yêu thích');
        } else {
            // Add to Favorites
            await addDocument("Favorites", favorite);
            message.success('Đã thêm vào danh sách yêu thích');
        }
        setUpdate(!update);
    };

    // Search functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term) {
            const filtered = movies.filter(movie =>
                movie.nameMovie.toLowerCase().includes(term)
            );
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies);
        }
    };

    return (
        <div style={{ padding:"35px",color:"white",textAlign:"center",marginBottom:"20px" }}>
            <h1 style={{ margin:"20px"}}>Danh sách phim</h1>
            {/* Search Input */}
            <Input
                placeholder="Nhập tên phim để tìm kiếm"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px', width: '300px' }}
            />

            {filteredMovies.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {filteredMovies.map((movie) => (
                        <Col className='item-movies' key={movie.id} xs={12} sm={8} lg={4} style={{ position: "relative", overflow: "hidden" }}>
                            <img alt={movie.title} src={movie.imgUrl} style={{ width: "100%" }} />
                            <div className='item' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Tooltip title="Like">
                                    <Button
                                        type="link"
                                        onClick={() => handleLikeClick(movie)}
                                        icon={checkLikes(movie.id) ? <CheckCircleOutlined /> : <HeartOutlined />}
                                        style={{ color: checkLikes(movie.id) ? 'green' : 'white' }}
                                    />
                                </Tooltip>
                                <Link to={`/moviedetail/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Tooltip title="Watch Movie">
                                        <Button type="link" icon={<PlayCircleOutlined />} style={{ color: 'white' }} />
                                    </Tooltip>
                                </Link>
                                <Tooltip title={checkFavoritesMovies(movie.id) ? "Remove from Favorites" : "Add to Favorites"}>
                                    <Button
                                        type="link"
                                        onClick={() => handleFavoriteClick(movie)}
                                        icon={checkFavoritesMovies(movie.id) ? <MinusOutlined /> : <PlusOutlined />}
                                        style={{ color: checkFavoritesMovies(movie.id) ? 'red' : 'white' }}
                                    />
                                </Tooltip>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Không tìm thấy phim nào.</p>
            )}
        </div>
    );
}

export default Favorites;

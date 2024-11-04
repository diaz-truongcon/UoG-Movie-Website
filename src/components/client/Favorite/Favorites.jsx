import React, { useEffect, useState, useContext } from 'react';
import { Row, Empty, Col, List, Typography, Avatar, Badge } from 'antd';
import { CustomerLoginContext } from "../../../context/CustomerLoginContext";
import { ContextMovies } from '../../../context/MoviesContext';
import CardItem from "../ItemCarousel/CardItem";
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { ContextWatchHistory } from '../../../context/WatchHistoryProvider';
import { HistoryOutlined, PicRightOutlined } from '@ant-design/icons';
import { formatCommentTime } from "../../../utils/ContantsFunctions";
const { Title } = Typography;
function Favorites() {
    const [favoritesMovies, setFavoritesMovies] = useState([]);
    const [historyMovies, setHistoryMovies] = useState([]);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const movies = useContext(ContextMovies);
    const favorites = useContext(ContextFavorites);
    const watchHistories = useContext(ContextWatchHistory);
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
    useEffect(() => {
        const history = watchHistories.filter(history => history.idCustomer === isLoggedIn.id).sort((a, b) => b.watchedAt.toDate() - a.watchedAt.toDate());
        setHistoryMovies(history);
    }, [watchHistories]);
    const getMovieDetails = (id) => {
        const movie = movies.find(m => m.id === id);
        return movie ? movie : { imgUrl: "", nameMovie: "" };
    };
    return (
        <div style={{ padding: '35px' }}>
            <Row gutter={[32, 16]}>
                <Col
                    sm={24}
                    md={24}
                    lg={16}>
                    <Title level={3} style={{ color: "white", marginTop: "50px", marginBottom: "20px" }}><PicRightOutlined /> Danh sách yêu thích của bạn</Title>
                    {favoritesMovies.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {favoritesMovies.map((movie, index) => (
                                <CardItem element={movie} index={index} />
                            ))}
                        </Row>
                    ) : (
                        <div>
                            <Empty
                                style={{ textAlign: 'start' }}
                                description={<span style={{ color: 'white' }}>Bạn chưa có phim yêu thích nào.</span>}
                            />
                        </div>
                    )}
                </Col>
                <Col
                    sm={24}
                    md={24}
                    lg={8}
                >
                    <Title level={3} style={{ color: "white", marginTop: "50px" }}><HistoryOutlined /> Lịch sử xem phim của bạn</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={historyMovies}
                        renderItem={item => (
                            <List.Item style={{ borderBottom: "1px solid white" }}>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size={64} src={getMovieDetails(item.idMovie).imgUrl} />}
                                    title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
                                                {getMovieDetails(item.idMovie).nameMovie}
                                            </Typography.Title>
                                            <Typography.Text style={{ margin: 0, color: 'white' }}>Tập {item.episodeNumber}</Typography.Text>
                                        </div>
                                    }
                                    description={
                                        <>
                                        <Typography.Text style={{ margin: 0, color: 'white' }}>{getMovieDetails(item.idMovie).describe.length > 40 ? `${getMovieDetails(item.idMovie).describe.substring(0, 40)}...` : getMovieDetails(item.idMovie).describe}</Typography.Text> <br/>
                                         <Typography.Text style={{ margin: 0, color: 'white' }}>{formatCommentTime(item.watchedAt)}</Typography.Text>
                                        </>
                                }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default Favorites;

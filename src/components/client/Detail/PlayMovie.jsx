import React, { useEffect, useState, useContext } from 'react';
import { Input, Button, Image, Typography, List, Avatar, Badge, Row, Col, message } from 'antd';
import { FireOutlined, StarOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ContextEpisodes } from "../../../context/ContextEpisodes";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { fetchDocuments, addDocument, updateDocument } from "../../../Service/FirebaseService";
import { ContextCustomers } from "../../../context/CustomersContext";
import { ContextWatchHistory } from "../../../context/WatchHistoryProvider";
import { getTopViewedMovies } from '../../../utils/ContantsFunctions';
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

function PlayMovie(props) {
    const [episodesByMovie, setEpisodesByMovie] = useState([]);
    const [comments, setComments] = useState([]);
    const [update, setUpdate] = useState(false);
    const [movie, setMovie] = useState(null);
    const [commentText, setCommentText] = useState('');
    const { id } = useParams();
    const episodes = useContext(ContextEpisodes);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const customers = useContext(ContextCustomers);
    const watchHistories = useContext(ContextWatchHistory);
    const topViewedMovies = getTopViewedMovies(5);

    useEffect(() => {
        const listEpisode = episodes
            .filter((element) => element.movieId === id)
            .sort((a, b) => Number(a.episodeNumber.replace(/\D/g, '')) - Number(b.episodeNumber.replace(/\D/g, '')));
        setEpisodesByMovie(listEpisode);
        setMovie(listEpisode[0]);
        handleWatchHistory(listEpisode[0]);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const commentsData = await fetchDocuments('Comments');
            const commentsByMovie = commentsData.filter((comment) => comment.idMovie == id);
            setComments(commentsByMovie);
        };
        fetchData();
    }, [update,id]);

    const handleAddComment = async () => {
        if (!isLoggedIn) {
            message.error('Bạn phải đăng nhập để bình luận');
            return;
        }
        if (commentText) {
            const newComment = {
                idMovie: id,
                content: commentText,
                idCustomer: isLoggedIn.id,
                createdAt: new Date()
            };
            console.log(newComment);

            await addDocument('Comments', newComment);
            setCommentText('');
            setUpdate(!update);
        } else {
            message.error('Bạn phải nhập nội dung bình luận');
        }
    };
    function getCustomerName(id) {
        const customer = customers.find((item) => item.id === id);
        return customer ? customer.name : "";
    }
    function getCustomerImg(id) {
        const customer = customers.find((item) => item.id === id);
        return customer ? customer.imgUrl : "";
    }
    const formatCommentTime = (commentDate) => {
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
            return new Date(commentDate).toLocaleDateString(); // Hiển thị ngày bình luận nếu quá 10 ngày
        }
    };
    
    const handleWatchHistory = async (episode) => {
        if (isLoggedIn) {
            const watchHistory = {
                idMovie: id,
                idCustomer: isLoggedIn.id,
                episodeNumber: episode.episodeNumber,
                watchedAt: new Date()
            };
            const history = watchHistories?.find(
                (history) => history.idMovie === id && history.idCustomer === isLoggedIn.id
            );
            if (history) {
                await updateDocument('WatchHistory', history.id, watchHistory);
            } else {
                await addDocument('WatchHistory', watchHistory);
            }
        }
    };
const  getEpisode = (episode) => {
    setMovie(episode);
    handleWatchHistory(episode);
}
    return (
        <div style={{ marginTop: "70px"}}>
            {/* Movie player */}
            <iframe
                width="100%"
                src={movie && movie.URLmovie}
                title="Movie Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
                className="playmovie"
            ></iframe>
            <div style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                    {episodesByMovie.map((episode, index) => (
                        <Col key={index} onClick={() => getEpisode(episode)}>
                            <Button type="primary" style={{
                                background: movie === episode
                                    ? "linear-gradient(#ff0844 , #ffb199)" // Màu đỏ khi bấm vào tập
                                    : "linear-gradient(135deg, #6253e1, #04befe)", // Màu gradient cho các tập khác
                            }}>
                                {episode.episodeNumber}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{ padding: '20px' }}>
                <Row gutter={[32, 16]} >
                    <Col xs={24} lg={12}>
                        <div style={{ marginTop: '10px' }}>
                            <TextArea
                                rows={4}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <Button
                                type="primary"
                                onClick={handleAddComment}
                                style={{ marginTop: '10px' }}
                            >
                                Add Comment
                            </Button>
                        </div>
                        {comments
                            .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()) // Sắp xếp theo thời gian mới nhất
                            .map((comment, index) => (
                                <Row gutter={[16, 16]} style={{ marginTop: '20px' }} key={index}>
                                    <Col xs={4} lg={4} style={{ display: 'flex',flexDirection:"column", gap:"5px" }}>
                                        <Image
                                            src={getCustomerImg(comment.idCustomer)}
                                            preview={false}
                                            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                        />
                                        <Title style={{ color: "white", fontSize:"0.6rem"}}>
                                               Xuân Trường
                                            </Title>
                                    </Col>
                                    <Col xs={20} lg={20} style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
                                            <Title level={4} style={{  }}>
                                                {getCustomerName(comment.idCustomer)}
                                            </Title>
                                            <Text type="secondary" style={{ marginLeft: '10px' }}>
                                                {formatCommentTime(comment.createdAt)} {/* Hiển thị thời gian */}
                                            </Text>
                                        </div>
                                        <Paragraph>
                                            {comment.content}
                                        </Paragraph>
                                    </Col>
                                </Row>
                            ))
                        }

                    </Col>
                    <Col xs={24} lg={12} >
                        <Title level={4} style={{ margin: 0, color: "yellow" }}><StarOutlined /> TOP BẢNG XẾP HẠNG</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={topViewedMovies}
                            renderItem={item => (
                                <List.Item style={{ borderBottom: "1px solid white" }}>
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" size={64} src={item.imgUrl} />}
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
                                                    {item.nameMovie}
                                                </Typography.Title>
                                                <Badge
                                                    count={item.duration}
                                                    style={{
                                                        backgroundColor: '#d4380d',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </div>
                                        }
                                        description={
                                            <>
                                                <Typography.Text style={{ margin: 0, color: 'white' }}>{item.describe.length > 60 ? `${item.describe.substring(0, 60)}...` : item.describe}</Typography.Text>
                                                <div>
                                                    <Typography.Text type="secondary" style={{ margin: 0, color: 'white' }}>
                                                        <FireOutlined /> {item.views} Lượt xem
                                                    </Typography.Text>
                                                </div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PlayMovie;

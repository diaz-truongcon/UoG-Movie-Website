import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Image, Button, Tooltip, message } from 'antd';
import { RightOutlined, LeftOutlined, PlayCircleOutlined, HeartOutlined, PlusOutlined, MinusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link , useNavigate} from 'react-router-dom';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocument, deleteDocument, fetchDocuments, updateDocument, checkVipEligibility } from '../../../Service/FirebaseService'; // Giả sử bạn có service xử lý yêu thích

function ItemCarousel({ data, title }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isPaused, setIsPaused] = useState(false);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const [favorites, setFavorites] = useState([]); // Lưu trạng thái yêu thích của từng phim
    const [likes,setLikes] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    // Xử lý thay đổi kích thước cửa sổ
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getNumOfDisplayedItems = () => {
        if (windowWidth < 740) {
            return 2;
        } else if (windowWidth > 740 && windowWidth < 1024) {
            return 4;
        } else {
            return 6;
        }
    };

    // Xử lý cập nhật dữ liệu hiển thị
    useEffect(() => {
        if (data.length !== 0) {
            const numOfDisplayedItems = getNumOfDisplayedItems();
            const startIndex = currentIndex;
            const endIndex = (startIndex + numOfDisplayedItems) % data.length;
            const newDisplayedData = [];
            for (let i = startIndex; i !== endIndex; i = (i + 1) % data.length) {
                newDisplayedData.push(data[i]);
            }
            setDisplayedData(newDisplayedData);
        }
    }, [currentIndex, data]);

    // Xử lý tự động chuyển carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [data.length, isPaused]);

    // Xử lý hover vào từng phim
    const handleColHover = (index) => {
        setHoveredIndex(index);
        setIsPaused(true);
    };

    const handleColLeave = () => {
        setHoveredIndex(null);
        setIsPaused(false);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
        setIsPaused(true);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        setIsPaused(true);
    };

    // Xử lý thêm/bỏ yêu thích
    const handleFavoriteClick = async (movie) => {
        if (!isLoggedIn) {
            message.warning('Bạn cần đăng nhập để thêm vào danh sách yêu thích');
            return;
        }
        const favorite = {
            userId: isLoggedIn.id,
            movieId: movie.id,
            createdAt: new Date().toISOString(),
        };
        if (checkFavorites(movie.id)) {
            await deleteDocument("Favorites", checkFavorites(movie.id).id ); // Truyền `movieId` và `userId` để xóa
            message.error('Đã xóa khỏi danh sách yêu thích');
        } else {
            await addDocument("Favorites", favorite); // Thêm vào danh sách yêu thích
            message.success('Đã thêm vào danh sách yêu thích');
        }
        setUpdate(!update); // Cập nhật lại trạng thái yêu thích
    };

    // Xử lý like
    const handleLikeClick = async (movie) => {
        if (!isLoggedIn) {
            message.warning('Bạn cần đăng nhập để yêu thích');
            return;
        }
        
        // Kiểm tra xem phim đã được like hay chưa
        const likedMovie = checkLikes(movie.id);
        if (likedMovie) {
            // Nếu đã like, giảm số lượng like và xóa khỏi bảng Likes
            await updateDocument('Movies', movie.id, { likeCount: movie.likeCount - 1 }); // Giảm lượt like của phim
            await deleteDocument('Likes', likedMovie.id); // Xóa khỏi bảng Likes
            message.success('Đã xóa yêu thích của phim');
        } else {
            // Nếu chưa được like, tăng số lượng like và thêm mới
            const newLike = {
                userId: isLoggedIn.id,
                movieId: movie.id,
            };
            await updateDocument('Movies', movie.id, { likeCount: movie.likeCount + 1 }); // Tăng lượt like của phim
            await addDocument('Likes', newLike); // Thêm vào bảng Likes
            message.success('Đã thêm yêu thích cho phim');
        }
        setUpdate(!update); // Cập nhật lại trạng thái like
    };

    // Kiểm tra trạng thái yêu thích ban đầu
    useEffect(() => {
        const fetchData = async () => {
            const favoritesData = await fetchDocuments('Favorites');
            setFavorites(favoritesData.filter(a => a.userId == isLoggedIn.id));
        };
        fetchData();
    }, [isLoggedIn,update]);

    const checkFavorites = (id) => {
        const check = favorites.find(a => a.movieId == id);
        return check ? check : "";
    }
   // Kiểm tra trạng thái like ban đầu
    useEffect(() => {
        const fetchData = async () => {
            const likesData = await fetchDocuments('Likes');
            setLikes(likesData.filter(a => a.userId == isLoggedIn.id));
        };
        fetchData();
    }, [isLoggedIn, update]);

    const checkLikes = (id) => {
        return likes.find(a => a.movieId === id);
    };

    const handleClick = (id) => {
        if (!isLoggedIn) {
            // Hiển thị thông báo cảnh báo nếu chưa đăng nhập
            message.warning('Bạn cần đăng nhập để xem phim');
        } 
        // else {
        //     navigate(`/moviedetail/${id}`);
        // }
        console.log(checkVipEligibility(isLoggedIn.id,id));    
    };
    
    return (
        <>
            <div style={{ position: 'relative', overflowX: 'hidden', overflowY: 'hidden' }}>
                <h1 style={{ color: 'white', margin: '10px', fontSize: '1.5em' }}>{title}</h1>
                <Row gutter={[16, 16]} style={{ margin: '0', position: 'relative' }}>
                    {displayedData.map((element, index) => (
                        <Col
                            className='movie'
                            key={index}
                            xs={12}
                            md={6}
                            lg={4}
                            onMouseEnter={() => handleColHover(index)}
                            onMouseLeave={handleColLeave}
                            style={{ position: 'relative' }}
                        >
                            <Image src={element.imgUrl} alt="" preview={false} />
                            {hoveredIndex === index && (
                                <div className='button-movie' style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                    height: "100%",                                
                                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                                }}>
                                     <Tooltip title="Like">
                                     <Button
                                        type="link"
                                        onClick={() => handleLikeClick(element)}
                                        icon={checkLikes(element.id) ? <CheckCircleOutlined />:<HeartOutlined />}
                                        style={{ color: 'white' }}
                                      
                                    />
                                     </Tooltip>                                                   
                                        <Tooltip title="Watch Movie">
                                            <Button
                                                type="link"
                                                icon={<PlayCircleOutlined />}
                                                style={{ color: 'white' }} 
                                                onClick={() => handleClick(element.id)}                                     
                                            />
                                        </Tooltip>
                                    <Tooltip title={checkFavorites(element.id) ? "Remove from List" : "Add To List"}>
                                        <Button
                                            type="link"
                                            icon={checkFavorites(element.id) ? <MinusOutlined /> : <PlusOutlined />}
                                            onClick={() => handleFavoriteClick(element)}
                                            style={{ color: 'white' }}
                                        />
                                    </Tooltip>
                                </div>
                            )}
                        </Col>
                    ))}
                </Row>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={handlePrevClick}
                    style={{ position: 'absolute', top: '60%', left: 0, transform: 'translateY(-50%)', background: "rgba(20, 20, 20, 0.5)", zIndex: "2" }}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={handleNextClick}
                    style={{ position: 'absolute', top: '60%', right: 0, transform: 'translateY(-50%)', background: "rgba(20, 20, 20, 0.5)", zIndex: "2" }}
                />
            </div>
        </>
    );
}

export default ItemCarousel;

import React, { useState, useEffect, useContext } from 'react';
import { Button, Tooltip, message } from 'antd';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocument, deleteDocument, fetchDocuments, updateDocument } from '../../../Service/FirebaseService';
import { HeartOutlined, CheckCircleOutlined } from '@ant-design/icons';
function IconLikes({element}) {
    const [likes, setLikes] = useState([]);
    const [update, setUpdate] = useState(false);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    // Kiểm tra trạng thái like ban đầu
    useEffect(() => {
        const fetchData = async () => {
            const likesData = await fetchDocuments('Likes');
            setLikes(likesData.filter(a => a.userId == isLoggedIn.id));
        };
        fetchData();
    }, [isLoggedIn, update]);
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
    const checkLikes = (id) => {
        return likes.find(a => a.movieId === id);
    };
    return (
        <Tooltip title="Like">
            <Button
                type="link"
                className='animate__animated animate__bounce'
                onClick={() => handleLikeClick(element)}
                icon={checkLikes(element?.id) ? <CheckCircleOutlined /> : <HeartOutlined />}
                style={{ color: 'white' }}
            />
        </Tooltip>
    );
}

export default IconLikes;
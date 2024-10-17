import React, { useState, useEffect, useContext } from 'react';
import { Button, Tooltip, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { addDocument, deleteDocument, fetchDocuments } from '../../../Service/FirebaseService';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
function IconFavorites({ element }) {
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const [favorites, setFavorites] = useState([]);
    const [update, setUpdate] = useState(false);
    // Kiểm tra trạng thái yêu thích ban đầu
    useEffect(() => {
        const fetchData = async () => {
            const favoritesData = await fetchDocuments('Favorites');
            setFavorites(favoritesData.filter(a => a.userId == isLoggedIn.id));
        };
        fetchData();
    }, [isLoggedIn, update]);
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
            await deleteDocument("Favorites", checkFavorites(movie.id).id); // Truyền `movieId` và `userId` để xóa
            message.error('Đã xóa khỏi danh sách yêu thích');
        } else {
            await addDocument("Favorites", favorite); // Thêm vào danh sách yêu thích
            message.success('Đã thêm vào danh sách yêu thích');
        }
        setUpdate(!update); // Cập nhật lại trạng thái yêu thích
    };

    const checkFavorites = (id) => {
        const check = favorites.find(a => a.movieId == id);
        return check ? check : "";
    }
    return (
        <Tooltip title={checkFavorites(element?.id) ? "Remove from List" : "Add To List"}>
            <Button
                className='animate__animated animate__rotateIn'
                type="link"
                icon={checkFavorites(element?.id) ? <MinusOutlined /> : <PlusOutlined />}
                onClick={() => handleFavoriteClick(element)}
                style={{ color: 'white' }}
            >
                {/* {checkFavorites(element?.id) ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"} */}
            </Button>
        </Tooltip>

    );
}

export default IconFavorites;
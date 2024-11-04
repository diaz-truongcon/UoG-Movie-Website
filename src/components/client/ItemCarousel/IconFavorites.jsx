import React, { useContext, useEffect, useState } from 'react';
import { Button, Tooltip, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { addDocument, deleteDocument } from '../../../Service/FirebaseService';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { ContextFavorites } from '../../../context/FavoritesProvider';
function IconFavorites({ element }) {
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const favorites = useContext(ContextFavorites);
    const [favoritesUser, setFavoritesUser] = useState([]);
    useEffect(() => {
        const favoritesByUser = favorites.filter(e => e.userId === isLoggedIn.id);
        setFavoritesUser(favoritesByUser);
    }, [favorites, isLoggedIn]);
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
    };

    const checkFavorites = (id) => {
        const check = favoritesUser.find(a => a.movieId == id);
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
            </Button>
        </Tooltip>

    );
}

export default IconFavorites;
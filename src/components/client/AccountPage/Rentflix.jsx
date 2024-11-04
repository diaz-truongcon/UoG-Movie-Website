import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Tag, Space, Image } from 'antd';
import { useAccount } from '../../../context/AccountProvider';
import { ContextRentMovies } from "../../../context/RentMoviesProvider";
import { getObjectById } from '../../../Service/FirebaseService';
import { formatFirebaseTimestamp, calculateRemainingDays } from "../../../utils/ContantsFunctions";
function Rentflix() {
    const { isLoggedIn } = useAccount();
    const listRentMovies = useContext(ContextRentMovies);
    const [rentUsers, setRentUsers] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const updatedListRent = await Promise.all(
                listRentMovies
                    .filter(movie => movie.isUser === isLoggedIn.id)
                    .map(async (movie) => {
                        try {
                            const movieData = await getObjectById("Movies", movie.movieId);
                            return {
                                key: movie.movieId,
                                title: movieData ? movieData.nameMovie : "Unknown Title", // Dynamically fetched movie title
                                rentedDate: formatFirebaseTimestamp(movie.startDate),
                                expiryDate: formatFirebaseTimestamp(movie.expiryDate),
                                status: 'Đang thuê',
                                imageUrl: movieData?.imgUrl || "https://via.placeholder.com/150", // Fallback if no image is found
                            };
                        } catch (error) {
                            console.error(`Error fetching movie data for ID ${movie.movieId}:`, error);                    
                        }
                    })
            );
    
            setRentUsers(updatedListRent);
        };
    
        fetchMovies();
    }, [isLoggedIn, listRentMovies]);


    
    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => (
                <Image width={50} src={imageUrl} alt="Movie Thumbnail" />
            ),
        },
        {
            title: 'Tên phim',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ngày thuê',
            dataIndex: 'rentedDate',
            key: 'rentedDate',
        },
        {
            title: 'Số ngày còn lại',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (expiryDate) => (
                <Tag color="orange">{calculateRemainingDays(expiryDate)} ngày</Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Đang thuê' ? 'blue' : 'green'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">Xem chi tiết</Button>
                    {record.status === 'Đang thuê' && (
                        <Button type="danger">Trả phim</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', flex: "1" }}>
            <h1 style={{ textAlign: "center", padding: '20px' }}>Kho phim đã thuê</h1>
            <Table columns={columns} dataSource={rentUsers} />
        </div>
    );
}

export default Rentflix;

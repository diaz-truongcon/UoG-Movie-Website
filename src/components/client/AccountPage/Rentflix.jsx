import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Tag, Space, Image } from 'antd';
import { useAccount } from '../../../context/AccountProvider';
import { ContextRentMovies } from "../../../context/RentMoviesProvider";
import { getObjectById } from '../../../Service/PlanService';
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
                                status: 'Rented',
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
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => (
                <Image width={50} src={imageUrl} alt="Movie Thumbnail" />
            ),
        },
        {
            title: 'Movie Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Rented Date',
            dataIndex: 'rentedDate',
            key: 'rentedDate',
        },
        {
            title: 'Days Remaining',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (expiryDate) => (
                <Tag color="orange">{calculateRemainingDays(expiryDate)} days</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Rented' ? 'blue' : 'green'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">View Details</Button>
                    {record.status === 'Rented' && (
                        <Button type="danger">Return Movie</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', flex: "1" }}>
            <h1 style={{ textAlign: "center", padding: '20px' }}>Rented Movies</h1>
            <Table columns={columns} dataSource={rentUsers} />
        </div>
    );
}

export default Rentflix;

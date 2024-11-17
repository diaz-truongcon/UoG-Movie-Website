import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, Tag } from "antd";
import { getMoviesById } from "../../../Service/MoviesService";
import { ContextPlans } from '../../../context/PlansContext';
import { ContextMovies } from '../../../context/MoviesContext';
const { Title, Text } = Typography;

const Pay = () => {
    const navigate = useNavigate();
    const plans = useContext(ContextPlans);
    const [plansRent, setPlansRent] = useState([]);
    const movies = useContext(ContextMovies);
    const { id } = useParams();
    const [choose, setChoose] = useState(""); // Store selected choice (movie or specific plan ID)

    useEffect(() => {
        // Fetch movie details by ID and update the movie state
        const fetchMovie = async () => {
            const movieDetails = await getMoviesById(id, movies);
            const plan = plans.find(p => p.id === movieDetails?.vip);
            if (plan) {
                const filteredPlans = plans.filter((p) => p.level >= plan.level);
                setPlansRent(filteredPlans);
            }
        };
        fetchMovie();
    }, [id, plans, movies]);

    const handleProceed = () => {
        if (choose === "movie") {
            navigate(`/rentmovie/${id}`);
        } else if (choose) {
            navigate(`/paymentpage/${choose}`);
        }
    };

    return (
        <div style={{ backgroundColor: '#f2f2f2', paddingTop: "50px" }}>
            <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    Phương thức thanh toán
                </Title>
                <Divider />
                <Text strong style={{ display: "block", textAlign: "center", fontSize: "16px", color: "#1890ff" }}>
                    Bạn đang chọn thuê
                </Text>
                <Card
                    bordered
                    style={{
                        margin: "20px 0",
                        cursor: "pointer",
                        borderColor: choose === "movie" ? "#1890ff" : "#f0f0f0" // Blue border if selected
                    }}
                    onClick={() => setChoose("movie")} // Set choice to movie
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text strong style={{ fontSize: "16px" }}>{getMoviesById(id, movies)?.nameMovie}</Text>
                        <Text style={{ fontSize: "18px", color: "#000", fontWeight: "bold" }}>
                            {(parseInt(getMoviesById(id, movies)?.rentalPrice) || 0).toLocaleString('vi-VN')}đ
                        </Text>
                    </div>
                </Card>

                <Divider>
                    <Text strong style={{ fontSize: "14px", color: "#1890ff" }}>Tiết kiệm hơn với Combo</Text>
                </Divider>
                {plansRent.map(p => (
                    <Card
                        key={p.id}
                        style={{
                            marginBottom: "20px",
                            cursor: "pointer",
                            borderColor: choose === p.id ? "#1890ff" : "#f0f0f0" // Blue border only if selected plan
                        }}
                        bodyStyle={{ padding: "20px" }}
                        bordered
                        extra={<Tag color="blue">Lựa chọn tốt nhất</Tag>}
                        onClick={() => setChoose(p.id)} // Set choice to specific plan ID
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Title level={4}>{p.title}</Title>
                            <Text strong style={{ fontSize: "18px" }}>{parseInt(p.pricePerMonth).toLocaleString('vi-VN')}đ</Text>
                        </div>
                        <ul>
                            <li>Thời hạn 1 tháng, gia hạn tự động.</li>
                            <li>Đã bao gồm phim bạn đang chọn thuê.</li>
                            <li>Xem phim không giới hạn với hơn 10.000 giờ nội dung đặc sắc.</li>
                        </ul>
                    </Card>
                ))}

                <Button
                    type="primary"
                    block
                    style={{ marginBottom: "20px", height: "50px", fontSize: "16px" }}
                    onClick={handleProceed}
                    disabled={!choose} // Disable if no choice is selected
                >
                    Tiếp tục
                </Button>

                <Text style={{ display: "block", textAlign: "center", color: "#1890ff", cursor: "pointer" }}>
                    Xem kho phim và thanh toán sau
                </Text>
            </div>
        </div>
    );
};

export default Pay;

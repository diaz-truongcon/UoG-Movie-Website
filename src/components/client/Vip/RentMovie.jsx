import React, { useState, useContext, useEffect, useRef } from 'react';
import { Card, Typography, Divider, Button, Row, Col, Image, message } from 'antd';
import { paymentMethods, initialOptions } from "../../../utils/Contants";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextMovies } from '../../../context/MoviesContext';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocument } from "../../../Service/FirebaseService"; 
const { Text, Link } = Typography;

function RentMovie() {
    const { id } = useParams();
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const movies = useContext(ContextMovies);
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const rentPriceRef = useRef(0);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    useEffect(() => {
        const foundMovie = movies?.find((element) => element.id === id);
        if (foundMovie) {
            setMovie(foundMovie);
        }
        rentPriceRef.current = foundMovie?.rentalPrice;
    }, [id, movies]);

    const createSubscription = async (transactionId) => {
        try {    
            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setMonth(startDate.getMonth() +  1); 
            await addDocument('RentMovies', {
                isUser: isLoggedIn.id,
                movieId: movie?.id,
                price: rentPriceRef.current,
                startDate: startDate,
                expiryDate: expiryDate,
                paymentMethod: paymentMethod,
                transactionId: transactionId,
            }); 
            message.success('Rentmovies created successfully!');
            navigate("/");
        } catch (error) {
            console.error('Error creating Rentmovies:', error);
        }
    };

    const formattedPrice = movie ? parseInt(movie.rentalPrice).toLocaleString('vi-VN') : "0";

    return (
        <div style={{ padding: '6%', backgroundColor: '#f2f2f2' }}>
            <Row gutter={[32, 16]}>
                <Col sm={24} md={12} lg={12}>
                    <Card title="THÔNG TIN THANH TOÁN" bordered={false}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Image
                                    src={movie?.imgUrl}
                                    alt={movie?.nameMovie || "Movie Image"}
                                    style={{ borderRadius: 8 }}
                                />
                            </Col>
                            <Col span={16}>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Tài khoản:</Text>
                                    <Text>0378 486 992</Text>
                                </div>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Phim:</Text>
                                    <Text>{movie?.nameMovie}</Text>
                                </div>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Độ phân giải:</Text>
                                    <Text>HD</Text>
                                </div>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Thời hạn:</Text>
                                    <Link>{movie?.duration || 0} phút</Link>
                                </div>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Đơn giá:</Text>
                                    <Text type="danger">{formattedPrice} VNĐ</Text>
                                </div>
                                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Text strong>Khuyến mãi:</Text>
                                    <Text type="danger">0đ</Text>
                                </div>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="space-between">
                            <Text strong>Tổng cộng</Text>
                            <Text strong style={{ color: '#1890ff' }}>{formattedPrice} VNĐ</Text>
                        </Row>

                        <Divider />

                        <Text type="secondary" style={{ fontSize: 12 }}>
                            * Lưu ý: Thời gian thuê phim là 30 ngày sau khi thuê và còn 48 giờ khi bắt đầu xem phim.
                        </Text>

                        <Button type="primary" block style={{ marginTop: 16 }}>
                            Áp dụng ưu đãi
                        </Button>
                    </Card>
                </Col>
                <Col sm={24} md={12} lg={12}>
                    <Card title="Chọn phương thức thanh toán">
                        <Row gutter={[16, 16]}>
                            {paymentMethods.map((method, index) => (
                                <Col span={12} key={index}>
                                    <Button
                                        type={paymentMethod === method.title ? 'primary' : 'default'}
                                        onClick={() => handlePaymentMethodChange(method.title)}
                                        style={{ width: '100%' }}
                                    >
                                        {method.icon} {method.title}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                    <div style={{ marginTop: "20px" }}>
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    const priceInUSD = (rentPriceRef.current / 24000).toFixed(2);
                                    console.log("ut",priceInUSD);
                                    
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: priceInUSD,
                                                currency_code: "USD"
                                            }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const transactionId = details.id;
                                        createSubscription(transactionId);
                                    });
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default RentMovie;

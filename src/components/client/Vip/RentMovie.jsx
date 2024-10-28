import React, { useState, useContext, useEffect } from 'react';
import { Card, Typography, Divider, Button, Row, Col, Image } from 'antd';
import { paymentMethods, initialOptions } from "../../../utils/Contants";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useParams ,useNavigate } from 'react-router-dom';
const { Text, Title, Link } = Typography;
function RentMovie(props) {
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const navigate = useNavigate();
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
 // Function to create a subscription in Firestore
 const createSubscription = async (transactionId) => {
    try {
        const currentPackage = selectedPackageRef.current;
        const plan = selectedPlanRef.current;

        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setMonth(startDate.getMonth() + (parseInt(currentPackage.time) || 1)); 

        await addDocument('Rentmovies', {
            idUser: isLoggedIn.id,
            idmovie: plan.id,
            price: price,
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
    return (
        <div style={{ padding: '6%', backgroundColor: '#f2f2f2' }}>
            <Row gutter={16}>
                <Col sm={24} md={12} lg={12}>
                    <Card title="THÔNG TIN THANH TOÁN" bordered={false} style={{ margin: 'auto' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Image
                                    src="https://assets.glxplay.io/images/w300/title/mua-he-dep-nhat_web_posterPortrait_4ad18b8a3d76ed2c3fc66613118f3d35.jpg" // Replace with actual image URL
                                    alt="Mùa Hè Đẹp Nhất"
                                    style={{ borderRadius: 8 }}
                                />
                            </Col>
                            <Col span={16}>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Tài khoản:</Text>
                                    <Text>0378 486 992</Text> 
                                </div>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Phim:</Text>
                                    <Text>Mùa Hè Đẹp Nhất</Text>  
                                </div>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Độ phân giải:</Text>
                                     <Text>HD</Text>
                                </div>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Thời hạn:</Text> <Link>48 tiếng</Link>
                                </div>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Đơn giá:</Text> <Text type="danger">59.000đ</Text>
                                </div>
                                <div style={{ marginBottom: 8,display:"flex", justifyContent:"space-between" }}>
                                    <Text strong>Khuyến mãi</Text>
                                     <Text type="danger">0đ</Text>
                                </div>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="space-between">
                            <Text strong>Tổng cộng</Text>
                            <Text strong style={{ color: '#1890ff' }}>59.000đ</Text>
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
                    <div style={{marginTop:"20px"}}>
                    <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    const currentPackage = selectedPackageRef.current;
                                    const plan = selectedPlanRef.current;

                                    if (!currentPackage) {
                                        alert("Vui lòng chọn gói trước khi thanh toán.");
                                        return;
                                    }
                                    const priceInUSD = (plan.pricePerMonth * currentPackage.time * (1 - currentPackage.discount / 100) / 24000).toFixed(2); // Chuyển từ VND sang USD
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: priceInUSD
                                            }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const transactionId = details.id; // Lấy ID giao dịch từ PayPal
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
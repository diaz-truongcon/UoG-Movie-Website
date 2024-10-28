import React, { useState, useContext, useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Radio, Button, Row, Col, Card, Divider, message } from 'antd';
import { useParams ,useNavigate } from 'react-router-dom';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext'; // Context to get user info
import { addDocument } from "../../../Service/FirebaseService"; // Function to add document to Firestore
import { getPackagesByPlan } from "../../../Service/FirebaseService"; // Fetch packages by plan
import { ContextPlans } from '../../../context/PlansContext';
import { paymentMethods, initialOptions } from "../../../utils/Contants";
const PaymentPage = () => {
    const { isLoggedIn } = useContext(CustomerLoginContext); // Get user info from context
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const { id } = useParams();
    const selectedPackageRef = useRef(selectedPackage);
    const selectedPlanRef = useRef(selectedPlan); // Fixed typo
    const plans = useContext(ContextPlans);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch packages based on idPlan
        const fetchPackages = async () => {
            const packagesData = await getPackagesByPlan(id);
            const plan = plans.find(p => p.id === id);
            setSelectedPlan(plan);
            if (packagesData.length > 0) {
                setPackages(packagesData); // Set the packages for the plan
                setSelectedPackage(packagesData[0]); // Default to the first package
            }
        };
        fetchPackages();
    }, [id, plans]);

    useEffect(() => {
        selectedPackageRef.current = selectedPackage;
        selectedPlanRef.current = selectedPlan; // Fixed typo
    }, [selectedPackage, selectedPlan]);

    const handlePlanChange = (id) => {
        const newSelectedPackage = packages.find((pkg) => pkg.id === id);
        setSelectedPackage(newSelectedPackage);
    };

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

        await addDocument('Subscriptions', {
            idUser: isLoggedIn.id,
            plan: plan.id, 
            startDate: startDate,
            expiryDate: expiryDate,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
        });
     message.success('Subscription created successfully!');
     navigate("/");
    } catch (error) {
        console.error('Error creating subscription:', error);
        alert('Failed to create subscription. Please try again.');
    }
};

    return (
        <div style={{ padding: '20px', backgroundColor: '#f2f2f2', paddingTop: '100px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Chọn Gói Đăng Ký">
                        <Radio.Group value={selectedPackage?.id || ""} style={{ width: '100%' }}>
                            {packages.sort((a,b) => a.time - b.time).map((pkg) => (
                                <div onChange={() => handlePlanChange(pkg.id)} key={pkg.id} style={{ marginBottom: '10px' }}>
                                    <Radio value={pkg.id} style={{ display: 'flex', width: '100%' }}>
                                        <div>
                                            <p><b>{pkg.time} Tháng</b></p>
                                            {pkg.discount > 0 && (
                                            <p style={{ color: 'red' }}>
                                                {`Giảm ${pkg.discount}%`}
                                            </p>
                                        )}
                                        </div>
                                        <div>
                                            <p><b>{(selectedPlan?.pricePerMonth * pkg.time - selectedPlan?.pricePerMonth * pkg.time * pkg.discount / 100).toLocaleString('vi-VN')}<sup>VNĐ</sup></b></p>
                                            <p style={{textDecoration:"line-through",color:"gray"}}>{(selectedPlan?.pricePerMonth*pkg.time).toLocaleString('vi-VN')}<sup>VNĐ</sup></p>
                                        </div>
                                        
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </Card>

                    <Card style={{ marginTop: '20px' }} title="THÔNG TIN THANH TOÁN">
                        <p><b>Tài khoản:</b> {isLoggedIn.id}</p>
                        <p><b>Tên gói:</b> {selectedPlan?.title || "Chưa chọn gói"}</p>
                        <p><b>Ngày hiệu lực:</b> {new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        <p><b>Ngày hết hạn:</b> {new Date(new Date().setMonth(new Date().getMonth() + (parseInt(selectedPackage?.time) || 0))).toLocaleDateString('vi-VN')}</p>
                        <p><b>Khuyến mãi: </b><b style={{color:"red"}}>{selectedPackage?.discount || '0%'}%</b></p>
                        <Divider />
                        <p><strong>Tổng cộng: <span style={{color:"red"}}>{(selectedPlan?.pricePerMonth * selectedPackage?.time - selectedPlan?.pricePerMonth * selectedPackage?.time*selectedPackage?.discount/100 ).toLocaleString()}₫</span></strong></p>
                    </Card>
                </Col>
                <Col span={12}>
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

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
};

export default PaymentPage;

import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Typography, Divider, message, Input } from "antd";
import { GoogleOutlined, PhoneOutlined } from "@ant-design/icons";
import { ContextCustomers } from "../../../context/CustomersContext";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, getAuth } from "firebase/auth";
import { googleProvider } from "../../../config/firebase";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocument } from "../../../Service/FirebaseService";
import { ROLES } from "../../../utils/Contants";

function Login({ handleCancel, isModalVisible }) {
    const customers = useContext(ContextCustomers);
    const { setIsLoggedIn } = useContext(CustomerLoginContext);   
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        if (auth) {
            // Bật chế độ bỏ qua xác thực reCAPTCHA trong môi trường phát triển
            auth.settings.appVerificationDisabledForTesting = true;
    
            // Kiểm tra xem appVerificationDisabledForTesting có tồn tại không
            if ('appVerificationDisabledForTesting' in auth.settings) {
                console.log('appVerificationDisabledForTesting tồn tại trong auth');
            } else {
                console.log('appVerificationDisabledForTesting không tồn tại trong auth');
            }
    
            // Trì hoãn khởi tạo reCAPTCHA để đảm bảo phần tử DOM đã sẵn sàng
            setTimeout(() => {
                setupRecaptcha();
            }, 1000);  // Chờ 1 giây để đảm bảo phần tử DOM sẵn sàng
        }
    }, [auth]);
    
    const setupRecaptcha = () => {
        const recaptchaElement = document.getElementById('recaptcha-container');
    
        if (!recaptchaElement) {
            console.error('Phần tử recaptcha-container chưa có trong DOM.');
            return;
        }
    
        if (!window.recaptchaVerifier) {
            try {
                console.log("Khởi tạo RecaptchaVerifier");
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    size: 'normal',
                    callback: (response) => {
                        console.log('reCAPTCHA verified', response);
                    },
                    'expired-callback': () => {
                        console.log('Mã reCAPTCHA đã hết hạn, vui lòng thử lại.');
                    },
                }, auth);
            } catch (error) {
                console.error('Lỗi khởi tạo reCAPTCHA:', error);
            }
        }
    };
    
    
    
    // Đăng nhập với Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const existingCustomer = customers.find((item) => item.email === result.user.email);
            let loggedInCustomer;

            if (!existingCustomer) {
                const newCustomer = {
                    nameCustomer: result.user.displayName,
                    email: result.user.email,
                    imgUrl: result.user.photoURL,
                    role: ROLES.USER,  // Vai trò mặc định
                };

                // Thêm khách hàng mới vào cơ sở dữ liệu
                await addDocument('Customers', newCustomer);
                loggedInCustomer = newCustomer;
            } else {
                loggedInCustomer = existingCustomer;
            }

            setIsLoggedIn(loggedInCustomer);
            handleCancel();
            message.success('Đăng nhập thành công');
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    // Gửi mã xác minh đến số điện thoại
    const sendVerificationCode = async () => {
        setupRecaptcha();
        try {
            
            
            const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
            setConfirmationResult(result);
            console.log(result);
            setIsCodeSent(true);
            message.success('Mã xác minh đã được gửi!');
        } catch (error) {
            message.error('Gửi mã xác minh thất bại. Vui lòng thử lại.');
        }
    };

    // Xác minh mã xác minh từ người dùng
    const verifyCode = async () => {
        try {
            const result = await confirmationResult.confirm(verificationCode);
            const existingCustomer = customers.find((item) => item.phone === result.user.phoneNumber);
            let loggedInCustomer;

            if (!existingCustomer) {
                const newCustomer = {
                    nameCustomer: result.user.phoneNumber,
                    phone: result.user.phoneNumber,
                    role: ROLES.USER,  // Vai trò mặc định
                };

                // Thêm khách hàng mới vào cơ sở dữ liệu
                await addDocument('Customers', newCustomer);
                loggedInCustomer = newCustomer;
            } else {
                loggedInCustomer = existingCustomer;
            }

            setIsLoggedIn(loggedInCustomer);
            handleCancel();
            message.success('Đăng nhập thành công');
        } catch (error) {
            message.error('Mã xác minh không hợp lệ. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Modal
                title="ĐĂNG NHẬP"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered
                style={{ textAlign: 'center' }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button onClick={signInWithGoogle} icon={<GoogleOutlined />} style={{ background: "linear-gradient(to right, red, yellow, green)", border: "none", color: "gray", marginTop: "20px", marginBottom: "10px" }}>Tiếp tục với Google</Button>
                    <Divider>
                        Hoặc
                    </Divider>
                    {!isCodeSent ? (
                        <>
                            <Input
                                placeholder="Nhập số điện thoại của bạn"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Button onClick={sendVerificationCode} icon={<PhoneOutlined />} style={{ backgroundColor: "blue", color: "white" }}>Tiếp tục với Số điện thoại</Button>
                        </>
                    ) : (
                        <>
                            <Input
                                placeholder="Nhập mã xác minh"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Button onClick={verifyCode} style={{ backgroundColor: "green", color: "white" }}>Xác minh mã</Button>
                        </>
                    )}
                    <div id="recaptcha-container"></div>
                    <Typography.Paragraph style={{ marginTop: "20px", textAlign: "center" }}>
                        Khi tiếp tục, bạn đã đồng ý <a href="">Quy chế sử dụng dịch vụ</a> của Galaxy Play.
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ textAlign: "center" }}>
                        Hỗ trợ và chính sách bảo mật.
                    </Typography.Paragraph>
                </div>
                <hr />
            </Modal>
        </>
    );
}

export default Login;

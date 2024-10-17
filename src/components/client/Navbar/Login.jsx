import React, { useContext, useState } from 'react';
import { Button, Modal, Typography, Divider, message, Input, Form } from "antd";
import { GoogleOutlined, UserOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ContextCustomers } from "../../../context/CustomersContext";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../config/firebase";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocumentById } from "../../../Service/FirebaseService";
import { ROLES } from "../../../utils/Contants";

const Login = ({ handleCancel, isModalVisible }) => {
    const customers = useContext(ContextCustomers); // Lấy dữ liệu khách hàng từ Context
    const { setIsLoggedIn } = useContext(CustomerLoginContext); // Cập nhật trạng thái đăng nhập
    const [isSignUp, setIsSignUp] = useState(false);
    const [form] = Form.useForm();

    // Handle login using email and password
    const handleLogin = (values) => {
        const { email, password } = values;
        const existingCustomer = customers.find(customer => customer.id === email && customer.password === password);
        if(!existingCustomer) {
           message.error('Email hoặc mật khẩu không đúng!');
           return;
        }
        setIsLoggedIn(existingCustomer);
        message.success('Đăng nhập thành công!');
        handleCancel();
    };

    // Handle sign-up using email and password
    const handleSignUp = async (values) => {
        const { email, password, confirmPassword } = values;
        // Validate if passwords match
        if (password !== confirmPassword) {
            message.error('Mật khẩu không trùng khớp!');
            return;
        }
       // Kiểm tra khách hàng đã tồn tại dựa trên email
       const existingCustomer = customers.find(customer => customer.id === email);
       if(existingCustomer) {
            message.error('Email đã tồn tại. Vui lòng đăng nhập hoặc đăng ký với email khác.');
            return;
       }
        // Tạo mới khách hàng
        const newCustomer = {
            imgUrl: "https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png",
            role: ROLES.USER, 
            password: password
        };

        // Thêm khách hàng mới vào Firestore với email làm id
        await addDocumentById('Customers', email, newCustomer);
        newCustomer.id = email; // Gán email vào id của khách hàng mới
        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(newCustomer);
        // Xoá thông tin đăng nhập và mật khẩu
        form.resetFields();
        // On success
        message.success('Đăng ký thành công!');
        handleCancel();
    };

    // Đăng nhập với Google
    const signInWithGoogle = async () => {
        try {
            // Thực hiện đăng nhập với Google
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Kiểm tra khách hàng đã tồn tại dựa trên email
            const existingCustomer = customers.find(customer => customer.id === user.email);
            let loggedInCustomer;

            // Nếu khách hàng chưa tồn tại, tạo mới trong cơ sở dữ liệu với email làm id
            if (!existingCustomer) {
                const newCustomer = {
                    nameCustomer: user.displayName,
                    imgUrl: user.photoURL,
                    role: ROLES.USER, // Gán vai trò mặc định là USER
                };
                // Thêm khách hàng mới vào Firestore với email làm id
                await addDocumentById('Customers', user.email, newCustomer);
                newCustomer.id = user.email;
                loggedInCustomer = newCustomer; // Gán khách hàng mới vào biến
            } else {
                loggedInCustomer = existingCustomer; // Nếu đã tồn tại, gán dữ liệu cũ
            }

            // Cập nhật trạng thái đăng nhập
            setIsLoggedIn(loggedInCustomer);
            handleCancel(); // Đóng modal
            message.success('Đăng nhập thành công!');
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <Modal
        title={isSignUp ? "Sign Up" : "Login"}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
        style={{ textAlign: 'center' }}
    >
        <Form
            form={form}
            layout="vertical"
            onFinish={isSignUp ? handleSignUp : handleLogin}
        >
            {/* Email Input */}
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
            >
                <Input
                    placeholder="e.g. example@mail.com"
                    prefix={<UserOutlined />}
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password
                    placeholder="e.g. Example2006"
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                    iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            {/* Confirm Password Input - Only for Sign Up */}
            {isSignUp && (
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Re-enter your password"
                        style={{
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "45px",
                            border: "1px solid gray",
                            fontSize: "16px",
                            backgroundColor: "#f0f0f0"
                        }}
                        iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
            )}

            {/* Forgot password link */}
            {!isSignUp && (
                <a href="#" style={{ alignSelf: "flex-end", marginBottom: "10px", color: "#aaa" }}>
                    Forgot password?
                </a>
            )}

            {/* Submit Button */}
            <Button
                htmlType="submit"
                style={{
                    backgroundColor: "#333",
                    color: "white",
                    borderRadius: "45px",
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "10px"
                }}
            >
                {isSignUp ? "Sign Up" : "Login"}
            </Button>
        </Form>

        {/* Toggle between login and sign-up */}
        <Typography.Paragraph>
            {isSignUp ? (
                <>Already have an account? <a onClick={() => setIsSignUp(false)}>Login</a></>
            ) : (
                <>Don’t have an account? <a onClick={() => setIsSignUp(true)}>Sign up</a></>
            )}
        </Typography.Paragraph>

        <Divider>Or</Divider>

        {/* Google Login Button */}
        <Button
            onClick={signInWithGoogle}
            icon={<GoogleOutlined />}
            style={{
                background: "white",
                border: "1px solid gray",
                borderRadius: "45px",
                color: "black",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                width: "100%"
            }}
        >
            Sign in with Google
        </Button>
    </Modal>
    );
};

export default Login;

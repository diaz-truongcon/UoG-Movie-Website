import React, { useContext, useState } from 'react';
import { Button, Modal, Typography, Divider, message, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { ContextCustomers } from "../../../context/CustomersContext";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../config/firebase";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocumentById } from "../../../Service/FirebaseService";
import { ROLES } from "../../../utils/Contants";
import SignupItem from './SignupItem';
import LoginItem from './LoginItem';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";

const Login = ({ handleCancel, isModalVisible }) => {
    const customers = useContext(ContextCustomers);
    const { setIsLoggedIn } = useContext(CustomerLoginContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Handle login using username/email and password
    const handleLogin = (values) => {
        const { emailOrUsername, password } = values;
        const existingCustomer = customers.find(customer =>
            (customer.id === emailOrUsername || customer.username === emailOrUsername) && customer.password === password
        );
        if (!existingCustomer) {
            message.error('Tên người dùng hoặc email hoặc mật khẩu không đúng!');
            return;
        }
        setIsLoggedIn(existingCustomer);
        message.success('Đăng nhập thành công!');
        handleCancel();
        navigate("/");
    };

    // Handle sign-up using username, email, and password
    const handleSignUp = async (values) => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            message.error('Mật khẩu không trùng khớp!');
            return;
        }
        const existingCustomer = customers.find(customer => customer.id === email || customer.username === username);
        if (existingCustomer) {
            message.error('Email hoặc tên người dùng đã tồn tại.');
            return;
        }

        const newCustomer = {
            username,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Favt.jpg?alt=media&token=135e247d-b8ae-4c0d-aa37-7aae7e61014b",
            role: ROLES.USER,
            password,
        };

        await addDocumentById('Customers', email, newCustomer);
        newCustomer.id = email;
        setIsLoggedIn(newCustomer);
        form.resetFields();
        message.success('Đăng ký thành công!');
        handleCancel();
        navigate("/");
    };

    // Google sign-in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const existingCustomer = customers.find(customer => customer.id === user.email);
            let loggedInCustomer;

            if (!existingCustomer) {
                const newCustomer = {
                    username: user.displayName,
                    imgUrl: user.photoURL,
                    role: ROLES.USER,
                };
                await addDocumentById('Customers', user.email, newCustomer);
                newCustomer.id = user.email;
                loggedInCustomer = newCustomer;
            } else {
                loggedInCustomer = existingCustomer;
            }
            setIsLoggedIn(loggedInCustomer);
            message.success('Đăng nhập thành công!');
            handleCancel();
            navigate("/");
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Modal
                title={isForgot ? "Forgot Password" : (isSignUp ? "Sign Up" : "Login")}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered
                style={{ textAlign: 'center' }}
            >
            {
                isForgot ?  <ForgotPassword setIsForgot={setIsForgot} /> : (
                    <>
                        <Form form={form} layout="vertical" onFinish={isSignUp ? handleSignUp : handleLogin}>
                    {isSignUp ? <SignupItem /> : <LoginItem />}
                    {!isSignUp && (
                        <a onClick={() => setIsForgot(true)} href="#" style={{ alignSelf: "flex-end", marginBottom: "10px", color: "#aaa" }}>
                            Forgot password?
                        </a>
                    )}
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

                <Typography.Paragraph>
                    {isSignUp ? (
                        <>Already have an account? <a onClick={() => setIsSignUp(false)}>Login</a></>
                    ) : (
                        <>Don’t have an account? <a onClick={() => setIsSignUp(true)}>Sign up</a></>
                    )}
                </Typography.Paragraph>

                <Divider>Or</Divider>

                <Button
                    onClick={signInWithGoogle}
                    icon={<GoogleOutlined />}
                    style={{
                        background: "linear-gradient(to right,red, yellow, green)",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "45px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                >
                    Continue with Google
                </Button>
                <Typography.Paragraph style={{ color: "#aaa", fontSize: "14px", marginTop: "10px" }}>
                    By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </Typography.Paragraph>

                <Typography.Paragraph style={{ color: "#aaa", fontSize: "14px", marginTop: "5px" }}>
                    Need help? Contact <a href="#">Support</a>.
                </Typography.Paragraph>
                    </>
                )
            }
            </Modal>     
        </>
    );
};

export default Login;

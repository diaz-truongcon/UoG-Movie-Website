import React, { useState, useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { ContextCustomers } from "../../../context/CustomersContext";
import { YOUR_SERVICE_ID, CONFIRM_CODE, YOUR_USER_ID } from "../../../utils/Contants";
import emailjs from 'emailjs-com';
import { updateDocument } from '../../../Service/FirebaseService';

const ForgotPassword = ({ setIsForgot }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [confirmCode, setConfirmCode] = useState(null);  // Lưu mã xác nhận
    const [isCodeSent, setIsCodeSent] = useState(false);  // Trạng thái xác nhận đã gửi mã
    const [isCodeValid, setIsCodeValid] = useState(false);  // Trạng thái xác nhận mã đúng
    const [email, setEmail] = useState(null);
    const customers = useContext(ContextCustomers);

    // Tạo mã xác nhận ngẫu nhiên gồm 4 chữ số
    const generateConfirmCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Mã xác nhận 4 số
    };

    // Handle sending the password reset email
    const handleForgotPassword = async (values) => {
        const { email } = values;
        const account = customers.find(account => account.id === email);

        if (!account) {
            message.error('Email không tồn tại.');
            return;
        }

        const code = generateConfirmCode();  // Tạo mã xác nhận
        setConfirmCode(code);  // Lưu mã vào state
        setEmail(email);

        const templateParams = {
            username: account.username,
            confirm_code: code,  // Gửi mã xác nhận qua email
            to_email: email,  // Địa chỉ email nhận
        };

        try {
            setLoading(true);
            await emailjs.send(YOUR_SERVICE_ID, CONFIRM_CODE, templateParams, YOUR_USER_ID);
            message.success('Mã xác nhận đã được gửi đến email của bạn.');
            setIsCodeSent(true);  // Chuyển sang trạng thái đã gửi mã
        } catch (error) {
            message.error('Không thể gửi email. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý xác nhận mã
    const handleVerifyCode = async (values) => {
        const { code } = values;
        if (code === confirmCode) {
            message.success('Mã xác nhận đúng. Bạn có thể cài lại mật khẩu.');
            setIsCodeValid(true);  // Chuyển sang trạng thái mã đúng
        } else {
            message.error('Mã xác nhận không đúng.');
        }
    };

    // Xử lý cài lại mật khẩu
    const handleResetPassword = async (values) => {
        const { password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error('Mật khẩu không khớp.');
            return;
        }

        await updateDocument('Customers',email, { password: password });
        message.success('Mật khẩu đã được đặt lại thành công!');
        setEmail(null);  // Xóa email và mã xác nhận
        form.resetFields();
        setIsForgot(false);  // Quay lại trang đăng nhập
    };

    return (
        <div style={{ margin: "auto" }}>
            {!isCodeSent && (
                <>
                    <p>Nhập email của bạn để nhận mã xác nhận đặt lại mật khẩu.</p>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleForgotPassword}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: "45px",
                                padding: "10px",
                                fontSize: "16px",
                                marginBottom: "10px",
                                width: "100%"
                            }}
                        >
                            Gửi mã xác nhận
                        </Button>
                    </Form>
                </>
            )}

            {isCodeSent && !isCodeValid && (
                <>
                    <p>Nhập mã xác nhận đã được gửi đến email của bạn.</p>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleVerifyCode}
                    >
                        <Form.Item
                            name="code"
                            label="Mã xác nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}
                        >
                            <Input
                                placeholder="Nhập mã xác nhận"
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: "45px",
                                padding: "10px",
                                fontSize: "16px",
                                marginBottom: "10px",
                                width: "100%"
                            }}
                        >
                            Xác nhận mã
                        </Button>
                    </Form>
                </>
            )}

            {isCodeValid && (
                <>
                    <p>Nhập mật khẩu mới của bạn.</p>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleResetPassword}
                    >
                        <Form.Item
                            name="password"
                            label="Mật khẩu mới"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu mới"
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
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập lại mật khẩu"
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: "45px",
                                padding: "10px",
                                fontSize: "16px",
                                marginBottom: "10px",
                                width: "100%"
                            }}
                        >
                            Cài lại mật khẩu
                        </Button>
                    </Form>
                </>
            )}
            {!isCodeValid && (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    <a onClick={() => setIsForgot(false)} style={{ color: "#aaa" }}>
                        Trở lại trang đăng nhập
                    </a>
                </p>
            )}
        </div>
    );
};

export default ForgotPassword;

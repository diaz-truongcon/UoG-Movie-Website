import React from 'react';
import { UserOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
function SignupItem(props) {
    return (
        <>
             <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
            >
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined />}
                    style={{
                        padding: "8px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
            >
                <Input
                    placeholder="e.g. example@mail.com"
                    prefix={<UserOutlined />}
                    style={{
                        padding: "8px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password
                    placeholder="e.g. Example2006"
                    style={{
                        padding: "8px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                    iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
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
                ]}>
                <Input.Password
                    placeholder="Re-enter your password"
                    style={{
                        padding: "8px",
                        borderRadius: "45px",
                        border: "1px solid gray",
                        fontSize: "16px",
                        backgroundColor: "#f0f0f0"
                    }}
                    iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
        </>
    );
}

export default SignupItem;
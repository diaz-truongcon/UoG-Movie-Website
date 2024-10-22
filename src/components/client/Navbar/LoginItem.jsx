import React from 'react';
import { UserOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
function LoginItem(props) {
    return (
        <>
            <Form.Item
                name="emailOrUsername"
                label="Email or Username"
                rules={[{ required: true, message: 'Please enter your email or username!' }]}
            >
                <Input
                    placeholder="e.g. example@mail.com or your username"
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
        </>
    );
}

export default LoginItem;
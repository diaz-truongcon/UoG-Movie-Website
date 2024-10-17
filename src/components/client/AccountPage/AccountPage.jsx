import React, { useContext, useState } from 'react';
import { Layout, Menu, Form, Input, Button, Radio, Avatar, message, Col, Row } from 'antd';
import { UserOutlined, GiftOutlined, LogoutOutlined, AppleOutlined, FacebookOutlined, GoogleOutlined, PicRightOutlined, BulbOutlined } from '@ant-design/icons';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import EditProfile from './EditProfile';

const { Header, Content, Sider } = Layout;

const AccountPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomerLoginContext);


    return (
        <Row style={{ backgroundColor: '#fff', paddingTop: "50px" }} >
            <Col xs={24} md={8} xl={6}>
                <Avatar
                    size={64}
                    src={isLoggedIn.imgUrl}
                    style={{ margin: '20px auto', display: 'block' }}
                />
                <p style={{ textAlign: 'center' }}>0378486992</p>
                <p style={{ textAlign: 'center' }}>Bạn chưa có gói Galaxy Play</p>
                <p style={{ textAlign: 'center', padding: "20px" }}>
                    <Button type="primary">Đăng ký gói</Button>
                </p>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    theme="light" // Đặt theme là light để menu có nền sáng
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <p style={{ color: 'black' }} >Tài khoản</p>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PicRightOutlined />} >
                        <p style={{ color: 'black' }}>Quản lý kho phim</p>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BulbOutlined />} >
                        <p style={{ color: 'black' }}>Quản lý thiết bị</p>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<GiftOutlined />} >
                        <p style={{ color: 'black' }}>Ưu đãi của bạn</p>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<LogoutOutlined />} >
                        <p style={{ color: 'black' }}>Đăng xuất</p>
                    </Menu.Item>
                </Menu>
            </Col>
             <EditProfile isLoggedIn={isLoggedIn} />
        </Row>
    );
};

export default AccountPage;

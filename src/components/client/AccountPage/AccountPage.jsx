import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, Form, Input, Button, Radio, Avatar, message, Col, Row, Upload } from 'antd';
import { UserOutlined, GiftOutlined, LogoutOutlined, PicRightOutlined, AppstoreOutlined } from '@ant-design/icons';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { AccountProvider } from '../../../context/AccountProvider';
const AccountPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomerLoginContext);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        setPreviewImg(isLoggedIn.imgUrl);
    }, [isLoggedIn]);

    // Image upload handling
    const uploadProps = {
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewImg(reader.result); // Preview image before upload
            };
            setImgUpload(file);
            return false;
        },
    };
    // Menu item click handler
    const handleMenuClick = (key) => {
        switch (key) {
            case '1':
                navigate('/accountpage'); // EditProfile route
                break;
            case '2':
                navigate('/accountpage/rentflix');
                break;
            case '3':
                navigate('/accountpage/device-management');
                break;
            case '4':
                navigate('/accountpage/offers');
                break;
            case '5':
                // Handle logout logic here
                setIsLoggedIn(false); // Example logout action
                break;
            default:
                break;
        }
    };

    // Define menu items array for the new `items` prop
    const menuItems = [
        { key: '1', icon: <UserOutlined />, label: <p style={{ color: 'black' }}>Tài khoản</p> },
        { key: '2', icon: <PicRightOutlined />, label: <p style={{ color: 'black' }}>Quản lý kho phim</p> },
        { key: '3', icon: <AppstoreOutlined />, label: <p style={{ color: 'black' }}>Quản lý Gói đăng ký</p> },
        { key: '4', icon: <GiftOutlined />, label: <p style={{ color: 'black' }}>Ưu đãi của bạn</p> },
        { key: '5', icon: <LogoutOutlined />, label: <p style={{ color: 'black' }}>Đăng xuất</p> },
    ];

    return (
        <AccountProvider value={{ isLoggedIn, imgUpload }}>
            <Row style={{ backgroundColor: '#fff', padding: "50px" }}>
                <Col xs={24} md={8} xl={6}>
                    <Avatar
                        size={64}
                        src={previewImg}
                        style={{ margin: '10px auto', display: 'block' }}
                    />
                    <p style={{ textAlign: 'center', marginBottom: "10px" }}>
                        <Upload {...uploadProps} showUploadList={false} style={{ textAlign: 'center' }}>
                            <Button>Chọn ảnh đại diện</Button>
                        </Upload>
                    </p>
                    <p style={{ textAlign: 'center' }}>0378486992</p>
                    <p style={{ textAlign: 'center' }}>Bạn chưa có gói Galaxy Play</p>
                    <p style={{ textAlign: 'center', padding: "20px" }}>
                        <Button type="primary">Đăng ký gói</Button>
                    </p>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        theme="light"
                        items={menuItems.map(item => ({
                            ...item,
                            onClick: () => handleMenuClick(item.key), // Attach click handler
                        }))}
                    />
                </Col>
                <Outlet isLoggedIn={isLoggedIn} imgUpload={imgUpload} />
            </Row>
        </AccountProvider>
    );
};

export default AccountPage;

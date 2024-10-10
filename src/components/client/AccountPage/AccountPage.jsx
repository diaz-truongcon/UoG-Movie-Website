import React from 'react';
import { Layout, Menu, Form, Input, Button, Radio, Avatar, message, Col, Row } from 'antd';
import { UserOutlined, GiftOutlined, LogoutOutlined, AppleOutlined, FacebookOutlined, GoogleOutlined, PicRightOutlined, BulbOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const AccountPage = () => {
    const handleFinish = (values) => {
        message.success('Thông tin đã được cập nhật!');
    };

    return (
        <Row style={{ backgroundColor: '#fff', paddingTop: "50px" }} >
            <Col xs={24} md={8} xl={6}>
                <Avatar size={64} icon={<UserOutlined />} style={{ margin: '20px auto', display: 'block' }} />
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
            <Col xs={24} md={16} xl={18} style={{ padding: '24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        backgroundColor: '#fff',
                    }}
                >
                    <h2>Thông tin tài khoản</h2>
                    <Form
                        layout="vertical"
                        initialValues={{
                            fullName: 'kid tran',
                            email: 'tiprokid@gmail.com',
                            phone: '0378 486 992',
                            gender: 'male',
                        }}
                        onFinish={handleFinish}
                    >
                        <Form.Item label="Họ và tên" name="fullName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input disabled suffix={<span style={{ color: 'green' }}>✓</span>} />
                        </Form.Item>
                        <Form.Item label="Giới tính" name="gender">
                            <Radio.Group>
                                <Radio value="male">Nam</Radio>
                                <Radio value="female">Nữ</Radio>
                                <Radio value="other">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mật khẩu">
                            <Button type="link">Đổi mật khẩu</Button>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Chỉnh sửa
                        </Button>
                    </Form>
                    <h3 style={{marginTop:"20px"}}>Kết nối mạng xã hội</h3>
                    <Button icon={<AppleOutlined />} style={{ marginRight: 8 }}>Apple</Button>
                    <Button icon={<FacebookOutlined />} style={{ marginRight: 8 }}>Facebook</Button>
                    <Button icon={<GoogleOutlined />} style={{ marginRight: 8 }}>Google</Button>
                    <Button danger style={{ marginTop: 8 }}>Hủy kết nối</Button>
                </Content>
            </Col>
        </Row>
    );
};

export default AccountPage;

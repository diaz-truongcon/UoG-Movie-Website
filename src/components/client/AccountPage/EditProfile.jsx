import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Radio, Col, message, Row } from 'antd';
import { AppleOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { addUser } from '../../../Service/CustomersService';
const { Content } = Layout;
function EditProfile({ isLoggedIn, imgUpload }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(isLoggedIn);
    }, [isLoggedIn]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            addUser(values, imgUpload);
            message.success('Customers updated successfully!');
        } catch (error) {
            message.error('Failed to save customers. Please try again.');
        }
    };

    return (
        <Col xs={24} md={16} xl={18} style={{ padding: '24px' }}>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    backgroundColor: '#fff',
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Thông tin tài khoản</h2>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleOk}
                >
                    <Form.Item label="Họ và tên" name="name">
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Username" name="username">
                                <Input
                                    disabled
                                    suffix={<span style={{ color: 'green' }}>✓</span>}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" name="id">
                                <Input
                                    disabled
                                    suffix={<span style={{ color: 'green' }}>✓</span>}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Giới tính" name="gender">
                        <Radio.Group style={{ flexDirection: "row" }}>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                            <Radio value="other">Khác</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone">
                        <Input />
                    </Form.Item>
                    {isLoggedIn?.password ? (<Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            visibilityToggle={true} // This enables the show/hide feature
                        />
                    </Form.Item>) : <span className='text-google'>Sign in with Google</span> }
                     <p  style={{marginTop:"15px"}}>
                     <Button type="primary" htmlType="submit">
                        Chỉnh sửa
                    </Button>
                     </p>               
                </Form>
                {/* <h3 style={{ marginTop: "20px" }}>Kết nối mạng xã hội</h3>
            <Button icon={<AppleOutlined />} style={{ marginRight: 8 }}>Apple</Button>
            <Button icon={<FacebookOutlined />} style={{ marginRight: 8 }}>Facebook</Button>
            <Button icon={<GoogleOutlined />} style={{ marginRight: 8 }}>Google</Button>
            <Button danger style={{ marginTop: 8 }}>Hủy kết nối</Button> */}
            </Content>
        </Col>
    );
}

export default EditProfile;
import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Radio, Col, message } from 'antd';
import { AppleOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { updateDocument } from "../../../Service/FirebaseService";
const { Content } = Layout;
function EditProfile({ isLoggedIn, imgUpload }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(isLoggedIn);
    }, [isLoggedIn]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const { id, gender, phone, ...newCustomer } = values;
            // Chỉ thêm gender và phone vào newCustomer nếu chúng không phải là undefined
            if (gender !== undefined) {
                newCustomer.gender = gender;
            }
            if (phone !== undefined) {
                newCustomer.phone = phone;
            }      
            await updateDocument('Customers', isLoggedIn.id, newCustomer, imgUpload);
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
                <h2>Thông tin tài khoản</h2>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleOk}
                >
                    <Form.Item label="Họ và tên" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="id">
                        <Input disabled suffix={<span style={{ color: 'green' }}>✓</span>} />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="gender">
                        <Radio.Group>
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
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            visibilityToggle={true} // This enables the show/hide feature
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Chỉnh sửa
                    </Button>
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
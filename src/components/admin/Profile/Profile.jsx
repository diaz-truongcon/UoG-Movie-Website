import React, { useState } from 'react';
import { Card, Avatar, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        avatarUrl: 'https://topxephang.com/wp-content/uploads/2018/01/pham-bang-bang.jpg', // You can set a default URL for avatar here
    });

    const showModal = () => {
        setIsModalVisible(true);
        form.setFieldsValue(userData); // Set initial values to current user data
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setUserData(values); // Update the user data with form values
            message.success('Profile updated successfully!');
            setIsModalVisible(false);
        } catch (error) {
            message.error('Please fill in all required fields.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Card
                style={{ width: 400 }}
                actions={[
                    <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                        Edit Profile
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Avatar
                        size={100}
                        src={userData.avatarUrl || null}
                        icon={!userData.avatarUrl && <UserOutlined />}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>{userData.name}</h2>
                    <p>
                        <MailOutlined /> {userData.email}
                    </p>
                    <p>
                        <PhoneOutlined /> {userData.phone}
                    </p>
                </div>
            </Card>

            {/* Modal for Editing Profile */}
            <Modal
                title="Edit Profile"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
            >
                <Form form={form} layout="vertical" initialValues={userData}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>
                    <Form.Item
                        label="Avatar URL"
                        name="avatarUrl"
                    >
                        <Input placeholder="Enter your avatar URL (optional)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;

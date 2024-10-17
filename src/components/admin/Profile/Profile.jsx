import React, { useState, useContext } from 'react';
import { Card, Avatar, Button, Modal, Form, Input, Upload, Image, message } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext'; // Đường dẫn context login
import { updateDocument } from '../../../Service/FirebaseService'; // Hàm update document (đường dẫn firebase)

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [previewImg, setPreviewImg] = useState(null); // Ảnh preview
    const [imgUpload, setImgUpload] = useState(null); // Lưu ảnh được upload
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomerLoginContext); // Context quản lý trạng thái đăng nhập

    const showModal = () => {
        if (isLoggedIn) {
            setIsModalVisible(true);
            form.setFieldsValue(isLoggedIn); // Đặt giá trị ban đầu từ dữ liệu user đã login
        } else {
            message.warning('Vui lòng đăng nhập để chỉnh sửa hồ sơ.');
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form
            // Loại bỏ id khỏi values để tránh update giá trị này
            values.role = isLoggedIn.role;
            const { id, ...updatedValues } = values;
            // Gọi hàm updateDocument với các tham số cần thiết
            await updateDocument('Customers', isLoggedIn.id, updatedValues, imgUpload);
            values.imgUrl = previewImg;
            setIsLoggedIn(values);
            message.success('Hồ sơ đã được cập nhật thành công!');
            setIsModalVisible(false); // Đóng modal sau khi cập nhật thành công
        } catch (error) {
            message.error('Vui lòng điền đầy đủ các trường bắt buộc.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const uploadProps = {
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            setImgUpload(file);
            return false;
        },
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Card
                style={{ width: 400 }}
                actions={[
                    <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                        Chỉnh sửa hồ sơ
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Avatar
                        size={100}
                        src={previewImg || isLoggedIn.imgUrl || null} // Hiển thị ảnh preview nếu có, nếu không thì hiển thị ảnh hiện tại
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>{isLoggedIn?.nameCustomer}</h2>
                    <p>
                        <MailOutlined /> {isLoggedIn.id} {/* Hiển thị email */}
                    </p>
                    <p>
                        <PhoneOutlined /> {isLoggedIn?.phone}
                    </p>
                </div>
            </Card>

            {/* Modal để chỉnh sửa thông tin cá nhân */}
            <Modal
                title="Chỉnh sửa hồ sơ"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
            >
                <Form form={form} layout="vertical" initialValues={isLoggedIn}>
                    <Form.Item
                        label="Tên"
                        name="nameCustomer"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    {/* Email chỉ được hiển thị và không thể chỉnh sửa */}
                    <Form.Item
                        label="Email (ID)"
                        name="id"
                    >
                        <Input disabled value={isLoggedIn.id} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input placeholder="Nhập số điện thoại của bạn" />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="imgUrl"
                        rules={[{ required: true, message: 'Please upload an avatar!' }]}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<PlusOutlined />}>Upload Avatar</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Preview">
                        <Image src={previewImg} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;

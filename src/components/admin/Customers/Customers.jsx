import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Space, Image, Row, Col, Select, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ROLES } from "../../../utils/Contants";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { ContextCustomers } from '../../../context/CustomersContext';
const { Column } = Table;
const { Option } = Select;

function Customers() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [customerEdit, setCustomerEdit] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [update, setUpdate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [visiblePasswordId, setVisiblePasswordId] = useState(null);
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const customers = useContext(ContextCustomers);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setPreviewImg(null);
        setCustomerEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (customerEdit) {
                await updateDocument('Customers', customerEdit.id, values, imgUpload);
                message.success('Customer updated successfully!');
            } else {
                await addDocument('Customers', values, imgUpload);
                message.success('Customer added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save customer. Please try again.');
        }
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

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setPreviewImg(record.imgUrl);
        setCustomerEdit(record);
        setVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this customer?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Customers', record.id, record.avatar);
                    setUpdate(!update);
                    message.success('Customer deleted successfully!');
                } catch (error) {
                    message.error('Failed to delete customer. Please try again.');
                }
            },
        });
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            {isLoggedIn.role === 'admin' ? (
                <>
                    <Row gutter={16} align="middle">
                        <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                            <h3>Customers List</h3>
                        </Col>
                        <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                            <Input.Search
                                placeholder="Search customers"
                                style={{ width: '100%' }}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                            {isLoggedIn.role !== 'moderator' && (
                                <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                                    Add Customer
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Table dataSource={filteredCustomers} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }}>
                        <Column title="#" render={(text, record, index) => index + 1} key="index" />
                        <Column
                            title="Avatar"
                            key="avatar"
                            render={(text, record) => (
                                <Image width={50} src={record.imgUrl} />
                            )}
                        />
                        <Column title="Username" dataIndex="username" key="username" />
                        <Column title="Email" dataIndex="id" key="id" />
                        <Column title="Role" dataIndex="role" key="role" />
                        <Column
                            title="Password"
                            key="password"
                            render={(text, record) => (
                                <Space size="middle">
                                    {record.password ? (
                                        <Input.Password
                                            value={record.password}
                                            disabled                
                                            suffix={<EyeInvisibleOutlined />} 
                                            style={{ width: '150px' }}
                                        />
                                    ) : (
                                        <span className='text-google'>Sign in with Google</span>
                                    )}
                                </Space>
                            )}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Button type="primary" onClick={() => handleEdit(record)}><EditOutlined /></Button>
                                    <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: "white" }} onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                                </Space>
                            )}
                        />
                    </Table>
                    <Modal
                        title={customerEdit ? "Edit Customer" : "Add Customer"}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                label="Username"
                                name="username"
                               
                                rules={[{ required: true, message: 'Please enter the customer username!' }]}
                            >
                                <Input  disabled={!!customerEdit} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="id"
                                rules={[{ required: true, message: 'Please enter the customer email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                            >
                                <Input disabled={!!customerEdit} />
                            </Form.Item>
                            {(!customerEdit || customerEdit.password) && ( // Show password field if adding or if password exists
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter a password!' }]}
                                >
                                    <Input.Password disabled={!!customerEdit} />
                                </Form.Item>
                            )}
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: 'Please select a role!' }]}
                            >
                                <Select>
                                    {Object.keys(ROLES).map((key, index) => (
                                        <Option key={index} value={ROLES[key]}>{ROLES[key]}</Option>
                                    ))}
                                </Select>
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
                </>
            ) : (
                <>
                    <h1 style={{ textAlign: "center", color: "gray" }}>You must be an Administrator to view this page.</h1>
                </>
            )}

        </>
    );
}

export default Customers;

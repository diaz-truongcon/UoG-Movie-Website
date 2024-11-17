import React, { useState, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Col, Space, Image, Row, message } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextCategories } from '../../../context/CategoriesContext';
const { Column } = Table;

function Categories() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [categoryEdit, setCategoryEdit] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');  // Added state for search
    const categories = useContext(ContextCategories);

    const showModal = () => {
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setPreviewImg(null);
        setCategoryEdit(null);
    };
    
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (categoryEdit) {
                await updateDocument('Categories', categoryEdit.id, values, imgUpload, categoryEdit.imgUrl);
                message.success('Category updated successfully!');
            } else {
                await addDocument('Categories', values, imgUpload);
                message.success('Category added successfully!');
            }
            handleCancel();
        } catch (error) {
            message.error('Failed to save category. Please try again.');
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

    const handleEdit = async (record) => {
        form.setFieldsValue({ ...record });
        setPreviewImg(record.imgUrl);
        setCategoryEdit(record);
        setVisible(true);
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this item?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Categories', record.id, record.imgUrl);
                } catch (error) {
                    message.error('Failed to delete category. Please try again.');
                }
            },
        });
    };

    const handleSearch = (value) => {
        setSearchTerm(value);  // Update the search term
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter((category) =>
        category.nameCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Row gutter={16} align="middle">
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <h3>List Categories</h3>
                </Col>
                <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                    <Input.Search
                        placeholder="Search categories"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                        onSearch={handleSearch}  // Trigger search when the user types
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Category
                    </Button>
                </Col>
            </Row>
            <Table dataSource={filteredCategories} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column
                    title="Img Category"
                    key="imgCategory"
                    render={(text, record) => (
                        <Image width={50} src={record.imgUrl} />
                    )}
                />
                <Column title="Name Category" dataIndex="nameCategory" key="nameCategory" />
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
                title={categoryEdit ? "Edit Category" : "Add Category"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name Category"
                        name="nameCategory"
                        rules={[{ required: true, message: 'Please enter the name of the category!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image Category"
                        name="imgUrl"
                        rules={[{ required: true, message: 'Please upload an image for the category!' }]}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<PlusOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Selected Image">
                        <Image src={previewImg ? previewImg : 'https://firebasestorage.googleapis.com/v0/b/vam3d-15169.appspot.com/o/logo%2Flogoglx.svg?alt=media&token=496963e3-c862-4a5b-bd84-506ab09352ac'} />
                    </Form.Item>                 
                </Form>
                <Button style={{border:"none"}}></Button>
            </Modal>
        </>
    );
}

export default Categories;

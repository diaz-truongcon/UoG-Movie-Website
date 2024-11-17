import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Col, Space, Image, Row, message, Select } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextCategories } from '../../../context/CategoriesContext';
import { ContextPlans } from '../../../context/PlansContext'; // Assuming you have a Plans context
import  { ContextMovies } from '../../../context/MoviesContext';
import { Timestamp } from 'firebase/firestore';

const { Column } = Table;
const { Option } = Select;

function Movies() {
    const [form] = Form.useForm();
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [movieEdit, setMovieEdit] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPriceInput, setShowPriceInput] = useState(false); // State for showing price input
    const categories = useContext(ContextCategories);
    const plans = useContext(ContextPlans); 
    const movies = useContext(ContextMovies);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setPreviewImg(null);
        setMovieEdit(null);
        setShowPriceInput(false); // Reset the price input field visibility
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
    
            // Thêm các trường mặc định
            const additionalFields = {
                likeCount: 0,
                views: 0,
                createdAt: Timestamp.now() // Ngày hiện tại dùng Firestore Timestamp
            };
    
            if (movieEdit) {
                await updateDocument('Movies', movieEdit.id, values, imgUpload, movieEdit.imgUrl);
                message.success('Movie updated successfully!');
            } else {
                const movieData = { ...values, ...additionalFields };

                await addDocument('Movies', movieData, imgUpload);
                message.success('Movie added successfully!');
            }
    
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save movie. Please try again.');
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
        setMovieEdit(record);
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
                    await deleteDocument('Movies', record.id, record.imgUrl);
                    setUpdate((prevUpdate) => !prevUpdate);
                } catch (error) {
                    message.error('Failed to delete movie. Please try again.');
                }
            },
        });
    };

    const handleVipChange = (value) => {
        const selectedPlan = plans.find(plan => plan.id === value);
        if (selectedPlan && selectedPlan.level > 2) {
            setShowPriceInput(true);
        } else {
            setShowPriceInput(false);
        }
    };
    const handleSearch = (value) => {
        setSearchTerm(value);  // Update the search term
    };

    const filteredMovies = movies.filter((movie) =>
        movie.nameMovie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <Row gutter={16} align="middle">
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <h3>List Movies</h3>
                </Col>
                <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                    <Input.Search
                        placeholder="Search movies"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                        onSearch={handleSearch}
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Movie
                    </Button>
                </Col>
            </Row>
            <Table dataSource={filteredMovies} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column
                    title="Img Movie"
                    key="imgMovie"
                    render={(text, record) => (
                        <Image width={50} src={record.imgUrl} />)} />
                <Column title="Name Movie" dataIndex="nameMovie" key="nameMovie" render={(text) => (
                    <span>
                        {text.length > 30 ? `${text.substring(0, 25)}...` : text}
                    </span>)} />
                {/* <Column title="Category" dataIndex="categoryId" key="categoryId" render={(text, record) => {
                    const categoryNames = record.categoryId.map(id => {
                        const category = categories.find(category => category.id === id);
                        return category ? category.nameCategory : '';
                    });
                    return categoryNames.join(', ');
                }} /> */}
                <Column title="Duration" dataIndex="duration" key="duration" />
                <Column
                    title="VIP"
                    dataIndex="vip"
                    key="vip"
                    render={(text, record) => {
                        const plan = plans.find(plan => plan.id === record.vip);
                        return plan ? plan.title : 'N/A';
                    }}
                />
                <Column
                    title="Describe"
                    dataIndex="describe"
                    key="describe"
                    render={(text) => (
                        <span>
                            {text.length > 50 ? `${text.substring(0, 18)}...` : text}
                        </span>
                    )} />
                <Column
                    title="Protagonist"
                    dataIndex="protagonist"
                    key="protagonist"
                    render={(text) => (
                        <span>
                            {text.length > 40 ? `${text.substring(0, 18)}...` : text}
                        </span>
                    )} />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => handleEdit(record)}><EditOutlined /></Button>
                            <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: "white" }} onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                        </Space>
                    )} />
            </Table>
            <Modal
                title={movieEdit ? "Edit Movie" : "Add Movie"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name Movie"
                        name="nameMovie"
                        rules={[{ required: true, message: 'Please enter the name of the movie!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please select the category of the movie!' }]}>
                        <Select mode="multiple"> {/* Allow multiple selection */}
                            {categories.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.nameCategory}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Duration" name="duration">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vip"
                        name="vip"
                        rules={[{ required: true, message: 'Please select the VIP level of the movie!' }]}>
                        <Select onChange={handleVipChange}>
                            {plans.map(plan => (
                                <Option key={plan.id} value={plan.id}>
                                    {plan.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {showPriceInput && (
                        <Form.Item
                            label="Rental Price"
                            name="rentalPrice"
                            rules={[{ required: true, message: 'Please enter the rental price!' }]}>
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item label="Describe" name="describe">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Protagonist" name="protagonist">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image Movie"
                        name="imgUrl"
                        rules={[{ required: true, message: 'Please upload an image for the movie!' }]}>
                        <Upload {...uploadProps}>
                            <Button icon={<PlusOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Selected Image">
                        <Image src={previewImg} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Movies;

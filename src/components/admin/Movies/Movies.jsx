import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Col, Space, Image, Row, message, Select } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { vip } from './Vip';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextCategories } from '../../../context/CategoriesContext';

const { Column } = Table;
const { Option } = Select;

function Movies() {
    const [form] = Form.useForm();
    const [movies, setMovies] = useState([]);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [movieEdit, setMovieEdit] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const categories = useContext(ContextCategories);

    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await fetchDocuments('Movies');
            setMovies(moviesData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setPreviewImg(null);
        setMovieEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (movieEdit) {
                await updateDocument('Movies', movieEdit.id, values, imgUpload, movieEdit.imgUrl);
                message.success('Movie updated successfully!');
            } else {
                await addDocument('Movies', values, imgUpload);
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
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Movie
                    </Button>
                </Col>
            </Row>
            <Table dataSource={movies} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column
                    title="Img Movie"
                    key="imgMovie"
                    render={(text, record) => (
                        <Image width={50} src={record.imgUrl} />)}/>
                <Column title="Name Movie" dataIndex="nameMovie" key="nameMovie" render={(text) => (
                    <span>
                        {text.length > 30 ? `${text.substring(0, 25)}...` : text}
                    </span>)} />
                <Column title="Category" dataIndex="categoryId" key="categoryId" render={(text, record) => {
                    const category = categories.find(category => category.id === record.categoryId);
                    return category ? category.nameCategory : '';}} />
                <Column title="Duration" dataIndex="duration" key="duration" />
                <Column title="VIP" dataIndex="vip" key="vip" />
                <Column
                    title="Describe"
                    dataIndex="describe"
                    key="describe"
                    render={(text) => (
                        <span>
                            {text.length > 50 ? `${text.substring(0, 18)}...` : text}
                        </span>
                    )}/>
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
                visible={visible}
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
                        <Select>
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
                        rules={[{ required: true, message: 'Please select the vip of the movie!' }]}>
                        <Select>
                            {vip.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
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
                        <Image src={previewImg ? previewImg : 'https://firebasestorage.googleapis.com/v0/b/vam3d-15169.appspot.com/o/logo%2Flogoglx.svg?alt=media&token=496963e3-c862-4a5b-bd84-506ab09352ac'} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Movies;

import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Col, Space, Row, message, Select } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextMovies } from '../../../context/MoviesContext';

const { Column } = Table;
const { Option } = Select;

function Episodes() {
    const [form] = Form.useForm();
    const [episodes, setEpisodes] = useState([]);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [episodeEdit, setEpisodeEdit] = useState(null);
    const movies = useContext(ContextMovies);

    useEffect(() => {
        const fetchData = async () => {
            const episodesData = await fetchDocuments('Episodes');
            setEpisodes(episodesData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setEpisodeEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (episodeEdit) {
                await updateDocument('Episodes', episodeEdit.id, values);
                message.success('Episode updated successfully!');
            } else {
                await addDocument('Episodes', values);
                message.success('Episode added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save episode. Please try again.');
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue({
            movieId: record.movieId,
            episodeNumber: record.episodeNumber,
            URLmovie: record.URLmovie,
        });
        setEpisodeEdit(record);
        setVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this episode?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Episodes', record.id);
                    setUpdate((prevUpdate) => !prevUpdate);
                    message.success('Episode deleted successfully!');
                } catch (error) {
                    message.error('Failed to delete episode. Please try again.');
                }
            },
        });
    };

    return (
        <>
            <Row gutter={16} align="middle">
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <h3>List Episodes</h3>
                </Col>
                <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                    <Input.Search
                        placeholder="Search episodes"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Episode
                    </Button>
                </Col>
            </Row>
            <Table dataSource={episodes} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column
                    title="Movie Name"
                    render={(text, record) => {
                        const movie = movies.find(movie => movie.id === record.movieId);
                        return movie ? movie.nameMovie : '';
                    }}
                    key="movieName"
                />
                <Column title="Episode Number" dataIndex="episodeNumber" key="episodeNumber" />
                <Column title="Movie URL" dataIndex="URLmovie" key="URLmovie" />
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
                title={episodeEdit ? "Edit Episode" : "Add Episode"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Movie"
                        name="movieId"
                        rules={[{ required: true, message: 'Please select the movie of the episode!' }]}
                    >
                        <Select>
                            {movies.map(movie => (
                                <Option key={movie.id} value={movie.id}>
                                    {movie.nameMovie}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Episode Number"
                        name="episodeNumber"
                        rules={[{ required: true, message: 'Please enter the episode number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Movie URL"
                        name="URLmovie"
                        rules={[{ required: true, message: 'Please enter the movie URL!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Episodes;

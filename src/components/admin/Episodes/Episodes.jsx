import React, { useState, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Col, Space, Row, message, Select } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextMovies } from '../../../context/MoviesContext';
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from "../../../utils/Contants";
import { ContextEpisodes } from "../../../context/ContextEpisodes";
import emailjs from 'emailjs-com';
const { Column } = Table;
const { Option } = Select;

function Episodes() {
    const [form] = Form.useForm();
    const episodes = useContext(ContextEpisodes);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [episodeEdit, setEpisodeEdit] = useState(null);
    const movies = useContext(ContextMovies);
    const favorites = useContext(ContextFavorites);
    const [searchTerm, setSearchTerm] = useState('');  // New state to store the search term

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
                sendEmail(values);  // Send email after adding a new episode
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save episode. Please try again.');
        }
    };

    const sendEmail = (episodeData) => {
        const movie = movies.find(movie => movie.id === episodeData.movieId);

        if (!movie) {
            message.error("Movie not found!");
            return;
        }

        const favoritesByUser = favorites.filter(fav => fav.movieId === movie.id);

        if (favoritesByUser.length === 0) {
            message.info('No users have favorited this movie.');
            return;
        }

        favoritesByUser.forEach(fav => {
            const templateParams = {
                movie_name: movie.nameMovie,
                episode_number: episodeData.episodeNumber,
                url_movie: episodeData.URLmovie,
                to_email: fav.userId,  // User email
            };
            emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_USER_ID)
                .then((response) => {
                    console.log(`Email sent successfully to ${fav.userId}!`);
                }, (error) => {
                    console.error(`Failed to send email to ${fav.userId}:`, error);
                });
        });

        message.success('Emails are being sent to all users who favorited this movie.');
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

    // Filter episodes based on the search term
    const filteredEpisodes = episodes.filter((episode) => {
        const movie = movies.find(movie => movie.id === episode.movieId);
        return movie && movie.nameMovie.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Episode
                    </Button>
                </Col>
            </Row>
            <Table dataSource={filteredEpisodes} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
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

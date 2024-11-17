import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Col, Space, message, Row } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextMovies } from '../../../context/MoviesContext';
import { ContextCustomers } from "../../../context/CustomersContext";
import  {  ContextComments } from "../../../context/CommentsProvider";
const { Column } = Table;
function Comments() {
    const [form] = Form.useForm();
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [commentEdit, setCommentEdit] = useState(null);
    const movies = useContext(ContextMovies);
    const customers = useContext(ContextCustomers);
    const comments = useContext(ContextComments);
    const [searchTerm, setSearchTerm] = useState(''); 
    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setCommentEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (commentEdit) {
                await updateDocument('Comments', commentEdit.id, values);
                message.success('Comment updated successfully!');
            } else {
                await addDocument('Comments', values);
                message.success('Comment added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save comment. Please try again.');
        }
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this comment?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Comments', record.id);
                    setUpdate((prevUpdate) => !prevUpdate);
                } catch (error) {
                    message.error('Failed to delete comment. Please try again.');
                }
            },
        });
    };
// Filter comments based on search term
const filteredComments = comments.filter(comment => {
    const customer = customers.find(customer => customer.id === comment.idCustomer);
    const username = customer ? customer.username.toLowerCase() : '';
    const content = comment.content.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return content.includes(searchLower) || username.includes(searchLower);
});

    return (
        <>
            <Row gutter={16} align="middle">
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <h3>List Comments</h3>
                </Col>
                <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                    <Input.Search
                        placeholder="Search comments"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Comment
                    </Button>
                </Col>
            </Row>
            <Table dataSource={filteredComments} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column title="Content" dataIndex="content" key="content" />
                <Column
                    title="Created At"
                    dataIndex="createdAt"
                    key="createdAt"
                    render={(text, record) => {
                        const date = new Date(record.createdAt.seconds * 1000); // Nếu createdAt là Firestore Timestamp
                        return date.toLocaleString(); // Hiển thị theo định dạng thời gian của hệ thống
                    }}
                />
                <Column
                    title="Customer Name"
                    dataIndex="idCustomer"
                    key="idCustomer"
                    render={(text, record) => {
                        const customer = customers.find(customer => customer.id === record.idCustomer);
                        return customer ? customer.username : 'Unknown';
                    }}
                />
                <Column
                    title="Movie Name"
                    dataIndex="idMovie"
                    key="idMovie"
                    render={(text, record) => {
                        const movie = movies.find(movie => movie.id === record.idMovie);
                        return movie ? movie.nameMovie : 'Unknown';
                    }}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: "white" }} onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                        </Space>
                    )}
                />
            </Table>
            <Modal
                title={commentEdit ? "Edit Comment" : "Add Comment"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the content!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Created At"
                        name="createdAt"
                        rules={[{ required: true, message: 'Please enter the creation date!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Customer ID"
                        name="idCustomer"
                        rules={[{ required: true, message: 'Please enter the customer ID!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Movie ID"
                        name="idMovie"
                        rules={[{ required: true, message: 'Please enter the movie ID!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Comments;

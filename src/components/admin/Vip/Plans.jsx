import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
const { Column } = Table;

function Plans() {
    const [form] = Form.useForm();
    const [plans, setPlans] = useState([]);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [planEdit, setPlanEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const plansData = await fetchDocuments('Plans');
            setPlans(plansData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields(); // Reset the form fields when the modal is closed
        setPlanEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (planEdit) {
                await updateDocument('Plans', planEdit.id, values);
                message.success('Plan updated successfully!');
            } else {
                await addDocument('Plans', values);
                message.success('Plan added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save plan. Please try again.');
        }
    };

    const handleEdit = async (record) => {
        // Display the modal with the selected plan's information
        form.setFieldsValue({
            title: record.title,
            pricePerMonth: record.pricePerMonth,
            level: record.level,
        });
        setPlanEdit(record);
        setVisible(true);
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this plan?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Plans', record.id);
                    setUpdate((prevUpdate) => !prevUpdate);
                } catch (error) {
                    message.error('Failed to delete plan. Please try again.');
                }
            },
        });
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>List Plans</h3>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                    Add Plan
                </Button>
            </div>
            <Table dataSource={plans} pagination={{ pageSize: 5 }} rowKey="id">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Price Per Month" dataIndex="pricePerMonth" key="pricePerMonth" />
                <Column title="Level" dataIndex="level" key="level" />
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
                title={planEdit ? "Edit Plan" : "Add Plan"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the title of the plan!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price Per Month"
                        name="pricePerMonth"
                        rules={[{ required: true, message: 'Please enter the price per month!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: 'Please enter the level!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Plans;

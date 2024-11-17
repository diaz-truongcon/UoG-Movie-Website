import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Select, Radio, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextPlans } from '../../../context/PlansContext'; // Assuming PlansContext is available
const { Column } = Table;
const { Option } = Select;

function Features() {
    const [form] = Form.useForm();
    const [features, setFeatures] = useState([]);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [featureEdit, setFeatureEdit] = useState(null);
    const plans  = useContext(ContextPlans); // Fetching plans from context
    
    useEffect(() => {
        const fetchData = async () => {
            const featuresData = await fetchDocuments('Features');
            setFeatures(featuresData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setFeatureEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (featureEdit) {
                await updateDocument('Features', featureEdit.id, values);
                message.success('Feature updated successfully!');
            } else {
                await addDocument('Features', values);
                message.success('Feature added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save feature. Please try again.');
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue({
            idPlan: record.idPlan,
            text: record.text,
            available: record.available,
        });
        setFeatureEdit(record);
        setVisible(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this item?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await deleteDocument('Features', record.id);
                    setUpdate((prevUpdate) => !prevUpdate);
                } catch (error) {
                    message.error('Failed to delete feature. Please try again.');
                }
            },
        });
    };

    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                    Add Feature
                </Button>
            </div>
            <Table dataSource={features} pagination={{ pageSize: 5 }}>
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column title="Plan" dataIndex="idPlan" key="idPlan" render={(idPlan) => plans.find(plan => plan.id === idPlan)?.title || "Unknown"} />
                <Column title="Text" dataIndex="text" key="text" />
                <Column title="Available" dataIndex="available" key="available" render={(available) => (available ? "Yes" : "No")} />
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

            {/* Modal for Adding/Editing Features */}
            <Modal
                title={featureEdit ? "Edit Feature" : "Add Feature"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Plan"
                        name="idPlan"
                        rules={[{ required: true, message: 'Please select a plan!' }]}
                    >
                        <Select placeholder="Select a plan">
                            {plans.map(plan => (
                                <Option key={plan.id} value={plan.id}>{plan.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Text"
                        name="text"
                        rules={[{ required: true, message: 'Please enter feature text!' }]}
                    >
                        <Input placeholder="Enter feature description" />
                    </Form.Item>
                    <Form.Item
                        label="Available"
                        name="available"
                        rules={[{ required: true, message: 'Please select availability!' }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Features;

import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../Service/FirebaseService";
import { ContextPlans } from '../../../context/PlansContext'; // Assumes there's a context for Plans
const { Column } = Table;
const { Option } = Select;

function Packages() {
    const [form] = Form.useForm();
    const [packages, setPackages] = useState([]);
    const [update, setUpdate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [packageEdit, setPackageEdit] = useState(null);
    const plans = useContext(ContextPlans); // Fetch plans from context
    useEffect(() => {
        const fetchData = async () => {
            const packagesData = await fetchDocuments('Packages');
            setPackages(packagesData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setPackageEdit(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (packageEdit) {
                await updateDocument('Packages', packageEdit.id, values);
                message.success('Package updated successfully!');
            } else {
                await addDocument('Packages', values);
                message.success('Package added successfully!');
            }
            setUpdate(!update);
            handleCancel();
        } catch (error) {
            message.error('Failed to save package. Please try again.');
        }
    };

    const handleEdit = async (record) => {
        form.setFieldsValue({
            idPlan: record.idPlan,
            time: record.time,
            discount: record.discount,
        });
        setPackageEdit(record);
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
                    await deleteDocument('Packages', record.id);
                    setUpdate((prevUpdate) => !prevUpdate);
                } catch (error) {
                    message.error('Failed to delete package. Please try again.');
                }
            },
        });
    };

    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                    Add Package
                </Button>
            </div>
            <Table dataSource={packages} pagination={{ pageSize: 5 }}>
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column title="Plan" dataIndex="idPlan" key="idPlan" render={(idPlan) => plans.find(plan => plan.id === idPlan)?.title || "Unknown"} />
                <Column title="Time (Months)" dataIndex="time" key="time" />
                <Column title="Discount (%)" dataIndex="discount" key="discount" />
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
                title={packageEdit ? "Edit Package" : "Add Package"}
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
                        label="Time (Months)"
                        name="time"
                        rules={[{ required: true, message: 'Please enter the duration!' }]}
                    >
                        <Input type="number" min={1} placeholder="Enter time in months" />
                    </Form.Item>
                    <Form.Item
                        label="Discount (%)"
                        name="discount"
                        rules={[{ required: true, message: 'Please enter the discount!' }]}
                    >
                        <Input type="number" min={0} max={100} placeholder="Enter discount in percentage" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Packages;

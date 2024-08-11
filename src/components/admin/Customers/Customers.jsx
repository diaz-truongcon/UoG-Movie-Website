import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Col, Space, Image, Row, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
const { Column } = Table;

function Customers(props) {
    const [visible, setVisible] = useState(false);
    const [customers,setCustomers] = useState([]);
    const customersCollectionRef = collection(db, "Customers");
    const [update, setUpdate] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(customersCollectionRef);
            const customersData = [];
            querySnapshot.forEach((doc) => {
                customersData.push({ id: doc.id, ...doc.data() });
            });
            setCustomers(customersData);
        };
        fetchData();
    }, [update]);

    const showModal = () => {
        setVisible(true);
    };

    return (
        <div>
            <Row gutter={16} align="middle">
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <h3>List Customers</h3>
                </Col>
                <Col xs={24} md={12} xl={12} style={{ marginTop: "1em" }}>
                    <Input.Search
                        placeholder="Search customer"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                    />
                </Col>
                <Col xs={24} md={6} xl={6} style={{ marginTop: "1em" }}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ width: '100%' }}>
                        Add Customer
                    </Button>
                </Col>
            </Row>
            <Table dataSource={customers} pagination={{ pageSize: 5 }} style={{ marginTop: "1rem" }} className="responsive-table">
                <Column title="#" render={(text, record, index) => index + 1} key="index" />
                <Column
                    title="Avatar"
                    key="imgAvatar"
                    render={(text, record) => (
                        <Image width={50} src={record.img} />
                    )}
                />
                <Column title="Name Customer" dataIndex="name"/>
                <Column title="Email" dataIndex="email"/>
                <Column title="Role" render={(text, record) => (
                        record.role == 1 ? "Admin" : "Khách hàng"
                    )}/>
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button type="primary" ><EditOutlined /></Button>
                            <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: "white" }} ><DeleteOutlined /></Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default Customers;
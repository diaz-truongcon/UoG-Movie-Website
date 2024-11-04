import React, { useContext } from 'react';
import { Table, Tag } from 'antd';
import { ContextSubscriptions } from "../../../context/SubscriptionsProvider";
import { formatFirebaseTimestamp, calculateRemainingDays } from "../../../utils/ContantsFunctions";
import { ContextPlans } from "../../../context/PlansContext";
function DeviceManagement() {
    const userSubscriptions = useContext(ContextSubscriptions);
    const plans = useContext(ContextPlans);
    const columns = [
        {
            title: '#',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
            render: (planId) => {
                // Find the plan in the plans array by matching the ID
                const plan = plans.find(p => p.id === planId);
                return plan ? plan.title : 'N/A'; // Display the name if found, otherwise 'N/A'
            },
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (startDate) => formatFirebaseTimestamp(startDate),
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (expiryDate) => formatFirebaseTimestamp(expiryDate),
        },
        {
            title: 'Price (VND)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Status',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (expiryDate) => (
                <Tag color={calculateRemainingDays(formatFirebaseTimestamp(expiryDate)) > 0 ? 'green' : 'volcano'}>
                    {calculateRemainingDays(formatFirebaseTimestamp(expiryDate)) > 0 ? "Active" : 'Expired'}
                </Tag>
            ),
        },
    ];

    // Ensure that each subscription has a unique `key` for React
    const dataSourceWithKeys = userSubscriptions.map((item, index) => ({
        ...item,
        key: item.id || index, // `id` is preferred if it exists, otherwise use the index as a fallback.
    }));

    return (
        <div style={{ margin: '20px', flex: "1" }}>
            <h1 style={{ textAlign:"center",padding:"15px"}}>User Subscription Management</h1>
            <Table dataSource={dataSourceWithKeys} columns={columns} bordered />
        </div>
    );
}

export default DeviceManagement;

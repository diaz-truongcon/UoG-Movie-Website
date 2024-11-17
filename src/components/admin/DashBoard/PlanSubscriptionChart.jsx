import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Select, Row, Col } from 'antd';
import { getSubscriptionsByMonthAndYear } from "../../../Service/PlanService";
import { ContextPlans } from '../../../context/PlansContext';
import { COLORS } from '../../../utils/Contants';

const { Option } = Select;

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { planName, subscriptionCount } = payload[0].payload; // Extracting the correct properties
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <p style={{ color: payload[0].fill }}>Gói: {planName}</p>
        <p>Số lượng: {subscriptionCount}</p> {/* Updated to show subscriptionCount */}
      </div>
    );
  }
  return null;
};
// Custom Legend Component
const CustomLegend = ({ payload }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0, display: "flex" ,justifyContent:"space-evenly" }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ backgroundColor: entry.color, borderRadius: '50%', width: 12, height: 12, display: 'inline-block', marginRight: 5 }} />
          <span>Gói:{entry.payload.planName}</span> {/* Displaying the plan name with "Gói:" prefix */}
        </li>
      ))}
    </ul>
  );
}

const PlanSubscriptionChart = () => {
  const [data, setData] = useState([]);
  const plans = useContext(ContextPlans);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns a value from 0 to 11
  const currentYear = currentDate.getFullYear(); // Get current year

  // Initialize state with current month and year
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscriptionsByMonthAndYear(selectedMonth, selectedYear);

        // Combine with the plans table to create the final result
        const result = plans.map(plan => ({
          planId: plan.id,
          planName: plan.title,
          subscriptionCount: 0,
        }));

        // Count the number of subscriptions for each plan
        subscriptions.forEach(subscription => {
          const planId = subscription.data.plan; // Assuming plan ID is stored here
          const planIndex = result.findIndex(r => r.planId === planId);
          if (planIndex >= 0) {
            result[planIndex].subscriptionCount++;
          }
        });

        // Filter out plans with zero subscriptions
        const filteredResult = result.filter(item => item.subscriptionCount > 0);
        setData(filteredResult);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    // Call the async function only if plans is not empty
    if (plans.length > 0) {
      fetchSubscriptions();
    }
  }, [selectedYear, selectedMonth, plans]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
    console.log("Selected Year:", value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    console.log("Selected Month:", value);
  };

  const yearOptions = [2022, 2023, 2024].map((year) => (
    <Option key={year} value={year}>{year}</Option>
  ));

  const monthOptions = Array.from({ length: 12 }, (_, i) => (
    <Option key={i + 1} value={i + 1}>
      Mon {i + 1}
    </Option>
  ));

  return (
    <Card
      title={
        <Row align="middle" gutter={8} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col>
            Số lượng người đăng ký theo gói
          </Col>
          <Col>
            <Select
              placeholder="Month"
              onChange={handleMonthChange}
              style={{ width: 100 }}
              value={selectedMonth}
            >
              {monthOptions}
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Year"
              onChange={handleYearChange}
              style={{ width: 100 }}
              value={selectedYear}
            >
              {yearOptions}
            </Select>
          </Col>
        </Row>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ planName, percent }) => `${planName}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="subscriptionCount" // Use subscriptionCount as the data key
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PlanSubscriptionChart;

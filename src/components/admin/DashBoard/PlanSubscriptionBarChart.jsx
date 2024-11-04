import React, { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, Select, Row, Col } from 'antd';
import { getSubscriptionsByMonthAndYear } from "../../../Service/FirebaseService";
import { ContextPlans } from '../../../context/PlansContext';
import { COLORS } from '../../../utils/Contants';
const { Option } = Select;

// Conversion rate (you might fetch this from an API or use a constant for simplicity)
const exchangeRateToUSD = 0.000042; // example conversion rate from VND to USD

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { planName, totalPriceUSD } = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <p style={{ color: payload[0].fill }}>Gói: {planName}</p>
        <p>Total: ${totalPriceUSD.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'space-evenly' }}>
      {data.map((entry, index) => (
        <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              backgroundColor: COLORS[index % COLORS.length], // Use COLORS array for consistent color
              borderRadius: '50%',
              width: 12,
              height: 12,
              display: 'inline-block',
              marginRight: 5,
            }}
          />
          <span>Gói: {entry.planName}</span>
        </li>
      ))}
    </ul>
  );
};


const PlanSubscriptionBarChart = () => {
  const [data, setData] = useState([]);
  const plans = useContext(ContextPlans);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscriptionsByMonthAndYear(selectedMonth, selectedYear);

        const result = plans.map(plan => ({
          planId: plan.id,
          planName: plan.title,
          totalPrice: 0,
          totalPriceUSD: 0,
        }));

        subscriptions.forEach(subscription => {
          const planId = subscription.data.plan;
          const planIndex = result.findIndex(r => r.planId === planId);
          if (planIndex >= 0) {
            result[planIndex].totalPrice += subscription.data.price;
            result[planIndex].totalPriceUSD = result[planIndex].totalPrice * exchangeRateToUSD;
          }
        });

        const filteredResult = result.filter(item => item.totalPriceUSD > 0);
        setData(filteredResult);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

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
            Tổng tiền gói đăng ký (USD)
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
        <BarChart data={data}>
          <XAxis dataKey="planName" />
          <YAxis />
          <Bar dataKey="totalPriceUSD" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend data={data} />} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PlanSubscriptionBarChart;

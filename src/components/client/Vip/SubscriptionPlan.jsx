import React, { useState, useContext } from 'react';
import { Card, Radio, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined } from "@ant-design/icons";
import { ContextPlans } from '../../../context/PlansContext';
import { ContextFeatures } from '../../../context/ContextFeatures';
import { getPackagesByPlan } from "../../../Service/FirebaseService";

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store selected plan
  const plans = useContext(ContextPlans);
  const features = useContext(ContextFeatures);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan); // Set the entire plan object, not just the title
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgb(242, 242, 242)' }}>
      <h2 style={{ textAlign: 'center', padding: '50px', marginTop: '50px' }}>Chọn gói Galaxy Play</h2>
      <Radio.Group value={selectedPlan?.title}> {/* Use selectedPlan?.title to avoid errors */}
        <Row gutter={16}>
          {plans && plans.map((plan, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
                <Card
                  style={{
                    paddingTop: '30px',
                    cursor: 'pointer',
                    backgroundColor: selectedPlan?.title === plan.title ? '#e6f7ff' : '#fff', // Change background when selected
                    boxShadow: selectedPlan?.title === plan.title ? '0 4px 8px rgba(0, 123, 255, 0.2)' : 'none', // Add shadow when selected
                    transition: 'all 0.3s ease-in-out', // Smooth transition effect
                  }}
                  onClick={() => handleSelectPlan(plan)} // Set the whole plan object
                  title={
                    <>
                      {plan.title} <br />{plan.pricePerMonth}/month
                    </>
                  }
                >
                  <ul>
                    {features
                      .filter(feature => feature.idPlan === plan.id) // Filter features by the plan id
                      .map((feature, i) => (
                        <li key={i} style={{ color: feature.available ? 'black' : 'red' }}>
                          {feature.available ? <span style={{ color: "blue" }}><CheckOutlined /></span> : '❌'} {feature.text}
                        </li>
                      ))}
                  </ul>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Radio.Group>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to={`/paymentpage/${selectedPlan?.id}`}> {/* Use selectedPlan?.id to safely access the id */}
          <Button
            type="primary"
            size="large"
            disabled={!selectedPlan} // Disable button if no plan is selected
          >
            Tiếp tục
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionPlan;

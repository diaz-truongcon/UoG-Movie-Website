import React, { useState, useContext, useEffect } from 'react';
import { Card, Radio, Button, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined } from "@ant-design/icons";
import { ContextPlans } from '../../../context/PlansContext';
import { ContextFeatures } from '../../../context/ContextFeatures';
import { getPlansByUser } from "../../../Service/PlanService";
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store selected plan
  const plans = useContext(ContextPlans);
  const features = useContext(ContextFeatures);
  const { isLoggedIn } = useContext(CustomerLoginContext); 

  const handleSelectPlan = async (plan) => {
    const userLevel = await getPlansByUser(isLoggedIn.id,plans);
  // trả về level đăng ký hiện tại của người dùng
    if ( userLevel == 0) {
      // If the user has no subscription plan
      setSelectedPlan(plan);
    } else { 
      const newPlanLevel = plan.level;

      if (newPlanLevel < userLevel) {
        message.error("Gói đăng ký mới có mức thấp hơn gói hiện tại.");
      } else if (newPlanLevel === userLevel) {
        message.error("Bạn đang sử dụng gói này.");
      } else {
        // If the new plan is higher than the current plan
        setSelectedPlan(plan);
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgb(242, 242, 242)' }}>
      <h2 style={{ textAlign: 'center', padding: '50px', marginTop: '50px' }}>Chọn gói Galaxy Play</h2>
      <Radio.Group value={selectedPlan?.title}>
        <Row gutter={16}>
          {plans && plans.sort((a, b) => a.level - b.level).map((plan, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
                <Card
                  style={{
                    paddingTop: '30px',
                    cursor: 'pointer',
                    backgroundColor: selectedPlan?.title === plan.title ? '#e6f7ff' : '#fff',
                    boxShadow: selectedPlan?.title === plan.title ? '0 4px 8px rgba(0, 123, 255, 0.2)' : 'none',
                    transition: 'all 0.3s ease-in-out',
                  }}
                  onClick={() => handleSelectPlan(plan)}
                  title={
                    <>
                      {plan.title} <br />{plan.pricePerMonth}/month
                    </>
                  }
                >
                  <ul>
                    {features
                      .filter(feature => feature.idPlan === plan.id)
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
        <Link to={`/paymentpage/${selectedPlan?.id}`}>
          <Button
            type="primary"
            size="large"
            disabled={!selectedPlan}
          >
            Tiếp tục
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionPlan;

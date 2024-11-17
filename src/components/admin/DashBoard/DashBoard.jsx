import React from 'react';
import { Row, Col, Card } from 'antd';
import PlanSubscriptionChart from './PlanSubscriptionChart';
import ListTop from '../../client/Favorite/ListTop';
import { getTopViewedMovies, getTopLikedMovies } from '../../../utils/ContantsFunctions';
import PlanSubscriptionBarChart from './PlanSubscriptionBarChart';
const DashBoard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]} >
                <Col sm={24} md={24} lg={12}>
                    <PlanSubscriptionChart />
                </Col>
                <Col sm={24} md={24} lg={12}>
                    <PlanSubscriptionBarChart />
                </Col>
            </Row>
            <Row className='card-top' gutter={[16, 16]} justify="center" style={{ marginTop: "20px" }}>
                <Col sm={24} md={12} lg={12}>
                    <Card
                        title={<span style={{ color: "white" }}>TOP LƯỢT XEM</span>}
                        bordered={false}
                        style={{ background: "black" }}
                    >
                        <ListTop data={getTopViewedMovies(5)} type={"views"} />
                    </Card>
                </Col>
                <Col sm={24} md={12} lg={12}>
                    <Card
                        title={<span style={{ color: "white" }}>TOP YÊU THÍCH</span>}
                        bordered={false}
                        style={{ background: "black" }}
                    >
                        <ListTop data={getTopLikedMovies(5)} type={"likes"} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashBoard;

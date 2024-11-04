import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const FAQ = () => {
  const data = [
    {
      title: "PAYMENT METHOD",
      content: [
        "Does Beta Movie have a scratch card payment service?",
        "What payment methods are currently available on Beta Movie?",
        "Once I have registered for the GV119 package, will I be charged when watching Beta Movie via 3G/4G?",
        "Will the GV119 package automatically renew?",
      ],
      link: "More",
    },
    {
      title: "BETA MOVIE INFORMATION",
      content: [
        "What is Beta Movie?",
        "What are the product categories of Beta Movie?",
        "What devices can Beta Movie be viewed on?",
        "What is a Movie Rental?",
        "What is a Movie Package?",
      ],
      link: "More",
    },
    {
      title: "OTHER FREQUENTLY ASKED QUESTIONS",
      content: [
        "How many devices can I log in and watch on with a Beta account?",
        "Is there a limit to the number of movies I can download?",
        "Can I download the movie after renting it in the Premium Movies section?",
        "Can I watch movies that have been downloaded for a certain amount of time?",
      ],
      link: "More",
    },
    {
      title: "SERVICE PACKAGES AT BETA MOVIE",
      content: [
        "What is a VIP package?",
        "How can I register for a VIP package?",
        "Can the SVIP package be used with other MobiFone data packages?",
        "I have registered for the SVIP package, can my account be used on other devices?",
        "What is a VVIP package?",
      ],
      link: "More",
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fcontact.png?alt=media&token=d9151e7f-5e66-4449-b3d4-e5b5ff528873')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Row justify="center">
          <Col span={24}>
            <Title level={2} style={{ color: '#fff' }}>
              PAYMENT METHOD
            </Title>
            <Text style={{ fontSize: '16px', color: '#fff' }}>
              Support to solve problems during the use of Beta Movie Service
            </Text>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Row justify="center" align="middle">
              <Col span={12} style={{ textAlign: 'center' }}>
                <MailOutlined style={{ fontSize: '24px', color: '#fff' }} />
                <Text style={{ fontSize: '16px', color: '#fff', marginLeft: '8px' }}>
                  Email: truongcon.work.77@gmail.com
                </Text>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <PhoneOutlined style={{ fontSize: '24px', color: '#fff' }} />
                <Text style={{ fontSize: '16px', color: '#fff', marginLeft: '8px' }}>
                  Hotline: 097131123X
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ background: "#f5f5f5", padding: "40px" }}>
        <h2 style={{ textAlign: 'center', marginBottom: "20px" }}>Frequently Asked Questions</h2>
        <Row gutter={[16, 16]} justify="center">
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card title={item.title} bordered={false}>
                <ul>
                  {item.content.map((question, i) => (
                    <li key={i}>{question}</li>
                  ))}
                </ul>
                <a href="/#">{item.link}</a>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </div>
  );
};

export default FAQ;

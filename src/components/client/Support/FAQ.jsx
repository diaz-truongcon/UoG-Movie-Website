import React from 'react';
import { Row, Col, Card,Typography } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const FAQ = () => {
  const data = [
    {
      title: "PHƯƠNG THỨC THANH TOÁN",
      content: [
        "Galaxy Play có dịch vụ thanh toán qua thẻ cào không?",
        "Trên Galaxy Play hiện nay có những phương thức thanh toán nào đang áp dụng?",
        "Khi đã đăng ký gói F10 (MobiFone), tôi có bị trừ cước khi xem Galaxy Play bằng 3G/4G không?",
        "Gói F10 có tự động gia hạn hay không?",
        "Tôi không muốn sử dụng gói F10 nữa thì hủy như thế nào?",
      ],
      link: "Xem thêm",
    },
    {
      title: "THÔNG TIN GALAXY PLAY",
      content: [
        "Galaxy Play là gì?",
        "Galaxy Play có những danh mục sản phẩm nào?",
        "Galaxy Play có thể xem trên thiết bị nào?",
        "Phim Thuê là gì?",
        "Phim Theo Gói là gì?",
      ],
      link: "Xem thêm",
    },
    {
      title: "CÂU HỎI THƯỜNG GẶP",
      content: [
        "Tài khoản Galaxy Play có thể đăng nhập và xem được bao nhiêu thiết bị?",
        "Có bị giới hạn số lượng phim tải về hay không?",
        "Sau khi thuê phim trong mục Phim Có Phí, tôi có thể tải về phim về được không?",
        "Làm thế nào để hủy tài khoản?",
        "Tôi có thể xem các phim đã tải về đủ ngày hay không?",
      ],
      link: "Xem thêm",
    },
    {
      title: "GÓI DỊCH VỤ",
      content: [
        "Gói FIM30 là gì?",
        "Tôi có thể đăng ký gói FIM30 như thế nào?",
        "Gói FIM30 có thể sử dụng kèm theo các gói data khác của MobiFone hay không?",
        "Tôi đã đăng ký gói FIM30, tài khoản của tôi có thể được dùng trên các thiết bị khác không?",
        "Gói FIM2 là gì?",
      ],
      link: "Xem thêm",
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div
      style={{
        backgroundImage: `url('https://galaxyplay.vn/static/fp_assets/img/SupportPageBackground.png')`,
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
            Khách hàng cần chúng tôi hỗ trợ?
          </Title>
          <Text style={{ fontSize: '16px', color: '#fff' }}>
            Hỗ trợ giải đáp các vấn đề trong quá trình sử dụng Dịch vụ Galaxy Play.
          </Text>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Row justify="center" align="middle">
            <Col span={12} style={{ textAlign: 'center' }}>
              <MailOutlined style={{ fontSize: '24px', color: '#fff' }} />
              <Text style={{ fontSize: '16px', color: '#fff', marginLeft: '8px' }}>
                Email: play@galaxy.com.vn
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <PhoneOutlined style={{ fontSize: '24px', color: '#fff' }} />
              <Text style={{ fontSize: '16px', color: '#fff', marginLeft: '8px' }}>
                Hotline: 19008675
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    <div style={{background:"#f5f5f5", padding:"40px"}}>
    <h2 style={{ textAlign: 'center',marginBottom:"20px" }}>Các câu hỏi thường gặp</h2>
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

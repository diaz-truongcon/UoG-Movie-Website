import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined, AppleOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <div className='footer' style={{ backgroundColor: "#101010", color: 'white', marginTop: "50px",borderTop: "5px solid #1f2325" }}>
            <Row justify="space-around">
                {/* Laptop Layout: 3 equal columns */}
                <Col xs={24} md={24} xl={8}>
                    <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <img
                            src="https://assets.glxplay.io/web/images/logoglx.svg"  // Replace with your actual logo URL
                            alt="Galaxy Play Logo"
                            style={{ width: '150px', marginBottom: '10px' }}
                        />
                        <p>
                            Galaxy Play is a service provided by Galaxy Play Corporation, a member of Galaxy Entertainment and Education Corporation (GEE.,JSC).
                        </p>
                        <p>
                            Address: 59 Vo Nguyen Giap, Thao Dien Ward, Thu Duc City, Ho Chi Minh City, Vietnam.
                        </p>
                        <p>
                            Business Registration Number: 0106539659.
                        </p>
                        <p>
                            Date of Business Registration: 15/5/2014.
                        </p>
                        <p>
                            Place of Registration: Hanoi Department of Planning and Investment.
                        </p>
                    </div>
                </Col>

                <Col xs={24} md={16} xl={8}>
                    <div className='footer-introduce' style={{ display: 'flex', alignItems: "center", height: "100%", justifyContent: "space-around", marginTop: "1em" }}>
                        <div >
                            <h2>GIỚI THIỆU</h2>
                            <p>Quy chế sử dụng Dịch vụ</p>
                            <p>Chính sách bảo mật</p>
                            <p>Khuyến mãi</p>
                        </div>
                        <div >
                            <h2>HỖ TRỢ</h2>
                            <p>1900 8675 (24/7)</p>
                            <p>play@galaxy.com.vn</p>
                            <p><a href="https://galaxyplay.vn/help" style={{ color: 'white' }}>https://galaxyplay.vn/help</a></p>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={8} xl={8}>
                    <div style={{ display: 'flex', alignItems: "center", height: "100%", marginTop: "2.5em" }}>
                        {/* Images */}
                        <div>
                        <h2>TẢI ỨNG DỤNG</h2>
                        <div className='application' style={{marginTop:"1em"}}>                   
                            <div>
                                <img
                                    src="https://assets.glxplay.io/web/responsive/w200/android-app-download-button.png"  // Replace with your actual image URL
                                    alt="App Image 1"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://assets.glxplay.io/web/responsive/w200/ios-app-download-button.png"  // Replace with your actual image URL
                                    alt="App Image 2"
                                />
                            </div>
                        </div>
                        {/* Social Icons */}
                        <div>
                            <h2>KẾT NỐI VỚI CHÚNG TÔI</h2>
                            <div style={{ fontSize: '24px', display: 'flex', justifyContent: "space-between",marginTop: "0.5em" }}>
                                <FacebookOutlined style={{ color: 'white' }} />
                                <InstagramOutlined style={{ color: 'white' }} />
                                <YoutubeOutlined style={{ color: 'white' }} />
                                <TwitterOutlined style={{ color: 'white' }} />
                                <AppleOutlined style={{ color: 'white' }} />
                            </div>
                        </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;

import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined, AppleOutlined } from '@ant-design/icons';
import logo from "../../../assets/logo.png";
const Footer = () => {
    return (
        <div className='footer' style={{ backgroundColor: "#101010", color: 'white', marginTop: "50px",borderTop: "5px solid #1f2325" }}>
            <Row justify="space-around">
                {/* Laptop Layout: 3 equal columns */}
                <Col xs={24} md={24} xl={8}>
                    <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <img
                            src={logo}  // Replace with your actual logo URL
                            alt="Beta Logo"
                            style={{ width: '100px' }}
                        />
                        <p style={{margin:"0"}}>
                        Beta Movie is a service provided by Beta Group
                        </p>
                        <p>
                        Address: 1658 Ngo Quyen, An Hai Bac, Son Tra, Da Nang, Vietnam.
                        </p>
                        <p>
                        Business registration number: 01065XXXX.
                        </p>
                        <p>
                        Date of business registration number issuance: 1X/ 1X/ 202X.
                        </p>
                        <p>
                        Place of issuance: Department of Planning and Investment, Da Nang.
                        </p>
                    </div>
                </Col>

                <Col xs={24} md={16} xl={8}>
                    <div className='footer-introduce' style={{ display: 'flex', alignItems: "center", height: "100%", justifyContent: "space-around", marginTop: "1em" }}>
                        <div >
                            <h2>ABOUT BETA MOVIE</h2>
                            <p>Terms of Service</p>
                            <p>Privacy Policy</p>
                            <p>Promotions</p>
                        </div>
                        <div >
                            <h2>SUPPORT</h2>
                            <p>097131123X</p>
                            <p>truongcon.work77@gmail.com</p>
                            <p><a href="#" style={{ color: 'white' }}>https://beta.vn/help</a></p>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={8} xl={8}>
                    <div style={{ display: 'flex', alignItems: "center", height: "100%", marginTop: "2.5em" }}>
                        {/* Images */}
                        <div>
                        <h2>DOWNLOAD APP</h2>
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
                            <h2>CONNECT WITH US VIA</h2>
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

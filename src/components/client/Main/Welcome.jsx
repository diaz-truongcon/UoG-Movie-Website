import React from 'react';
import { Row, Col, Image, Button, Typography, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;
function Welcome(props) {
    return (
        <div>
            <div className='giaitri'>
                <Row gutter={[32, 32]}>
                    {/* Phần giới thiệu bên trái */}
                    <Col xs={24} md={12}>
                        <Title style={{ color: '#fff' }}>
                            Giải trí online không giới hạn hàng nghìn giờ nội dung đậm chất Việt
                        </Title>
                        <Paragraph style={{ color: '#fff', fontSize: '16px' }}>
                            - Bom tấn Việt chiếu rạp độc quyền và sớm nhất<br />
                            - Thư viện phim Việt lớn nhất Việt Nam<br />
                            - Phim Bộ độc quyền Galaxy Play<br />
                            - Phim Bộ Hot Châu Á<br />
                            - Siêu phẩm điện ảnh Hollywood và Disney
                        </Paragraph>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none" }}>
                            Đăng ký ngay
                        </Button>
                    </Col>

                    {/* Phần poster phim bên phải */}
                    <Col xs={24} md={12}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/Eve_1000x1500.jpg" // URL ảnh phim
                                    alt="Eve Movie"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8} style={{ transform: "translateY(-30px)" }}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/ChiMeHocYeu2_1000x1500.jpg"
                                    alt="Chi mẹ học yêu 2"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/DoctorStrangeInTheMultiverseOfMadness_1000x1500.jpg"
                                    alt="Doctor Strange"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/Cinderella2021_1000x1500.jpg"
                                    alt="Lọ lem thời đại"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8} style={{ transform: "translateY(-30px)" }}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/ChiaKhoaTramTy_1000x1500.jpg"
                                    alt="Chìa khóa trăm tỷ"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://assets.glxplay.io/web/responsive/w300/MyHeroAcademiaWorldHeroesMission_1000x1500.jpg"
                                    alt="Học viện anh hùng"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[32, 32]} align="middle" style={{ marginTop: "50px" }}>
                    {/* Phần thông tin bên trái */}
                    <Col xs={24} md={12}>
                        <Paragraph style={{ color: '#fff', fontSize: '16px' }}>
                            Chia sẻ từng khoảnh khắc cùng người thân và bạn bè
                        </Paragraph>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>1</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Tài khoản <br /> Galaxy Play Cao Cấp</Title>
                        </div>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>5</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Thiết bị</Title>
                        </div>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>4</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Thiết bị <br /> song song cùng lúc</Title>
                        </div>

                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none" }}>
                            Đăng ký ngay
                        </Button>
                    </Col>

                    {/* Phần hình ảnh bên phải */}
                    <Col xs={24} md={12}>
                        <Image
                            src="https://assets.glxplay.io/web/responsive/w1000/Spotlight%20on%20Device_VER2%20X1.png" // URL ảnh của bạn
                            alt="Subscription Image"
                            preview={false}
                            style={{ borderRadius: '10px', width: '100%' }}
                        />
                    </Col>
                </Row>
                <Title level={2} style={{ textAlign: 'center', color: '#fff', margin: "50px" }}>
                    Bạn có 2 cách để thưởng thức Galaxy Play
                </Title>
                <Row gutter={[32, 32]} justify="center" align="middle">
                    {/* Phim gói */}
                    <Col xs={24} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="Xem phim gói"
                                    src="https://assets.glxplay.io/web/responsive/plain/section-6_1.jpg" // URL ảnh của bạn cho phần bên trái
                                />
                            }
                            style={{ backgroundColor: '#000', color: '#fff' }}
                        >
                            <Title level={3} style={{ color: '#fff' }}>
                                TIỆC “BUFFET”
                            </Title>
                            <Button type="primary" style={{ backgroundColor: '#FFD700', color: '#000' }}>
                                XEM PHIM GÓI
                            </Button>
                            <Text style={{ color: '#fff', display: 'block', marginTop: '20px' }}>
                                Chỉ 70K/tháng, thỏa thích xem hàng ngàn bộ phim gồm: Phim Việt bom tấn, phim bộ Độc Quyền Galaxy Play, phim Hollywood và Disney tuyển chọn và phim bộ Châu Á gay cấn, hấp dẫn.
                            </Text>
                        </Card>
                    </Col>

                    {/* Phim thuê */}
                    <Col xs={24} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="Thuê phim lẻ"
                                    src="https://assets.glxplay.io/web/responsive/plain/section-6_2.jpg" // URL ảnh của bạn cho phần bên phải
                                />
                            }
                            bodyStyle={{ backgroundColor: '#000', color: '#fff' }}
                        >
                            <Title level={3} style={{ color: '#fff' }}>
                                CHỌN MÓN
                            </Title>
                            <Button type="primary" style={{ backgroundColor: '#FFD700', color: '#000' }}>
                                THUÊ PHIM LẺ
                            </Button>
                            <Text style={{ color: '#fff', display: 'block', marginTop: '20px' }}>
                                Thưởng thức những bộ phim MỚI ngay sau ra rạp, tại mục Phim Thuê Đặc Sắc, trên nền tảng Galaxy Play. Bạn không cần đăng ký mua Phim Gói, mà chỉ trả theo từng Phim Thuê mình yêu thích.
                            </Text>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[32, 32]} justify="center" align="middle" >
                    {/* Image Column */}
                    <Col xs={24} md={8} style={{ textAlign: 'center', marginTop: "50px" }}>
                        <img
                            src="https://assets.glxplay.io/web/responsive/w500/home-page-iphone-12-pro-max.png"
                            alt="Reply 1988 Poster"
                        />
                    </Col>

                    {/* Text Column */}
                    <Col xs={24} md={16} style={{ padding: '40px', color: 'white' }}>
                        <Title style={{ color: 'white' }}>
                            Nội dung đặc sắc, trải nghiệm mượt mà trên thiết bị di động
                        </Title>
                        <Text style={{ fontSize: '16px', color: '#fff' }}>
                            1 tài khoản Galaxy Play Mobile <br />
                            1 Smartphone hoặc máy tính bảng <br />
                            Xem mọi lúc, mọi nơi! <br />
                        </Text>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none", marginTop: "20px" }}>
                            Đăng ký ngay
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{  alignItems:"center" }}>
                    {/* Left Side: Text Section */}
                    <Col xs={24} md={12}>
                        <Title level={2} style={{ color: 'white' }}>
                            Không chèn quảng cáo khi xem phim
                        </Title>
                        <Text style={{ color: '#fff', fontSize: '16px' }}>
                            Tận hưởng trọn vẹn, không gián đoạn mỗi phút giây cảm xúc khi
                            thưởng thức bộ phim yêu thích. <br />
                        </Text>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none", marginTop: "20px" }}>
                            Đăng ký ngay
                        </Button>
                    </Col>

                    {/* Right Side: Image Section */}
                    <Col xs={24} md={12}>
                        <img
                            src="https://assets.glxplay.io/web/responsive/plain/WEB-GP_1221_TV_KID_500x460.png"
                            alt="Moana"
                            style={{ maxWidth: '100%' }}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Welcome;
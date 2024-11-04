import React from 'react';
import { Row, Col, Image, Button, Typography, Card } from 'antd';
import SlideBanner from '../Slideshow/SlideBanner';
import "../../../styles/Demo.css"
const { Title, Paragraph, Text } = Typography;
function Welcome(props) {
    return (
        <div>
            <SlideBanner />
            <div className='giaitri'>
                <Row gutter={[32, 32]}>
                    {/* Phần giới thiệu bên trái */}
                    <Col xs={24} md={12}>
                        <Title style={{ color: '#fff' }}>
                            Unlimited online entertainment with thousands of hours of Vietnamese content
                        </Title>
                        <Paragraph style={{ color: '#fff', fontSize: '16px' }}>
                            - Exclusive and earliest Vietnamese blockbusters shown in theaters<br />
                            - Largest Vietnamese movie library in Vietnam<br />
                            - Exclusive Galaxy Play TV Series<br />
                            - Hot Asian TV Series<br />
                            - Hollywood and Disney blockbusters
                        </Paragraph>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none" }}>
                            Sign up now
                        </Button>
                    </Col>

                    {/* Phần poster phim bên phải */}
                    <Col xs={24} md={12}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Image
                                    class="animate__animated animate__bounce"
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F1-1.png?alt=media&token=4b622447-496d-4302-b99a-70478ec03d1e" // URL ảnh phim
                                    alt="Eve Movie"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8} style={{ transform: "translateY(-30px)" }}>
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F1-2.png?alt=media&token=03e33ca1-c107-42b8-ae06-823f9e4d0228"
                                    alt="Chi mẹ học yêu 2"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F1-3.png?alt=media&token=b6ddc062-108c-4843-a182-f07f64898946"
                                    alt="Doctor Strange"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F2-1.png?alt=media&token=9e6b5623-7a4c-4bd3-b241-1d9fc0e3b27d"
                                    alt="Lọ lem thời đại"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8} style={{ transform: "translateY(-30px)" }}>
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F2-2.png?alt=media&token=2b3fa33b-cfd1-4ee3-9a3c-05846ce1f78c"
                                    alt="Chìa khóa trăm tỷ"
                                    preview={false}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2F2-3.png?alt=media&token=e192949c-a7bd-46dd-b143-f0a412c72374"
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
                            Share every moment with family and friends
                        </Paragraph>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>1</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Account <br /> Premium Beta Movie</Title>
                        </div>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>4</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Devices</Title>
                        </div>

                        <div style={{ marginBottom: '30px', display: "flex", alignItems: "center", gap: "20px" }}>
                            <Title level={1} style={{ color: '#fff', margin: "0" }}>3</Title>
                            <Title level={3} style={{ color: '#fff', margin: "0" }}>Devices <br />in parallel at the same time</Title>
                        </div>

                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none" }}>
                            Sign up now
                        </Button>
                    </Col>

                    {/* Phần hình ảnh bên phải */}
                    <Col xs={24} md={12}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2FMultiDevices.png?alt=media&token=ed0cdc83-7cdb-4e08-b26f-c113fbfe407e" // URL ảnh của bạn
                            alt="Subscription Image"
                            preview={false}
                            style={{ borderRadius: '10px', width: '100%' }}
                        />
                    </Col>
                </Row>
                <Title level={2} style={{ textAlign: 'center', color: '#fff', margin: "50px" }}>
                    You have 2 ways to enjoy Beta Movie
                </Title>
                <Row gutter={[32, 32]} justify="center" align="middle">
                    {/* Phim gói */}
                    <Col xs={24} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="Xem phim gói"
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Foption1.png?alt=media&token=224b1482-15b1-4334-95c1-574690cea1b4" // URL ảnh của bạn cho phần bên trái
                                />
                            }
                            style={{ backgroundColor: '#000', color: '#fff' }}
                        >
                            <Title level={3} style={{ color: '#fff' }}>
                                "BUFFET" PARTY
                            </Title>
                            <Button type="primary" style={{ backgroundColor: '#FFD700', color: '#000' }}>
                                WATCH MOVIES MONTHLY PACKAGE
                            </Button>
                            <Text style={{ color: '#fff', display: 'block', marginTop: '20px' }}>
                                Only 50K/month, enjoy watching thousands of movies including: Vietnamese blockbusters, exclusive Beta Movie series, selected Hollywood and Disney movies and exciting, attractive Asian series.
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
                                    src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Foption2.png?alt=media&token=761dd796-4841-4e9f-a6af-a45358dc2a67" // URL ảnh của bạn cho phần bên phải
                                />
                            }
                            bodyStyle={{ backgroundColor: '#000', color: '#fff' }}
                        >
                            <Title level={3} style={{ color: '#fff' }}>
                                SELECT MOVIE
                            </Title>
                            <Button type="primary" style={{ backgroundColor: '#FFD700', color: '#000' }}>
                                RENT MOVIE
                            </Button>
                            <Text style={{ color: '#fff', display: 'block', marginTop: '20px' }}>
                                Enjoy NEW movies right after their release in theaters, in the Featured Movie Rental section, on the Beta Movie platform. You don't need to subscribe to a Movie Package, just pay for each Movie Rental you like.
                            </Text>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[32, 32]} justify="center" align="middle" >
                    {/* Image Column */}
                    <Col xs={24} md={8} style={{ textAlign: 'center', marginTop: "50px" }}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fmobile.png?alt=media&token=819611f4-1443-4a0c-9c3b-06e1bf3a6ef6"
                            alt="Reply 1988 Poster"
                        />
                    </Col>

                    {/* Text Column */}
                    <Col xs={24} md={16} style={{ padding: '40px', color: 'white' }}>
                        <Title style={{ color: 'white' }}>
                            Great content, smooth experience on mobile devices.
                        </Title>
                        <Text style={{ fontSize: '16px', color: '#fff' }}>
                            1 Beta Movie Mobile account <br />
                            1 Smartphone or tablet<br />
                            Watch anytime, anywhere!<br />
                        </Text>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none", marginTop: "20px" }}>
                            Sign up now
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
                    {/* Left Side: Text Section */}
                    <Col xs={24} md={12}>
                        <Title level={2} style={{ color: 'white' }}>
                            No ads when watching movies
                        </Title>
                        <Text style={{ color: '#fff', fontSize: '16px' }}>
                            Enjoy every emotional moment without interruption while watching your favorite movie,<br /> a great way to dispel fatigue, stress and regain balance in life. <br />
                        </Text>
                        <Button type="default" size="large" style={{ borderColor: '#fff', color: '#fff', background: "none", marginTop: "20px" }}>
                            Sign up now
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
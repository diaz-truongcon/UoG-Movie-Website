import React, { useState } from 'react';
import { Input, Button, Image, Typography } from 'antd';
const { TextArea } = Input;
import { Row, Col } from 'antd';
const { Title, Paragraph, Text } = Typography;
function PlayMovie(props) {
    const initialComments = [
        {
            author: 'John Doe',
            content: 'Great movie! Highly recommend watching it.',
        },
        {
            author: 'Jane Smith',
            content: 'Loved the cinematography, but the plot was a bit slow.',
        },
        {
            author: 'Mark Lee',
            content: 'One of the best movies I\'ve seen this year!',
        },
    ];
    const episodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Giả sử có 10 tập phim
    const [comments, setComments] = useState(initialComments);
    const [commentText, setCommentText] = useState('');

    const handleAddComment = () => {
        if (commentText) {
            const newComment = {
                author: 'User', // Replace this with actual user info if needed
                content: commentText,
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    return (
        <div>
            {/* Movie player */}
            <iframe
                width="100%"
                src="https://www.youtube.com/embed/NyFZGibWet0?si=A4rxOCieKmLWQa6L"
                title="Movie Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
                className="playmovie"
            ></iframe>
            <Row gutter={[16, 16]} style={{ marginTop: "20px", padding: '20px' }}>
                {episodes.map((episode, index) => (
                    <Col key={index}>
                        <Button type="primary">
                            Tập {episode}
                        </Button>
                    </Col>
                ))}
            </Row>
            <div style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} >
                    <Col xs={24} lg={12}>
                        <div style={{ marginTop: '10px' }}>
                            <TextArea
                                rows={4}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <Button
                                type="primary"
                                onClick={handleAddComment}
                                style={{ marginTop: '10px' }}
                            >
                                Add Comment
                            </Button>
                        </div>
                        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                            <Col xs={24} lg={4}>
                                <Image src="https://img.freepik.com/premium-photo/man-with-glasses-cartoon-style-profile-avatar-picture_1104560-1818.jpg?w=2000" preview={false} />
                            </Col>
                            <Col xs={24} lg={20} style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Title level={4} style={{ margin: 0 }}>
                                        Luffy Mu Rom
                                    </Title>
                                    <Text type="secondary" style={{ marginLeft: "10px" }}>khoảng 5 ngày trước</Text>
                                </div>
                                <Paragraph>
                                    có ai như tôi không? hình như tập 1112 bị lỗi rồi. Nhờ ad kiểm tra nha
                                </Paragraph>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                            <Col xs={24} lg={4}>
                                <Image src="https://img.freepik.com/premium-photo/man-with-glasses-cartoon-style-profile-avatar-picture_1104560-1818.jpg?w=2000" preview={false} />
                            </Col>
                            <Col xs={24} lg={20} style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Title level={4} style={{ margin: 0 }}>
                                        Luffy Mu Rom
                                    </Title>
                                    <Text type="secondary" style={{ marginLeft: "10px" }}>khoảng 5 ngày trước</Text>
                                </div>
                                <Paragraph>
                                    có ai như tôi không? hình như tập 1112 bị lỗi rồi. Nhờ ad kiểm tra nha
                                </Paragraph>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                            <Col xs={24} lg={4}>
                                <Image src="https://img.freepik.com/premium-photo/man-with-glasses-cartoon-style-profile-avatar-picture_1104560-1818.jpg?w=2000" preview={false} />
                            </Col>
                            <Col xs={24} lg={20} style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Title level={4} style={{ margin: 0 }}>
                                        Luffy Mu Rom
                                    </Title>
                                    <Text type="secondary" style={{ marginLeft: "10px" }}>khoảng 5 ngày trước</Text>
                                </div>
                                <Paragraph>
                                    có ai như tôi không? hình như tập 1112 bị lỗi rồi. Nhờ ad kiểm tra nha
                                </Paragraph>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} lg={12} >
                        <Title level={4} style={{ margin: 0 , color:"yellow"}}>
                            TOP BẢNG XẾP HẠNG
                        </Title>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PlayMovie;

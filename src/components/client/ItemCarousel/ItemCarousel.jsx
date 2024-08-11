import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button,Tooltip } from 'antd';
import { RightOutlined, LeftOutlined, PlayCircleOutlined, VideoCameraOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function ItemCarousel({ data, title }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getNumOfDisplayedItems = () => {
        if (windowWidth < 740) {
            return 2;
        } else if (windowWidth > 740 && windowWidth < 1024) {
            return 4;
        } else {
            return 6;
        }
    };

    useEffect(() => {
        if (data.length !== 0) {
            const numOfDisplayedItems = getNumOfDisplayedItems();
            const startIndex = currentIndex;
            const endIndex = (startIndex + numOfDisplayedItems) % data.length;
            const newDisplayedData = [];

            for (let i = startIndex; i !== endIndex; i = (i + 1) % data.length) {

                newDisplayedData.push(data[i]);
            }

            setDisplayedData(newDisplayedData);
        }

    }, [currentIndex, data]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }
        }, 4000);
        
        return () => {
            clearInterval(interval);
        };
    }, [data.length, isPaused]);

    const handleColHover = (index) => {
        setHoveredIndex(index);
        setIsPaused(true);
    };

    const handleColLeave = () => {
        setHoveredIndex(null);
        setIsPaused(false);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
        setIsPaused(true);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        setIsPaused(true);
    };

    return (
        <>
            <div style={{ position: 'relative', overflowX: 'hidden', overflowY: 'hidden' }}>
                <h1 style={{ color: 'white', margin: '10px', fontSize: '1.5em' }}>{title}</h1>
                <Row gutter={[16, 16]} style={{ margin: '0', position: 'relative' }}>
                    {displayedData.map((element, index) => (
                        <Col
                            className='movie'
                            key={index}
                            xs={12}
                            md={6}
                            lg={4}
                            onMouseEnter={() => handleColHover(index)}
                            onMouseLeave={handleColLeave}
                            style={{ position: 'relative' }}
                        >
                            <Image src={element.imgUrl} alt="" preview={false} />
                            {hoveredIndex === index && (
                                <div className='button-movie' style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-evenly",
                                    width: "100%"
                                }}>
                                    <Button
                                        type="link"
                                        icon={<VideoCameraOutlined />}
                                        style={{ color: 'white' }}
                                    />
                                    <Link to={`/moviedetail/${element.id}`} style={{ textDecoration: 'none' }}>
                                        <Tooltip title="Watch Movie">
                                            <Button
                                                type="link"
                                                icon={<PlayCircleOutlined />}
                                                style={{ color: 'white' }}
                                            />
                                        </Tooltip>
                                    </Link>
                                    <Button
                                        type="link"
                                        icon={<PlusOutlined />}
                                        style={{ color: 'white' }}

                                    />
                                </div>
                            )}
                        </Col>
                    ))}
                </Row>

                <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={handlePrevClick}
                    style={{ position: 'absolute', top: '60%', left: 0, transform: 'translateY(-50%)', background: "rgba(20, 20, 20, 0.5)", zIndex: "2" }}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={handleNextClick}
                    style={{ position: 'absolute', top: '60%', right: 0, transform: 'translateY(-50%)', background: "rgba(20, 20, 20, 0.5)", zIndex: "2" }}
                />
            </div>
        </>
    );
}

export default ItemCarousel;

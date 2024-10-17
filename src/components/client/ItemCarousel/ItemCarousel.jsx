import React, { useState, useEffect } from 'react';
import { Row, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CardItem from './CardItem';
function ItemCarousel({ data, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isPaused, setIsPaused] = useState(false);

    // Xử lý thay đổi kích thước cửa sổ
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

    // Xử lý cập nhật dữ liệu hiển thị
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

    // Xử lý tự động chuyển carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [data.length, isPaused]);

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
                        <CardItem
                            key={element.id || index}  // Sử dụng ID duy nhất hoặc index nếu không có ID
                            element={element}
                            index={index}
                            setIsPaused={setIsPaused}
                        />
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

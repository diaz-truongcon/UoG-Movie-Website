import React, { useState, useContext } from 'react';
import { Col, Image, Button, Tooltip } from 'antd';
import { PlayCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { handleClick } from '../../../utils/ContantsFunctions';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { ContextPlans } from '../../../context/PlansContext';
import IconLikes from './IconLikes';
import IconFavorites from './IconFavorites';
function CardItem({ element, index, setIsPaused = () => {}  }) {
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const plans = useContext(ContextPlans);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Xử lý hover vào từng phim
    const handleColHover = (index) => {
        setHoveredIndex(index);
        setIsPaused(true);
    };

    const handleColLeave = () => {
        setHoveredIndex(null);
        setIsPaused(false);
    };

    return (
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
            {element.rank ? (<div className='index-number'>
                {element.rank}
            </div>) : ""}
            {hoveredIndex === index && (
                <div className='button-movie' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}>
                    <IconLikes element={element} />
                    <Tooltip title="Watch Movie">
                        <Button
                        className='animate__animated animate__flip'
                            type="link"
                            icon={<PlayCircleOutlined />}
                            style={{ color: 'white' }}
                            onClick={() => handleClick(element,isLoggedIn,plans,navigate)}
                        />
                    </Tooltip>
                 <IconFavorites element={element} />
                </div>
            )}
        </Col>
    );
}

export default CardItem;
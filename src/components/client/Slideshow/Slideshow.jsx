import { Carousel, Image, Button } from 'antd';
import { CaretRightOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import React, { useContext } from 'react';
import { ContextMovies } from '../../../context/MoviesContext';
import './Slideshow.scss';
function Slideshow(props) {
    const movies = useContext(ContextMovies);
    // Sắp xếp phim theo ngày phát hành mới nhất và lấy ra 4 phim đầu tiên
    const latestMovies = movies
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4); // Lấy 4 phim mới nhất
    return (
        <div className='carousel'>
            <Carousel autoplay >
                {
                    latestMovies.map((element, index) => (
                        <div className='slide' key={index} >
                            <Image
                                src={element.imgUrl}
                                alt="Description of the image"
                            />
                            <div className="content">
                                <div className='title'>
                                    <h3 data-shadow-text={element.nameMovie} >{element.nameMovie}</h3>
                                </div>
                                <div className="btn">
                                    <Button shape="round" icon={<CaretRightOutlined />} >
                                        Thuê phim 50.000đ
                                    </Button>
                                    <Button className='btn-like' type="primary" shape="round" icon={<VideoCameraAddOutlined />} >
                                        Thêm vào danh sách
                                    </Button>
                                </div>
                                <p >{element.describe}</p>
                            </div>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
}

export default Slideshow;
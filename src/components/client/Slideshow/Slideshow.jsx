import { Carousel, Image, Button } from 'antd';
import {CaretRightOutlined,VideoCameraAddOutlined} from "@ant-design/icons";
import React, {  useContext } from 'react';
import { ContextMovies } from '../../../context/MoviesContext';
function Slideshow(props) {
    const movies = useContext(ContextMovies);
    return (
        <div className='carousel'>
            <Carousel autoplay >
                {
                     movies.map((element,index) => (
                        <div className='slide' key={index} >
                        <Image
                            src={element.imgUrl}
                            alt="Description of the image"
                        />
                        <div className="content">
                            <h3  data-shadow-text={element.nameMovie} >{element.nameMovie}</h3>
                            <div className="btn">
                            <Button   shape="round"  icon={<CaretRightOutlined />} >
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
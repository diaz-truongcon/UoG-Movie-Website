import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button, Row, Col, Space, message, Tooltip, Image } from 'antd';
import { HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ContextMovies } from '../../../context/MoviesContext';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { Link } from 'react-router-dom';
const { Title, Text, Paragraph } = Typography;

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const movies = useContext(ContextMovies);

  useEffect(() => {
    const foundMovie = movies.find((element) => element.id === id);
    setMovie(foundMovie);
  }, [id, movies]);

  const handleLike = () => {
    message.success('Movie liked!');
  };

  const handleAddToList = () => {
    message.success('Movie added to your list!');
  };

  if (!movie) {
    return <div>Loading...</div>; // Or display an error message
  }

  return (
    <>

      <div className='slide'>
          <Image src={movie.imgUrl} preview={false} />
        <div className="content">
          <h3 data-shadow-text={movie.nameMovie} >{movie.nameMovie}</h3>
          <h4><strong>Duration: </strong>{movie.duration}</h4>
           <h4>{movie.categoryName}</h4>
          <h4>{movie.describe}</h4>
           <Space style={{ marginTop: '20px' }}>
              <Tooltip title="Watch Movie">
              <Link to={`/playmovie/${movie.id}`}>
                <Button type="primary">Watch Movie</Button>
              </Link>       
              </Tooltip>
              <Tooltip title="Like">
                <Button icon={<HeartOutlined />} onClick={handleLike} />
              </Tooltip>
              <Tooltip title="Add to List">
                <Button icon={<PlusOutlined />} onClick={handleAddToList} />
              </Tooltip>
            </Space>
        </div>
      </div>
      <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
      <ItemCarousel data={movies} title="Danh Sách Phim" />
    </>
  );
};

export default MovieDetail;
import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button, Row, Col, Space, message, Tooltip, Image } from 'antd';
import { HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ContextMovies } from '../../../context/MoviesContext';
import ItemCarousel from '../ItemCarousel/ItemCarousel';

const { Title, Text, Paragraph } = Typography;

const MovieDetail = () => {
  const [playMovie, setPlayMovie] = useState(false);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const movies = useContext(ContextMovies);

  useEffect(() => {
    const foundMovie = movies.find((element) => element.id === id);
    setMovie(foundMovie);
  }, [id, movies]);

  const handleWatchMovie = () => {
    setPlayMovie(true);
    message.success('Enjoy watching the movie!');
  };

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
        {playMovie ? (
          <iframe
            width="100%"
            src={movie.linkfilm}
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
            className="playmovie"
          ></iframe>
        ) : (
          <Image src={movie.imgUrl} preview={false} />
        )}
        <div className="content">
          <h3 data-shadow-text={movie.nameMovie} >{movie.nameMovie}</h3>
          <h4><strong>Duration: </strong>{movie.duration}</h4>
           <h4>{movie.categoryName}</h4>
          <h4>{movie.describe}</h4>
        </div>
        {/* <Row gutter={24} className={`slide ${playMovie ? "hidden" : ""}`} >
          <Col span={24} className='content'>
            <Title level={1} className="movie-title">{movie.nameMovie}</Title>
            <Text strong>Duration: </Text>
            <Text>{movie.duration}</Text>
            <br />
            <Text strong>Description: </Text>
            <Paragraph>{movie.describe}</Paragraph>
            <Text strong>Protagonist: </Text>
            <Text>{movie.protagonist}</Text>
            <br />
            <Text strong>Category: </Text>
            <Text>{movie.categoryName}</Text>
            <br />
            <Space>
              <Tooltip title="Watch Movie">
                <Button type="primary" onClick={handleWatchMovie}>Watch Movie</Button>
              </Tooltip>
              <Tooltip title="Like">
                <Button icon={<HeartOutlined />} onClick={handleLike} />
              </Tooltip>
              <Tooltip title="Add to List">
                <Button icon={<PlusOutlined />} onClick={handleAddToList} />
              </Tooltip>
            </Space>
          </Col>
        </Row> */}
      </div>
      <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
      <ItemCarousel data={movies} title="Danh Sách Phim" />
    </>
  );
};

export default MovieDetail;

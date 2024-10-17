import React, { useEffect, useState, useContext } from 'react';
import { Button, Space, message, Tooltip, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { ContextMovies } from '../../../context/MoviesContext';
import { CustomerLoginContext } from "../../../context/CustomerLoginContext";
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import { updateDocument } from '../../../Service/FirebaseService';
import IconLikes from '../ItemCarousel/IconLikes';
import IconFavorites from '../ItemCarousel/IconFavorites';

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const movies = useContext(ContextMovies);
  const { isLoggedIn } = useContext(CustomerLoginContext); // `user` contains the logged-in user's info

  useEffect(() => {
    const foundMovie = movies.find((element) => element.id === id);
    setMovie(foundMovie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, movies]);

  const handleAddToList = () => {
    message.success('Movie added to your list!');
  };

  const handleWatchMovie = async () => {
    try {
      if (isLoggedIn) {
        await updateDocument('Movies', movie.id, { views: movie.views + 1 });
        console.log("vao day");
      } else {
        message.info('Please log in to save your watch movie');
      }
    } catch (error) {
      console.log('An error occurred while updating your watch movie');
    }
  };

  return (
    <>
      <div className='slide'>
        <Image src={movie?.imgUrl} preview={false} />
        <div className="content">
          <h3 data-shadow-text={movie?.nameMovie}>{movie?.nameMovie}</h3>
          <h4><strong>Duration: </strong>{movie?.duration}</h4>
          <h4>{movie?.categoryName}</h4>
          <h4>{movie?.describe}</h4>
          <Space style={{ marginTop: '20px', flexDirection:"column" }}>
            <Tooltip title="Watch Movie">
              <Link to={`/playmovie/${movie?.id}`}>
                <Button type="primary" onClick={handleWatchMovie}>Watch Movie</Button>
              </Link>
            </Tooltip>
            <div>
              <IconLikes element={movie} />
              <span style={{padding:"10px"}}>{movie?.likeCount}</span>
              <EyeOutlined />
              <span style={{padding:"10px"}}>{movie?.views}</span>
              <IconFavorites element={movie} />
            </div>
          </Space>
        </div>
      </div>
      <ItemCarousel data={movies} title="Phim Mới Thịnh Hành Trên Galaxy" />
      <ItemCarousel data={movies} title="Danh Sách Phim" />
    </>
  );
};

export default MovieDetail;

import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button, Space, message, Tooltip, Image } from 'antd';
import { HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { ContextMovies } from '../../../context/MoviesContext';
import { CustomerLoginContext } from "../../../context/CustomerLoginContext";
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore'; // Assuming you're using Firebase for the database
import { db } from '../../../config/firebase'; // Firebase initialization
import ItemCarousel from '../ItemCarousel/ItemCarousel';

const { Title } = Typography;

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const movies = useContext(ContextMovies);
  const { isLoggedIn } = useContext(CustomerLoginContext); // `user` contains the logged-in user's info

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

  const handleWatchMovie = async () => {
    try {
      if (isLoggedIn) {
        // Increment view count
        const movieRef = doc(db, 'movies', movie.id);
        await updateDoc(movieRef, {
          viewCount: increment(1), // Increment the view count by 1
        });

        // Add to user's watch history
        const userRef = doc(db, 'users', isLoggedIn.id); // Assuming users are stored by their UID
        await updateDoc(userRef, {
          watchHistory: arrayUnion({
            movieId: movie.id,
            watchedAt: new Date(),
            name: movie.nameMovie,
          }),
        });

        message.success('Watch history saved and view count updated!');
      } else {
        message.info('Please log in to save your watch history.');
      }
    } catch (error) {
      message.error('An error occurred while updating your watch history.');
      console.error(error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='slide'>
        <Image src={movie.imgUrl} preview={false} />
        <div className="content">
          <h3 data-shadow-text={movie.nameMovie}>{movie.nameMovie}</h3>
          <h4><strong>Duration: </strong>{movie.duration}</h4>
          <h4>{movie.categoryName}</h4>
          <h4>{movie.describe}</h4>
          <Space style={{ marginTop: '20px' }}>
            <Tooltip title="Watch Movie">
              <Link to={`/playmovie/${movie.id}`}>
                <Button type="primary" onClick={handleWatchMovie}>Watch Movie</Button>
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

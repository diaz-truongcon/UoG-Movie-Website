import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MovieDetail from '../Detail/MovieDetail';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import PlayMovie from '../Detail/PlayMovie';

function Home({setAdmin}) {

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#111111" }}>
        <Navbar setAdmin={setAdmin}></Navbar>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
          <Route path="/playmovie/:id" element={<PlayMovie/>} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>

  );
}

export default Home;
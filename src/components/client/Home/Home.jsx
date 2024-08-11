import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MovieDetail from '../Detail/MovieDetail';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function Home(props) {

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#111111" }}>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>

  );
}

export default Home;
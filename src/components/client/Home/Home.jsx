import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MovieDetail from '../Detail/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import PlayMovie from '../Detail/PlayMovie';
import SubscriptionPlan from '../Vip/SubscriptionPlan';
import PaymentPage from '../Vip/PaymentPage';
import Welcome from '../Main/Welcome';
import Favorites from '../Favorite/Favorites';
import Search from '../Search/Search';
import AccountPage from '../AccountPage/AccountPage';
import FAQ from '../Support/FAQ';
import "../../../styles/Client.css";
import RentMovies from '../Main/RentMovies';
import Promotions from '../Support/Promotions';
function Home() {
       
  return (
      <div style={{ backgroundColor: "#111111" }}>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
          <Route path="/playmovie/:id" element={<PlayMovie/>} />
          <Route path="/subscriptionplan" element={<SubscriptionPlan/>} />
          <Route path="/paymentpage/:id" element={<PaymentPage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/accountpage" element={<AccountPage/>} />
          <Route path="/rent_movies" element={<RentMovies/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/promotions" element={<Promotions/>} />
        </Routes>
        <Footer></Footer>
      </div>

  );
}

export default Home;
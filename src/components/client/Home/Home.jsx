import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "../../../styles/Client.css";
import ChatBoxUsers from '../Chat/ChatBoxUsers';
import ClientRouters from '../../../routes/ClientRouters';
function Home() {

  return (
    <div style={{ backgroundColor: "#111111" }}>
      <Navbar />
      <ClientRouters />
      <ChatBoxUsers />
      <Footer />
    </div>

  );
}

export default Home;
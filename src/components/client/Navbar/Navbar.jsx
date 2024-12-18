import React, { useState, useContext } from 'react';
import { Drawer, Menu, Image, Button, Dropdown } from "antd";
import { MenuOutlined, DownOutlined, UnorderedListOutlined, UserOutlined, LoginOutlined, SearchOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import Login from './Login';
import MenuApp from './MenuApp';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo.png"
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIsLoggedIn, isLoggedIn } = useContext(CustomerLoginContext);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const menuItems = [
    {
      key: "1",
      label: isLoggedIn ? (
        <div style={{ display: "flex", borderBottom: "1px solid black", paddingBottom: "0.5rem" }}>
          <Image preview={false} src={isLoggedIn.imgUrl} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <div style={{ paddingLeft: "0.5rem" }}>
            <h3>{isLoggedIn.name}</h3>
            <p>{isLoggedIn.id}</p>
          </div>
        </div>
      ) : null,
    },
    {
      key: "2",
      label: (
        <>
          <UnorderedListOutlined style={{ paddingRight: "1rem" }} />
          Movie Library Management
        </>
      ),
      onClick: () => navigate('/favorites'),
    },
    {
      key: "3",
      label: (
        <>
          <UserOutlined style={{ paddingRight: "1rem" }} />
          Account
        </>
      ),
      onClick: () => navigate('/accountpage'),
    },
    {
      key: "4",
      label: (
        <>
          <LoginOutlined style={{ paddingRight: "1rem" }} />
          Logout
        </>
      ),
      onClick: () => {
        setIsLoggedIn(false);
        navigate("/");
      },
    },
  ];

  return (
    <>
      <div className='header'>
        <Login handleCancel={handleCancel} isModalVisible={isModalVisible} />
        <div className='menu-header'>
          <MenuOutlined
            onClick={() => setOpenMenu(true)}
            style={{ color: "white" }}
          />
        </div>
        <div>
          <Image
            width={55}
            src={logo}
            alt="Description of the image"
          />
        </div>
        <div className="app-menu">
          <MenuApp />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/subscriptionplan"}>
            <Button className={isLoggedIn ? "" : "hidden"} style={{ background: "orange", color: "white", border: "none" }} >ĐĂNG KÝ GÓI</Button>
          </Link>
          <Link className={isLoggedIn ? "" : "hidden"} to={"/search"} style={{ color: "white", fontSize: "1,5rem", marginLeft: "10px" }}>
            <SearchOutlined />
          </Link>
          <Dropdown overlay={<Menu items={menuItems} />} className={isLoggedIn ? "" : "hidden"} >
            <Button style={{ background: "none", border: "none", color: "white" }}>
              <Image style={{ width: "30px", height: "30px", borderRadius: "50%" }} src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2FCat%20Avatar.png?alt=media&token=5f836abe-1281-4d87-a771-b11009fcd271" alt="" />
              <DownOutlined style={{ fontSize: "1rem" }} />
            </Button>
          </Dropdown>
          <Button className={isLoggedIn ? "hidden" : ""} style={{ background: "none", color: "white" }} onClick={showModal}>ĐĂNG NHẬP</Button>
        </div>
        <Drawer
          placement='left'
          open={openMenu}
          closable={false}
          style={{ backgroundColor: "#101010" }}
          onClose={() => {
            setOpenMenu(false);
          }}>
          <MenuApp isInline />
        </Drawer>
      </div>
    </>
  );
};

export default Navbar;

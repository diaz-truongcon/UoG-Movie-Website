import React, { useEffect, useState } from 'react';
import { Drawer, Menu, Image, Button, Modal, Typography, Divider, message, Dropdown, Tree } from "antd";
import { MenuOutlined, GoogleOutlined, PhoneOutlined, DownOutlined, UnorderedListOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { signInWithPopup,signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth, googleProvider,db  } from "../../../config/firebase";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Navbar = ({setAdmin}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const customersCollectionRef = collection(db, "Customers");
  const [update, setUpdate] = useState(false);
  const [login, setLogin] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(customersCollectionRef);
      const customersData = [];
      querySnapshot.forEach((doc) => {
        customersData.push({ id: doc.id, ...doc.data() });
      });
      setCustomers(customersData);
    };
    fetchData();

    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setLogin(true);
    }

    const customerLogin = localStorage.getItem('customerLogin');
    if (customerLogin) {
      setCustomer(JSON.parse(customerLogin));
    }

  }, [update]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Login with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const exits = customers.find((item) => item.email === result.user.email);
      if (!exits) {
        try {
          await addDoc(collection(db, 'Customers'), {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
            role: "2"
          });
        const  customerNew =  {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
          role: "2"
        }
        const customerLogin = JSON.stringify(customerNew);
        localStorage.setItem('customerLogin', customerLogin);
        setCustomer(customerNew);
        localStorage.setItem('isLoggedIn', 'true');
        setUpdate(!update);
        message.success('Successful login');
        handleCancel();

        } catch (error) {
          message.error('Failed to add customers. Please try again.');
        }
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        handleCancel();
        message.success('Successful login');
        setLogin(true);
        setCustomer(exits);
        if(exits.role == 1) {
            setAdmin(true);
        }
      }
  
    } catch (error) {
      console.error("Google login error:", error.message);
      // Handle error, show message to user, etc.
    }
  };




  const handleLogout = () => {
    // Clear login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('customerLogin');
    setLogin(false);
  };
 // Phone Login
 const signInWithPhone = async (phoneNumber) => {
  try {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // Proceed to verification step
    const code = prompt('Enter the verification code sent to your phone:');
    if (code === null) return; // User canceled
    const credential = await confirmationResult.confirm(code);
    handleLoginResult(credential);
  } catch (error) {
    console.error("Phone login error:", error.message);
    // Handle error, show message to user, etc.
  }
};
  const menu = (
    <Menu>
      <Menu.Item key="1">
        {customer
          ?
          (<>
            <div style={{display:"flex",borderBottom:"1px solid black",paddingBottom:"0.5rem"}}>
              <Image preview={false} src={customer.img} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
               <div style={{paddingLeft:"0.5rem"}}>
                  <h3>{customer.name}</h3>
                   <p>{customer.email}</p>
               </div>
            </div>
          </>
          )
          : ""}
      </Menu.Item>
      <Menu.Item key="1"><UnorderedListOutlined style={{ paddingRight: "1rem" }} /> Quản lý kho phim</Menu.Item>
      <Menu.Item key="2"><UserOutlined style={{ paddingRight: "1rem" }} />Tài khoản</Menu.Item>
      <Menu.Item onClick={handleLogout} key="3"><LoginOutlined style={{ paddingRight: "1rem" }} /> Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <>

      <div className='header'>
        <Modal
          title="ĐĂNG NHẬP"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          centered
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button onClick={signInWithGoogle} icon={<GoogleOutlined />} style={{ background: "linear-gradient(to right, red, yellow, green)", border: "none", color: "gray", paddingBottom: "20px", marginTop: "20px", marginBottom: "10px" }}>Continue with Google</Button>
            <Divider>
              Hoặc
            </Divider>
            <Button  icon={<PhoneOutlined />} style={{ backgroundColor: "blue", color: "white", paddingBottom: "10px", marginTop: "10px" }}>Continue with Phone</Button>
            <Typography.Paragraph style={{ marginTop: "20px", textAlign: "center" }}>
              Khi tiếp tục, bạn đã đồng ý <a href="">Quy chế sử dụng dịch vụ</a> của Galaxy Play.
            </Typography.Paragraph>
            <Typography.Paragraph style={{ textAlign: "center" }}>
              Hỗ trợ và chính sách bảo mật.
            </Typography.Paragraph>
          </div>
          <hr />
        </Modal>
        <div className='menu-header'>
          <MenuOutlined
            onClick={() => setOpenMenu(true)}
            style={{ color: "white" }}
          />
        </div>
        <div>
          <Image
            width={80}
            src="https://assets.glxplay.io/web/images/logoglx.svg"
            alt="Description of the image"
          />
        </div>
        <div className="app-menu">
          <AppMenu />
        </div>
        <div style={{ display: "flex" }}>
          <Button className={login ? "" : "hidden"} style={{ background: "orange", color: "white", border: "none" }} >ĐĂNG KÝ GÓI</Button>
          <Dropdown overlay={menu} className={login ? "" : "hidden"} >
            <Button style={{ background: "none", border: "none", color: "white" }}>
              <Image style={{ width: "30px", height: "30px", borderRadius: "50%" }} src="https://assets.glxplay.io/static/avatars/avatar%20gp%20grb-07.jpg" alt="" /> <DownOutlined style={{ fontSize: "1rem" }} />
            </Button>
          </Dropdown>
          <Button className={login ? "hidden" : ""} style={{ background: "none", color: "white" }} onClick={showModal}>ĐĂNG NHẬP</Button>
        </div>
        <Drawer
          placement='left'
          open={openMenu}
          closable={false}
          style={{ backgroundColor: "#101010" }}
          onClose={() => {
            setOpenMenu(false);
          }}>
          <AppMenu isInline />
        </Drawer>
      </div>
    </>
  );
};

function AppMenu({ isInline = false }) {
  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    if (key === "home") {
      navigate("/");
    }
    // Xử lý các trường hợp khác ở đây nếu cần
  };
  return (
    <Menu
      style={{ background: "none" }}
      mode={isInline ? "inline" : "horizontal"}
      onClick={({ key }) => handleMenuClick(key)}
      items={[
        {
          label: "Home",
          key: "home",
        },
        {
          label: "Movie Store",
          key: "movie_store",
        },
        {
          label: "Movies",
          key: "movies",
        },
        {
          label: "Rent Movies",
          key: "rent_movies",
        },
        {
          label: "Promotions",
          key: "promotions",
        }
      ]}
    />
  );
}

export default Navbar;

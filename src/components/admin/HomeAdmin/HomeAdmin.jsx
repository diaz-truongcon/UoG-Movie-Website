import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Radio, Dropdown, Image, Button } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import {
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  PlayCircleOutlined,
  DownOutlined,
  LoginOutlined,
  UnorderedListOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  CrownOutlined,
  GiftOutlined,
  StarOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';

import "../../../styles/Admin.css";
import logo from "../../../assets/logo.png"
import ChatBoxAdmin from '../../client/Chat/ChatBoxAdmin';
import AdminRouters from '../../../routes/AdminRouters';
const { Header, Content, Footer, Sider } = Layout;

const HomeAdmin = ({ currentTheme, setCurrentTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const { setIsLoggedIn, isLoggedIn } = useContext(CustomerLoginContext);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem('selectedKey');
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

  const handleMenuClick = (key) => {
    localStorage.setItem('selectedKey', key);
    setSelectedKey(key);
  };

  const handleClick = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = [
    { key: '1', icon: <PieChartOutlined />, label: <Link to="/" onClick={() => handleMenuClick('1')}>Dashboard</Link> },
    { key: '2', icon: <AppstoreOutlined />, label: <Link to="/categories" onClick={() => handleMenuClick('2')}>Categories</Link> },
    { key: '3', icon: <PlayCircleOutlined />, label: <Link to="/movies" onClick={() => handleMenuClick('3')}>Movies</Link> },
    { key: '4', icon: <MenuUnfoldOutlined />, label: <Link to="/episodes" onClick={() => handleMenuClick('4')}>Episodes</Link> },
    { key: '5', icon: <UsergroupAddOutlined />, label: <Link to="/customers" onClick={() => handleMenuClick('5')}>Customers</Link> },
    { key: '6', icon: <CommentOutlined />, label: <Link to="/comments" onClick={() => handleMenuClick('6')}>Comments</Link> },
    {
      key: '7',
      icon: <CrownOutlined />,
      label: 'Vip',
      children: [
        { key: '7-1', icon: <ContainerOutlined />, label: <Link to="/vip/plans" onClick={() => handleMenuClick('7-1')}>Plans</Link> },
        { key: '7-2', icon: <GiftOutlined />, label: <Link to="/vip/packages" onClick={() => handleMenuClick('7-2')}>Package</Link> },
        { key: '7-3', icon: <StarOutlined />, label: <Link to="/vip/features" onClick={() => handleMenuClick('7-3')}>Features</Link> }
      ]
    },
    { key: '8', icon: <UserOutlined />, label: <Link to="/profile" onClick={() => handleMenuClick('8')}>Profile</Link> }
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">
        {isLoggedIn && (
          <div style={{ display: "flex", borderBottom: "1px solid black", paddingBottom: "0.5rem" }}>
            <Image preview={false} src={isLoggedIn.imgUrl} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
            <div style={{ paddingLeft: "0.5rem" }}>
              <h3>{isLoggedIn.name}</h3>
              <p>{isLoggedIn.id}</p>
            </div>
          </div>
        )}
      </Menu.Item>
      <Menu.Item key="2"><UnorderedListOutlined style={{ paddingRight: "1rem" }} /> Quản lý kho phim</Menu.Item>
      <Menu.Item key="3"><UserOutlined style={{ paddingRight: "1rem" }} />Tài khoản</Menu.Item>
      <Menu.Item onClick={handleClick} key="4"><LoginOutlined style={{ paddingRight: "1rem" }} /> Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" style={{ height: "50px" }} >
          <img src={logo} alt="" style={{
            width: collapsed ? "auto" : "40%",
            margin: collapsed ? "initial" : "auto"
          }} />
        </div>
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: "0 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
          <Radio.Group value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
            <Radio value={"light"}>Light</Radio>
            <Radio value={"dark"}>Dark</Radio>
          </Radio.Group>
          <Dropdown overlay={menu}>
            <Button style={{ background: "none", border: "none", color: "white" }}>
              <Image style={{ width: "30px", height: "30px", borderRadius: "50%" }} src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2FCat%20Avatar.png?alt=media&token=5f836abe-1281-4d87-a771-b11009fcd271" alt="" /> <DownOutlined style={{ fontSize: "1rem" }} />
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <AdminRouters />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Admin ©2023 Created by You</Footer>
      </Layout>
      <ChatBoxAdmin />
    </Layout>
  );
};

export default HomeAdmin;

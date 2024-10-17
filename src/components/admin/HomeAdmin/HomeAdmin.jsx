import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Radio, Dropdown, Image, Button } from 'antd';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
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
import Categories from '../Categories/Categories';
import Movies from '../Movies/Movies';
import Comments from '../Movies/Comments';
import Customers from '../Customers/Customers';
import Episodes from '../Episodes/Episodes';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import Plans from '../Vip/Plans';
import Packages from '../Vip/Packages';
import Profile from '../Profile/Profile';
import Features from '../Vip/Features';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomeAdmin = ({ currentTheme, setCurrentTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const { setIsLoggedIn, isLoggedIn } = useContext(CustomerLoginContext);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    // Load the selected key from local storage on component mount
    const storedKey = localStorage.getItem('selectedKey');
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

  const handleMenuClick = (key) => {
    // Update the selected key in local storage and state
    localStorage.setItem('selectedKey', key);
    setSelectedKey(key);
  };

  const handleClick = () => {
    setIsLoggedIn(false); // Set the login state to false
    navigate("/");        // Navigate to the home page
  };

  // Define your menu items as an array
  const menuItems = [
    { key: '1', icon: <PieChartOutlined />, label: 'Dashboard', route: '/' },
    { key: '2', icon: <AppstoreOutlined />, label: 'Categories', route: '/categories' },
    { key: '3', icon: <PlayCircleOutlined />, label: 'Movies', route: '/movies' },
    { key: '4', icon: <MenuUnfoldOutlined />, label: 'Episodes', route: '/episodes' },
    { key: '5', icon: <UsergroupAddOutlined />, label: 'Customers', route: '/customers' },
    { key: '6', icon: <CommentOutlined />, label: 'Comments', route: '/comments' },
    {
      key: '7',
      icon: <CrownOutlined />, // Icon for VIP
      label: 'Vip', // Main label for Vip
      children: [
        { key: '7-1', icon: <ContainerOutlined />, label: 'Plans', route: '/vip/plans' },
        { key: '7-2', icon: <GiftOutlined />, label: 'Package', route: '/vip/packages' },
        { key: '7-3', icon: <StarOutlined />, label: 'Features', route: '/vip/features' }
      ]
    },
    { key: '8', icon: <UserOutlined />, label: 'Profile', route: '/profile' },
    // Add other menu items as needed
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
      <Menu.Item key="1"><UnorderedListOutlined style={{ paddingRight: "1rem" }} /> Quản lý kho phim</Menu.Item>
      <Menu.Item key="2"><UserOutlined style={{ paddingRight: "1rem" }} />Tài khoản</Menu.Item>
      <Menu.Item onClick={handleClick} key="3"><LoginOutlined style={{ paddingRight: "1rem" }} /> Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" style={{ height: '50px' }}>
          <img src="https://assets.glxplay.io/web/images/logoglx.svg" alt="" style={{ height: '50px' }} />
        </div>
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          {menuItems.map(item => (
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map(child => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    <Link to={child.route} onClick={() => handleMenuClick(child.key)}>
                      {child.label}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.route} onClick={() => handleMenuClick(item.key)}>
                  {item.label}
                </Link>
              </Menu.Item>
            )
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: "0 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
          <Radio.Group value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
            <Radio value={"light"}>Light</Radio>
            <Radio value={"dark"}>Dark</Radio>
          </Radio.Group>
          <Dropdown overlay={menu}>
            <Button style={{ background: "none", border: "none", color: "white" }}>
              <Image style={{ width: "30px", height: "30px", borderRadius: "50%" }} src="https://assets.glxplay.io/static/avatars/avatar%20gp%20grb-07.jpg" alt="" /> <DownOutlined style={{ fontSize: "1rem" }} />
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/vip/plans" element={<Plans/>} />
              <Route path="/vip/packages" element={<Packages/>} />
              <Route path="/vip/features" element={<Features/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Admin ©2023 Created by You</Footer>
      </Layout>
    </Layout>
  );
};

export default HomeAdmin;

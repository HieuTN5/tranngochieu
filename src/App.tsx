import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Problem1 from './pages/Problem1';
import Problem2 from './pages/Problem2';
import Problem3 from './pages/Problem3';
import './App.css'
const { Header, Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Header className='header'>
          <Link className='logo' to={'/'}>
            <img height={72} src='https://www.99tech.co/assets/img/99Tech.png' alt='logo' />
          </Link>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <span><Link to={'/'}>Problem 1</Link></span>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <span><Link to={'/problem2'}>Problem 2</Link></span>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <span><Link to={'/problem3'}>Problem 3</Link></span>,
              },
            ]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>

          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Problem1 />} />
              <Route path="/problem2" element={<Problem2 />} />
              <Route path="/problem3" element={<Problem3 />} />
            </Routes>
          </div>
        </Content>

      </Layout>
    </Router>
  );
};

export default App;
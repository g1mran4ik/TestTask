import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';

import './CustomLayout.css';

export default function CustomLayout({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  return (
    <Layout className='layout'>
      <Header>
        <div className='layout-header'>
          <img width={50} height={50} src={require('../assets/logo.png')} alt='...' />
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[pathname]}
          items={
            [
              { label: <Link to={'/employees'}>Главная</Link>, key: '/employees' },
            ] as any[]
          }
        ></Menu>
      </Header>
      <Content className='content'>
        <div className='site-layout-content'>{children}</div>
      </Content>
      <Footer className='footer'>2023 Гимранов Руслан</Footer>
    </Layout>
  );
}

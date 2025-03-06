import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Store, BarChart2, User } from 'lucide-react';

const { Header, Sider, Content } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white shadow-md flex items-center justify-between px-6">
        <div className="flex items-center">
          <Store className="text-blue-600 h-8 w-8" />
          <span className="text-xl font-bold ml-2">ProductCompare</span>
        </div>
        <div className="flex items-center">
          <User className="h-6 w-6 text-gray-600" />
        </div>
      </Header>
      <AntLayout>
        <Sider width={200} className="bg-white">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="h-full border-r"
            items={[
              {
                key: '/',
                icon: <Store className="h-4 w-4" />,
                label: <Link to="/">Product Details</Link>,
              },
              {
                key: '/compare',
                icon: <BarChart2 className="h-4 w-4" />,
                label: <Link to="/compare">Compare Products</Link>,
              },
            ]}
          />
        </Sider>
        <Content className="p-6 bg-gray-50">{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
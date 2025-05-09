import React from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/jamaeya/Dashboard';
import { useWallet } from '../hooks/useWallet';
import { CircleDollarSign } from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { isConnected, connect } = useWallet();

  if (!isConnected) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
            <div className="mb-6">
              <CircleDollarSign className="mx-auto h-16 w-16 text-teal-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">اتصل بمحفظتك</h1>
            <p className="text-gray-600 mb-8">
              يجب عليك الاتصال بمحفظتك أولاً للوصول إلى لوحة التحكم وإدارة جمعياتك
            </p>
            <Button 
              variant="primary" 
              fullWidth 
              onClick={connect}
              size="lg"
            >
              اتصل بالمحفظة
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
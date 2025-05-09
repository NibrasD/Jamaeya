import React from 'react';
import Layout from '../components/layout/Layout';
import JoinForm from '../components/jamaeya/JoinForm';

const JoinPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">انضم إلى جمعية</h1>
          <p className="text-gray-600 text-center mb-8">
            انضم إلى مجموعة ادخار موجودة باستخدام رمز الدعوة
          </p>
          <JoinForm />
        </div>
      </div>
    </Layout>
  );
};

export default JoinPage;
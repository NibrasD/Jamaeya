import React from 'react';
import Layout from '../components/layout/Layout';
import CreateForm from '../components/jamaeya/CreateForm';

const CreatePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">إنشاء جمعية جديدة</h1>
          <p className="text-gray-600 text-center mb-8">
            أنشئ مجموعة ادخار جديدة وقم بدعوة الأصدقاء والعائلة للانضمام
          </p>
          <CreateForm />
        </div>
      </div>
    </Layout>
  );
};

export default CreatePage;
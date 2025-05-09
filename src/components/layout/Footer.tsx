import React from 'react';
import { CircleDollarSign, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 rtl:space-x-reverse">
              <CircleDollarSign size={24} />
              <span className="text-xl font-bold">جمعية</span>
            </div>
            <p className="mt-2 text-teal-200 text-sm text-center md:text-right">
              الطريقة الآمنة للادخار الجماعي على بلوكتشين سيلو
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-teal-200 hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="/create" className="text-teal-200 hover:text-white transition-colors">إنشاء جمعية</a></li>
                <li><a href="/join" className="text-teal-200 hover:text-white transition-colors">انضم إلى جمعية</a></li>
                <li><a href="/dashboard" className="text-teal-200 hover:text-white transition-colors">لوحة التحكم</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">الدعم</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-200 hover:text-white transition-colors">كيفية الاستخدام</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white transition-colors">التواصل معنا</a></li>
                <li><a href="#" className="text-teal-200 hover:text-white transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-teal-700 text-center">
          <p className="text-teal-300 flex items-center justify-center">
            صنع بكل <Heart size={16} className="mx-1 text-red-400" /> على شبكة سيلو
          </p>
          <p className="text-sm text-teal-400 mt-1">جميع الحقوق محفوظة © جمعية {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
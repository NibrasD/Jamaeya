import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleDollarSign, Users, Clock, ShieldCheck, TrendingUp, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const navigateToCreate = () => {
    navigate('/create');
  };
  
  const navigateToJoin = () => {
    navigate('/join');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              الادخار التعاوني الآمن على البلوكتشين
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              جمعية هي منصة لإنشاء دوائر ادخار تعاونية تدار بواسطة عقود ذكية. ادخر مع الأصدقاء والعائلة بثقة وأمان.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={navigateToCreate}
                rightIcon={<ArrowLeft size={18} />}
              >
                إنشاء جمعية
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={navigateToJoin}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                انضم إلى جمعية
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">كيف تعمل جمعية؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              جمعية هي طريقة موثوقة وشفافة للادخار الجماعي باستخدام تقنية البلوكتشين. إليك كيفية عملها:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">1. أنشئ أو انضم</h3>
              <p className="text-gray-600">
                أنشئ جمعية جديدة وحدد عدد الأعضاء والمبلغ والفترة، أو انضم إلى جمعية موجودة بواسطة رمز الدعوة.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleDollarSign className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">2. ساهم بانتظام</h3>
              <p className="text-gray-600">
                يساهم كل عضو بمبلغ ثابت في كل جولة. يتم تجميع المساهمات معًا في العقد الذكي.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3. استلم بدورك</h3>
              <p className="text-gray-600">
                في كل جولة، يستلم عضو واحد المبلغ الإجمالي. تستمر الدورة حتى يحصل كل عضو على فرصته.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">لماذا تختار جمعية؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نجمع بين التقاليد الثقافية للادخار الجماعي مع أمان وشفافية تقنية البلوكتشين
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <ShieldCheck className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">آمن ومحمي</h3>
              <p className="text-gray-600">
                العقود الذكية تضمن أن تتم جميع المعاملات بشكل آمن وموثوق. لا يمكن لأحد التلاعب بالأموال.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">خالٍ من الفوائد</h3>
              <p className="text-gray-600">
                وسيلة للادخار والحصول على مبالغ كبيرة دون دفع فوائد، متوافقة مع مبادئ التمويل الإسلامي.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">تعزيز الثقة</h3>
              <p className="text-gray-600">
                بناء المجتمع والثقة من خلال التعاون المالي. تقوية العلاقات الاجتماعية من خلال الدعم المتبادل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ابدأ رحلة الادخار الجماعي اليوم</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
            انضم إلى الآلاف من المستخدمين الذين يعتمدون على جمعية للادخار والتخطيط المالي
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={navigateToCreate}
            >
              إنشاء جمعية جديدة
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={navigateToJoin}
              className="border-teal-500 text-teal-100 hover:bg-teal-800"
            >
              انضم بواسطة رمز الدعوة
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
import React, { useState } from 'react';
import { Hash, Info } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

const JoinForm: React.FC = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      setError('الرجاء إدخال رمز الدعوة');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to join a jamaeya
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, check if the code is valid (in real app, this would be a server check)
      if (inviteCode.toLowerCase() === 'demo123') {
        navigate('/dashboard', { 
          state: { 
            success: true, 
            message: 'تم الانضمام إلى الجمعية بنجاح!',
            jamaeyaId: 'demo123'
          } 
        });
      } else {
        setError('رمز الدعوة غير صالح. الرجاء التحقق والمحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error joining jamaeya:', error);
      setError('حدث خطأ أثناء الانضمام. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">الانضمام إلى جمعية</h2>
          <button 
            onClick={toggleInfo}
            className="text-teal-600 hover:text-teal-700 focus:outline-none"
            aria-label="معلومات"
          >
            <Info size={20} />
          </button>
        </div>
      </CardHeader>
      
      <CardBody>
        {showInfo && (
          <div className="bg-teal-50 p-4 rounded-md mb-4 text-sm text-teal-800">
            <h3 className="font-medium mb-2">كيفية الانضمام للجمعية</h3>
            <p>للانضمام إلى جمعية، تحتاج إلى:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>الحصول على رمز الدعوة من منشئ الجمعية</li>
              <li>إدخال الرمز أدناه</li>
              <li>الاتصال بمحفظتك وتأكيد الانضمام</li>
              <li>المشاركة في الدفعات حسب الجدول المتفق عليه</li>
            </ol>
            <p className="mt-2">ملاحظة: للتجربة في النسخة التجريبية، استخدم الرمز "demo123"</p>
          </div>
        )}
        
        <form onSubmit={handleJoin}>
          <Input
            label="رمز الدعوة"
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            leftIcon={<Hash size={18} />}
            error={error}
            placeholder="أدخل رمز الدعوة"
            helper="أدخل رمز الدعوة الذي تلقيته من منشئ الجمعية"
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              انضم للجمعية
            </Button>
          </div>
        </form>
      </CardBody>
      
      <CardFooter className="text-center text-sm text-gray-600">
        <p>
          لإنشاء جمعية خاصة بك، 
          <a href="/create" className="text-teal-600 hover:text-teal-700 mx-1">
            انقر هنا
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default JoinForm;
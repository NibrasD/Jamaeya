import React, { useState } from 'react';
import { Users, Calendar, Coins, ArrowLeft, ChevronsUpDown, Shuffle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

interface FormData {
  memberCount: number;
  amount: number;
  interval: 'weekly' | 'monthly';
  payoutOrder: 'fixed' | 'random';
}

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    memberCount: 5,
    amount: 10,
    interval: 'monthly',
    payoutOrder: 'fixed',
  });

  const [errors, setErrors] = useState<{
    memberCount?: string;
    amount?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate input fields
    if (name === 'memberCount') {
      const count = parseInt(value, 10);
      if (isNaN(count) || count < 2) {
        setErrors({ ...errors, memberCount: 'يجب أن يكون عدد الأعضاء على الأقل 2' });
      } else if (count > 20) {
        setErrors({ ...errors, memberCount: 'الحد الأقصى للأعضاء هو 20' });
      } else {
        setErrors({ ...errors, memberCount: undefined });
      }
    }
    
    if (name === 'amount') {
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        setErrors({ ...errors, amount: 'يجب أن يكون المبلغ أكبر من 0' });
      } else {
        setErrors({ ...errors, amount: undefined });
      }
    }
    
    setFormData({
      ...formData,
      [name]: name === 'memberCount' || name === 'amount' ? parseFloat(value) : value,
    });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.memberCount || formData.memberCount < 2) {
        setErrors({ ...errors, memberCount: 'يجب إدخال عدد صحيح للأعضاء' });
        return;
      }
      if (!formData.amount || formData.amount <= 0) {
        setErrors({ ...errors, amount: 'يجب إدخال مبلغ صحيح' });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create a new jamaeya
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          success: true, 
          message: 'تم إنشاء الجمعية بنجاح!',
          jamaeyaId: Math.random().toString(36).substring(2, 10)
        } 
      });
    } catch (error) {
      console.error('Error creating jamaeya:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalAmount = () => {
    return formData.memberCount * formData.amount;
  };

  const renderStepOne = () => (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">تفاصيل الجمعية</h2>
        <p className="text-gray-600 text-sm mt-1">
          قم بإدخال معلومات الجمعية الأساسية
        </p>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="space-y-4">
          <Input
            label="عدد الأعضاء"
            name="memberCount"
            type="number"
            min={2}
            max={20}
            value={formData.memberCount}
            onChange={handleChange}
            leftIcon={<Users size={18} />}
            error={errors.memberCount}
            helper="الحد الأدنى 2 والحد الأقصى 20 عضو"
          />

          <Input
            label="مبلغ المساهمة الشهرية (cUSD)"
            name="amount"
            type="number"
            min={1}
            step={0.1}
            value={formData.amount}
            onChange={handleChange}
            leftIcon={<Coins size={18} />}
            error={errors.amount}
            helper="مبلغ المساهمة بعملة cUSD"
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button onClick={nextStep} rightIcon={<ArrowLeft size={16} />}>
          التالي
        </Button>
      </CardFooter>
    </>
  );

  const renderStepTwo = () => (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">إعدادات الجمعية</h2>
        <p className="text-gray-600 text-sm mt-1">
          حدد الفترة وترتيب الدفع
        </p>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              فترة الدفع
            </label>
            <div className="relative">
              <select
                name="interval"
                value={formData.interval}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm appearance-none pr-10"
              >
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-gray-500">
                <Calendar size={18} />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 rtl:right-auto rtl:left-0 rtl:pl-3 flex items-center pointer-events-none text-gray-500">
                <ChevronsUpDown size={18} />
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">فترة الدفع بين الأعضاء</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              ترتيب الدفع
            </label>
            <div className="relative">
              <select
                name="payoutOrder"
                value={formData.payoutOrder}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm appearance-none pr-10"
              >
                <option value="fixed">ثابت (حسب ترتيب الانضمام)</option>
                <option value="random">عشوائي</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-gray-500">
                <Shuffle size={18} />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 rtl:right-auto rtl:left-0 rtl:pl-3 flex items-center pointer-events-none text-gray-500">
                <ChevronsUpDown size={18} />
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">ترتيب استلام المبلغ الإجمالي</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          السابق
        </Button>
        <Button onClick={nextStep} rightIcon={<ArrowLeft size={16} />}>
          التالي
        </Button>
      </CardFooter>
    </>
  );

  const renderStepThree = () => (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">تأكيد إنشاء الجمعية</h2>
        <p className="text-gray-600 text-sm mt-1">
          راجع المعلومات وأكد إنشاء الجمعية
        </p>
      </CardHeader>
      <CardBody>
        <div className="bg-teal-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-teal-800 mb-2">ملخص الجمعية</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">عدد الأعضاء:</span>
              <span className="font-medium">{formData.memberCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">مبلغ المساهمة:</span>
              <span className="font-medium">{formData.amount} cUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ الإجمالي:</span>
              <span className="font-medium">{calculateTotalAmount()} cUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">فترة الدفع:</span>
              <span className="font-medium">{formData.interval === 'weekly' ? 'أسبوعي' : 'شهري'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ترتيب الدفع:</span>
              <span className="font-medium">{formData.payoutOrder === 'fixed' ? 'ثابت' : 'عشوائي'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المدة الإجمالية:</span>
              <span className="font-medium">
                {formData.memberCount} {formData.interval === 'weekly' ? 'أسبوع' : 'شهر'}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          بالضغط على "إنشاء الجمعية"، سيتم إنشاء عقد ذكي لإدارة الجمعية. سيتعين عليك بعد ذلك مشاركة رابط الدعوة مع الأعضاء للانضمام.
        </p>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          السابق
        </Button>
        <Button 
          onClick={handleSubmit} 
          isLoading={isSubmitting}
        >
          إنشاء الجمعية
        </Button>
      </CardFooter>
    </>
  );

  return (
    <Card className="max-w-md mx-auto">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="h-2 bg-gray-200 rounded-full flex-grow mx-1">
              <div 
                className={`h-full bg-teal-500 rounded-full transition-all duration-300 ease-in-out ${
                  step >= 1 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full flex-grow mx-1">
              <div 
                className={`h-full bg-teal-500 rounded-full transition-all duration-300 ease-in-out ${
                  step >= 2 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full flex-grow mx-1">
              <div 
                className={`h-full bg-teal-500 rounded-full transition-all duration-300 ease-in-out ${
                  step >= 3 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8">
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </div>
    </Card>
  );
};

export default CreateForm;
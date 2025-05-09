import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Search, AlertCircle, X, CreditCard } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GroupCard from './GroupCard';
import Card, { CardBody } from '../ui/Card';
import { JamaeyaGroup } from '../../types';
import { useJamaeya } from '../../hooks/useJamaeya';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groups, isLoading, depositToGroup } = useJamaeya();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  useEffect(() => {
    // Check for success message from navigation state
    if (location.state && location.state.success) {
      setAlertMessage(location.state.message);
      setShowAlert(true);
      
      // Clear the state after showing the alert
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const dismissAlert = () => {
    setShowAlert(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.inviteCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    navigate('/create');
  };

  const handleOpenDepositModal = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsDepositModalOpen(true);
  };

  const handleDeposit = async () => {
    if (!selectedGroupId) return;
    
    try {
      await depositToGroup(selectedGroupId);
      setAlertMessage('تم الإيداع بنجاح!');
      setShowAlert(true);
      setIsDepositModalOpen(false);
    } catch (error) {
      console.error('Error making deposit:', error);
      setAlertMessage('حدث خطأ أثناء الإيداع. الرجاء المحاولة مرة أخرى.');
      setShowAlert(true);
    }
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setSelectedGroupId(null);
  };

  const selectedGroup = selectedGroupId 
    ? groups.find(g => g.id === selectedGroupId) 
    : null;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Alert */}
      {showAlert && (
        <div className="mb-6 bg-teal-50 border-l-4 border-teal-500 p-4 rounded shadow-sm relative animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3 rtl:mr-3 rtl:ml-0">
              <p className="text-sm text-teal-800">{alertMessage}</p>
            </div>
            <button
              className="absolute top-2 right-2 rtl:left-2 rtl:right-auto text-teal-600 hover:text-teal-800"
              onClick={dismissAlert}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">لوحة التحكم</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
          <div className="w-full sm:w-64">
            <Input
              placeholder="ابحث عن جمعية..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={<Search size={18} />}
            />
          </div>
          <Button
            leftIcon={<Plus size={18} />}
            onClick={handleCreateGroup}
          >
            إنشاء جمعية
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4 rtl:space-x-reverse">
            <div className="h-10 w-10 bg-teal-200 rounded-full"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-teal-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-teal-200 rounded"></div>
                <div className="h-4 bg-teal-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onDeposit={handleOpenDepositModal}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardBody>
            <div className="mx-auto w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full mb-4">
              <CircleDollarSign size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">لا توجد جمعيات</h2>
            <p className="text-gray-500 mb-6">لم تنضم إلى أي جمعية بعد أو أنشئت واحدة</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="primary"
                onClick={handleCreateGroup}
                leftIcon={<Plus size={18} />}
              >
                إنشاء جمعية جديدة
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/join')}
              >
                انضم إلى جمعية
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Deposit Modal */}
      {isDepositModalOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={closeDepositModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <CreditCard className="h-6 w-6 text-teal-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    إيداع للجولة الحالية
                  </h3>
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="mb-4">
                      أنت على وشك إيداع <span className="font-bold text-teal-600">{selectedGroup.amount} cUSD</span> للجولة <span className="font-bold">{selectedGroup.currentRound}</span> من جمعية <span className="font-bold">{selectedGroup.name}</span>.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between mb-1">
                        <span>الجمعية:</span>
                        <span className="font-medium">{selectedGroup.name}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>المبلغ:</span>
                        <span className="font-medium">{selectedGroup.amount} cUSD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الجولة الحالية:</span>
                        <span className="font-medium">{selectedGroup.currentRound} من {selectedGroup.totalRounds}</span>
                      </div>
                    </div>
                    <p>سيتم خصم المبلغ من محفظتك. تأكد من وجود رصيد كافي.</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <Button
                  variant="primary"
                  onClick={handleDeposit}
                  className="sm:col-start-2"
                >
                  تأكيد الإيداع
                </Button>
                <Button
                  variant="outline"
                  onClick={closeDepositModal}
                  className="mt-3 sm:mt-0"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { 
  CircleDollarSign, 
  Users, 
  Clock, 
  CreditCard, 
  Share2, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { JamaeyaGroup } from '../../types';

interface GroupCardProps {
  group: JamaeyaGroup;
  onDeposit?: (groupId: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onDeposit }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    alert('تم نسخ رمز الدعوة!');
  };

  const handleDeposit = () => {
    if (onDeposit) {
      onDeposit(group.id);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (group.currentRound / group.totalRounds) * 100;
  
  // Determine if user has already received payout
  const hasReceivedPayout = group.payoutSchedule.some(
    payout => payout.address === 'user_address' && payout.paid
  );
  
  // Determine if user needs to deposit this round
  const needsDeposit = !group.deposits.find(
    deposit => deposit.round === group.currentRound && deposit.address === 'user_address'
  );
  
  // Determine next payout recipient
  const nextPayoutRecipient = group.payoutSchedule.find(
    payout => payout.round === group.currentRound
  );
  
  // Determine if user is next recipient
  const isNextRecipient = nextPayoutRecipient?.address === 'user_address';

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card className="overflow-hidden border border-gray-200 hover:border-teal-300 transition-colors">
        <CardHeader className="bg-gradient-to-l from-teal-600 to-teal-500 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <CircleDollarSign size={20} className="ml-2" />
              {group.name}
            </h3>
            <div className="bg-white text-teal-600 text-xs font-semibold px-2 py-1 rounded-full">
              {group.interval === 'weekly' ? 'أسبوعي' : 'شهري'}
            </div>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="space-y-4">
            {/* Group Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>التقدم</span>
                <span className="font-medium">
                  الجولة {group.currentRound} من {group.totalRounds}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Group Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Users size={16} className="ml-2 text-gray-500" />
                <span>{group.memberCount} أعضاء</span>
              </div>
              <div className="flex items-center">
                <CreditCard size={16} className="ml-2 text-gray-500" />
                <span>{group.amount} cUSD / جولة</span>
              </div>
              <div className="flex items-center">
                <CircleDollarSign size={16} className="ml-2 text-gray-500" />
                <span>{group.amount * group.memberCount} cUSD مجموع</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="ml-2 text-gray-500" />
                <span>
                  {formatDate(group.nextPaymentDate)}
                </span>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className={`p-3 rounded-md ${
              needsDeposit ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center">
                {needsDeposit ? (
                  <>
                    <XCircle size={18} className="ml-2 text-amber-500" />
                    <span className="text-amber-800 text-sm">
                      يجب عليك إيداع {group.amount} cUSD للجولة الحالية
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} className="ml-2 text-green-500" />
                    <span className="text-green-800 text-sm">
                      لقد أكملت الإيداع لهذه الجولة
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Next Payout Info */}
            <div className="p-3 rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-1">مستلم الدفعة القادمة:</h4>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${isNextRecipient ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm">
                  {isNextRecipient ? 
                    'أنت ستستلم الدفعة القادمة!' : 
                    `${nextPayoutRecipient?.name || 'عضو آخر'}`
                  }
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="bg-gray-50 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 size={16} />}
            onClick={openShareModal}
          >
            مشاركة
          </Button>
          
          {needsDeposit && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleDeposit}
            >
              إيداع {group.amount} cUSD
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={closeShareModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <Share2 className="h-6 w-6 text-teal-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    دعوة أصدقاء للانضمام
                  </h3>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">رمز الدعوة:</p>
                    <div className="flex">
                      <input
                        type="text"
                        readOnly
                        value={group.inviteCode}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-center font-mono"
                      />
                      <button
                        onClick={copyInviteCode}
                        className="bg-teal-600 text-white px-3 py-2 rounded-r-md hover:bg-teal-700 transition-colors"
                      >
                        نسخ
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      شارك هذا الرمز مع الأشخاص الذين تريد دعوتهم للانضمام إلى الجمعية.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={closeShareModal}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupCard;
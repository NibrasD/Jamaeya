import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import Button from '../ui/Button';
import { useWallet } from '../../hooks/useWallet';

const WalletButton: React.FC = () => {
  const { isConnected, connect, disconnect, account, balance } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      setIsModalOpen(true);
    } else {
      connect();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Format the account address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const truncatedAddress = formatAddress(account);

  return (
    <>
      <Button
        variant={isConnected ? 'outline' : 'primary'}
        size="md"
        leftIcon={<Wallet size={18} />}
        onClick={handleConnect}
        className={isConnected ? 'bg-white border-teal-500 text-teal-600' : ''}
      >
        {isConnected ? `${truncatedAddress} (${balance} cUSD)` : 'اتصل بالمحفظة'}
      </Button>

      {/* Wallet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={handleCloseModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <Wallet className="h-6 w-6 text-teal-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    معلومات المحفظة
                  </h3>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">العنوان:</p>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded-md mb-3 break-all">
                      {account}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">الرصيد:</p>
                    <p className="text-lg font-medium">{balance} cUSD</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 space-y-2">
                <Button
                  variant="danger"
                  size="md"
                  fullWidth
                  onClick={handleDisconnect}
                >
                  قطع الاتصال
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleCloseModal}
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

export default WalletButton;
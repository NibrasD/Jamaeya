import { useState, useEffect, useCallback } from 'react';

interface UseWalletReturn {
  isConnected: boolean;
  account: string;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// Mock wallet implementation for MVP
export const useWallet = (): UseWalletReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    // Check if user was previously connected
    const savedConnection = localStorage.getItem('walletConnected');
    if (savedConnection === 'true') {
      const savedAccount = localStorage.getItem('walletAccount');
      const savedBalance = localStorage.getItem('walletBalance');
      
      if (savedAccount) {
        setIsConnected(true);
        setAccount(savedAccount);
        setBalance(savedBalance ? parseFloat(savedBalance) : 100);
      }
    }
  }, []);

  const connect = useCallback(async (): Promise<void> => {
    // Simulate wallet connection
    try {
      // Mock loading time for connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock wallet address
      const mockAccount = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      // Set mock balance between 50 and 500 cUSD
      const mockBalance = Math.floor(Math.random() * 450) + 50;
      
      setIsConnected(true);
      setAccount(mockAccount);
      setBalance(mockBalance);
      
      // Save connection status
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAccount', mockAccount);
      localStorage.setItem('walletBalance', mockBalance.toString());
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }, []);

  const disconnect = useCallback((): void => {
    setIsConnected(false);
    setAccount('');
    setBalance(0);
    
    // Clear saved connection status
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAccount');
    localStorage.removeItem('walletBalance');
  }, []);

  return {
    isConnected,
    account,
    balance,
    connect,
    disconnect
  };
};
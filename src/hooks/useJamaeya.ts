import { useState, useEffect, useCallback } from 'react';
import { JamaeyaGroup } from '../types';

interface UseJamaeyaReturn {
  groups: JamaeyaGroup[];
  isLoading: boolean;
  depositToGroup: (groupId: string) => Promise<void>;
}

// Mock implementation for demo purposes
export const useJamaeya = (): UseJamaeyaReturn => {
  const [groups, setGroups] = useState<JamaeyaGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if we have any demo groups
        const demoState = localStorage.getItem('demoJamaeyaGroups');
        
        if (demoState) {
          setGroups(JSON.parse(demoState));
        } else {
          // Create some demo groups
          const mockGroups: JamaeyaGroup[] = [
            {
              id: 'demo123',
              name: 'جمعية الأصدقاء',
              memberCount: 5,
              amount: 10,
              interval: 'monthly',
              payoutOrder: 'fixed',
              inviteCode: 'demo123',
              currentRound: 2,
              totalRounds: 5,
              nextPaymentDate: new Date(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              deposits: [
                {
                  round: 1,
                  address: 'user_address',
                  amount: 10,
                  timestamp: new Date(
                    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                  ).toISOString()
                }
              ],
              payoutSchedule: [
                {
                  round: 1,
                  address: 'member1',
                  name: 'أحمد',
                  paid: true,
                  amount: 50,
                  timestamp: new Date(
                    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                  ).toISOString()
                },
                {
                  round: 2,
                  address: 'user_address',
                  name: 'أنت',
                  paid: false,
                  amount: 50,
                  timestamp: ''
                },
                {
                  round: 3,
                  address: 'member3',
                  name: 'سارة',
                  paid: false,
                  amount: 50,
                  timestamp: ''
                },
                {
                  round: 4,
                  address: 'member4',
                  name: 'محمد',
                  paid: false,
                  amount: 50,
                  timestamp: ''
                },
                {
                  round: 5,
                  address: 'member5',
                  name: 'فاطمة',
                  paid: false,
                  amount: 50,
                  timestamp: ''
                }
              ]
            },
            {
              id: 'family456',
              name: 'جمعية العائلة',
              memberCount: 4,
              amount: 25,
              interval: 'monthly',
              payoutOrder: 'random',
              inviteCode: 'family456',
              currentRound: 1,
              totalRounds: 4,
              nextPaymentDate: new Date(
                new Date().getTime() + 14 * 24 * 60 * 60 * 1000
              ).toISOString(),
              deposits: [],
              payoutSchedule: [
                {
                  round: 1,
                  address: 'member1',
                  name: 'خالد',
                  paid: false,
                  amount: 100,
                  timestamp: ''
                },
                {
                  round: 2,
                  address: 'member2',
                  name: 'نورة',
                  paid: false,
                  amount: 100,
                  timestamp: ''
                },
                {
                  round: 3,
                  address: 'member3',
                  name: 'عبدالله',
                  paid: false,
                  amount: 100,
                  timestamp: ''
                },
                {
                  round: 4,
                  address: 'user_address',
                  name: 'أنت',
                  paid: false,
                  amount: 100,
                  timestamp: ''
                }
              ]
            }
          ];
          
          setGroups(mockGroups);
          localStorage.setItem('demoJamaeyaGroups', JSON.stringify(mockGroups));
        }
      } catch (error) {
        console.error('Error fetching jamaeya groups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGroups();
  }, []);

  const depositToGroup = useCallback(async (groupId: string): Promise<void> => {
    // Find the group
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update the group with the new deposit
    const updatedGroups = groups.map(g => {
      if (g.id === groupId) {
        // Add deposit record
        const newDeposit = {
          round: g.currentRound,
          address: 'user_address',
          amount: g.amount,
          timestamp: new Date().toISOString()
        };
        
        return {
          ...g,
          deposits: [...g.deposits, newDeposit]
        };
      }
      return g;
    });
    
    setGroups(updatedGroups);
    localStorage.setItem('demoJamaeyaGroups', JSON.stringify(updatedGroups));
  }, [groups]);

  return {
    groups,
    isLoading,
    depositToGroup
  };
};
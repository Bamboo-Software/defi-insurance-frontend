/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { AlertCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useGetInsuranceTransactionsQuery } from '@/app/services/insurance/transaction';
import { PurchaseStatusEnum, PayoutStatusEnum } from '@/types/enums/common.enum';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import PolicyCard from './components/PolicyCard';
import EmptyState from './components/EmptyState';
import StatisticsSection from './components/StatisticsSection';
import CTASection from './components/CTASection';

type StatusType = 'all' | 'active' | 'expired' | 'pending' | 'claimed';

// Main Component
const MyInsurance = () => {
  const [activeTab, setActiveTab] = useState<StatusType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isConnected, address } = useAccount();
  
  const { data: transactionsData, isLoading, error } = useGetInsuranceTransactionsQuery({
    walletAddress: isConnected ? address || '' : '',
    page: 1,
    limit: 50,
    q: '',
    type: 'insurance_purchase'
  });
  
  // Xử lý trạng thái loading và error
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-foreground/70">Loading your insurance contracts...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-card border border-destructive/20 rounded-lg">
          <AlertCircleIcon className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Please connect your wallet</h2>
          <p className="text-foreground/70 mb-4">
            Please connect your wallet to load your insurance contracts.
          </p>
          {/* <Button variant="outline">
            Connect Wallet
          </Button> */}
        </div>
      </div>
    );
  }else if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-card border border-destructive/20 rounded-lg">
          <AlertCircleIcon className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-foreground/70 mb-4">
            We couldn't load your insurance contracts. Please try again later.
          </p>
          <Button variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  
  const transactions = transactionsData?.data.items || [];
  
  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions
    .filter((transaction: any) => {
      if (activeTab === 'all') return true;
      
      const now = new Date();
      const endDate = new Date(transaction.insuredPeriod.end);
      
      switch (activeTab) {
        case 'active':
          return transaction.purchaseStatus === PurchaseStatusEnum.PAID && endDate > now && transaction.payoutStatus !== PayoutStatusEnum.COMPLETED;
        case 'expired':
          return endDate < now && transaction.payoutStatus !== PayoutStatusEnum.COMPLETED;
        case 'pending':
          return transaction.purchaseStatus === PurchaseStatusEnum.AWAITING_PAYMENT;
        case 'claimed':
          return transaction.payoutStatus === PayoutStatusEnum.COMPLETED;
        default:
          return true;
      }
    })
    .filter((transaction: any) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        transaction.package.name.toLowerCase().includes(query) ||
        transaction._id.toLowerCase().includes(query) ||
        transaction.package.riskType.toLowerCase().includes(query)
      );
    });

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <FilterBar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          <div className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction: any, index: number) => (
                <PolicyCard key={transaction._id} transaction={transaction} index={index} />
              ))
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </section>

      <StatisticsSection transactions={transactions} />
      <CTASection />
    </div>
  );
};

export default MyInsurance;
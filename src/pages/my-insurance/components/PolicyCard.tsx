/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlowButton } from "@/components/ui/glow-button";
import { formatDate } from "@/lib/utils/dateUtils";
import { motion } from "framer-motion";
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, FileTextIcon, PlusIcon, ShieldIcon } from "lucide-react";

interface PolicyCardProps {
  transaction: any;
  index: number;
}

const PolicyCard = ({ transaction, index }: PolicyCardProps) => {
  const mapStatusFromTransaction = (transaction: any): 'active' | 'expired' | 'pending' | 'claimed' => {
    const now = new Date();
    const endDate = new Date(transaction.insuredPeriod.end);
    
    if (transaction.payoutStatus === 'completed') {
      return 'claimed';
    } else if (transaction.purchaseStatus === 'awaiting_payment') {
      return 'pending';
    } else if (endDate < now) {
      return 'expired';
    } else {
      return 'active';
    }
  };
  
  const status = mapStatusFromTransaction(transaction);
  
  const getStatusDetails = (status: 'active' | 'expired' | 'pending' | 'claimed') => {
    switch (status) {
      case 'active':
        return { 
          icon: <CheckCircleIcon className="h-5 w-5" />, 
          color: 'text-green-500',
          bgColor: 'bg-green-500/10'
        };
      case 'expired':
        return { 
          icon: <AlertCircleIcon className="h-5 w-5" />, 
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10'
        };
      case 'pending':
        return { 
          icon: <ClockIcon className="h-5 w-5" />, 
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10'
        };
      case 'claimed':
        return { 
          icon: <FileTextIcon className="h-5 w-5" />, 
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10'
        };
      default:
        return { 
          icon: <ShieldIcon className="h-5 w-5" />, 
          color: 'text-primary',
          bgColor: 'bg-primary/10'
        };
    }
  };

  
  const { icon, color, bgColor } = getStatusDetails(status);
  const packageData = transaction.package;
  
  return (
    <motion.div
      key={transaction._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="border border-border hover:border-primary/30 transition-all duration-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Phần bên trái với chi tiết hợp đồng */}
            <div className="md:col-span-9 p-6">
              <div className="flex items-start gap-4">
                <div className={`${bgColor} p-3 rounded-full`}>
                  <ShieldIcon className={`h-6 w-6 ${color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{packageData.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <span>ID: {transaction._id.substring(0, 8)}</span>
                        <span className="text-foreground/30">•</span>
                        <span>{packageData.riskType}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1.5 ${color} text-sm font-medium px-3 py-1 rounded-full ${bgColor}`}>
                      {icon}
                      <span className="capitalize">
                        {status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/70 mb-4">
                    {packageData.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-foreground/50 mb-1">Coverage Amount</div>
                      <div className="font-medium">{transaction.payoutAmount} {transaction.cryptoCurrency}</div>
                    </div>
                    <div>
                      <div className="text-foreground/50 mb-1">Premium</div>
                      <div className="font-medium">{transaction.paidAmount} {transaction.cryptoCurrency}</div>
                    </div>
                    <div>
                      <div className="text-foreground/50 mb-1">Start Date</div>
                      <div className="font-medium">{formatDate(transaction.insuredPeriod.start)}</div>
                    </div>
                    <div>
                      <div className="text-foreground/50 mb-1">End Date</div>
                      <div className="font-medium">{formatDate(transaction.insuredPeriod.end)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phần bên phải với các hành động */}
            <div className="md:col-span-3 bg-card/50 border-t md:border-t-0 md:border-l border-border flex flex-col justify-center p-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                
                {status === 'active' && (
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircleIcon className="mr-2 h-4 w-4" />
                    File Claim
                  </Button>
                )}
                
                {status === 'expired' && (
                  <GlowButton className="w-full justify-start">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Renew Contract
                  </GlowButton>
                )}
                
                {status === 'pending' && (
                  <Button variant="outline" className="w-full justify-start">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    Check Status
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PolicyCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlowButton } from "@/components/ui/glow-button";
import { formatDate } from "@/lib/utils/dateUtils";
import { motion } from "framer-motion";
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, FileTextIcon, PlusIcon, ShieldIcon, HelpCircleIcon } from "lucide-react";
import { PurchaseStatusEnum, PayoutStatusEnum } from "@/types/enums/common.enum";
import PolicyDetailsModal from "./PolicyDetailsModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PolicyCardProps {
  transaction: any;
  index: number;
}

const PolicyCard = ({ transaction, index }: PolicyCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy thông tin trạng thái từ purchaseStatus
  const getPurchaseStatusDetails = (status: string) => {
    switch (status) {
      case PurchaseStatusEnum.PAID:
        return { 
          icon: <CheckCircleIcon className="h-5 w-5" />, 
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          label: 'Paid',
          description: 'Payment has been successfully processed and confirmed.'
        };
      case PurchaseStatusEnum.AWAITING_PAYMENT:
        return { 
          icon: <ClockIcon className="h-5 w-5" />, 
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          label: 'Awaiting Payment',
          description: 'Your payment is being processed or waiting for confirmation.'
        };
      case PurchaseStatusEnum.PAYOUT_FAILED:
        return { 
          icon: <AlertCircleIcon className="h-5 w-5" />, 
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          label: 'Payout Failed',
          description: 'There was an issue processing the payout. Please contact support.'
        };
      default:
        return { 
          icon: <ShieldIcon className="h-5 w-5" />, 
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          label: 'Unknown',
          description: 'Status information is not available.'
        };
    }
  };
  
  // Lấy thông tin trạng thái từ payoutStatus
  const getPayoutStatusDetails = (status: string) => {
    switch (status) {
      case PayoutStatusEnum.PENDING:
        return { 
          icon: <ClockIcon className="h-5 w-5" />, 
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          label: 'Pending',
          description: 'Your claim is being processed and is pending review.'
        };
      case PayoutStatusEnum.PAID:
        return { 
          icon: <FileTextIcon className="h-5 w-5" />, 
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10',
          label: 'Paid',
          description: 'Your claim has been approved and payment has been issued.'
        };
      case PayoutStatusEnum.EXPIRED:
        return { 
          icon: <AlertCircleIcon className="h-5 w-5" />, 
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
          label: 'Expired',
          description: 'The insurance policy has expired and is no longer active.'
        };
      case PayoutStatusEnum.REJECTED:
        return { 
          icon: <AlertCircleIcon className="h-5 w-5" />, 
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          label: 'Rejected',
          description: 'Your claim has been reviewed and was not approved.'
        };
      case PayoutStatusEnum.COMPLETED:
        return { 
          icon: <FileTextIcon className="h-5 w-5" />, 
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10',
          label: 'Completed',
          description: 'The claim process has been completed successfully.'
        };
      default:
        return { 
          icon: <ShieldIcon className="h-5 w-5" />, 
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          label: 'Unknown',
          description: 'Status information is not available.'
        };
    }
  };
  
  // Kiểm tra xem hợp đồng đã hết hạn chưa
  const isExpired = () => {
    const now = new Date();
    const endDate = new Date(transaction.insuredPeriod.end);
    return endDate < now;
  };
  
  const purchaseStatusDetails = getPurchaseStatusDetails(transaction.purchaseStatus);
  const payoutStatusDetails = getPayoutStatusDetails(transaction.payoutStatus);

  
  const packageData = transaction.package;
  
  return (
    <>
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
                  <div className={`${purchaseStatusDetails.bgColor} p-3 rounded-full`}>
                    <ShieldIcon className={`h-6 w-6 ${purchaseStatusDetails.color}`} />
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
                      
                      <div className="flex flex-col gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={`flex items-center gap-1.5 ${purchaseStatusDetails.color} text-sm font-medium px-3 py-1 rounded-full ${purchaseStatusDetails.bgColor} cursor-help`}>
                                {purchaseStatusDetails.icon}
                                <span>
                                  <span className="font-semibold">Purchase:</span> {purchaseStatusDetails.label}
                                </span>
                                <HelpCircleIcon className="h-3.5 w-3.5 ml-1 opacity-70" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{purchaseStatusDetails.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={`flex items-center gap-1.5 ${payoutStatusDetails.color} text-sm font-medium px-3 py-1 rounded-full ${payoutStatusDetails.bgColor} cursor-help`}>
                                {payoutStatusDetails.icon}
                                <span>
                                  <span className="font-semibold">Payout:</span> {payoutStatusDetails.label}
                                </span>
                                <HelpCircleIcon className="h-3.5 w-3.5 ml-1 opacity-70" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{payoutStatusDetails.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {isExpired() && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5 text-orange-500 text-sm font-medium px-3 py-1 rounded-full bg-orange-500/10 cursor-help">
                                  <AlertCircleIcon className="h-5 w-5" />
                                  <span><span className="font-semibold">Status:</span> Expired</span>
                                  <HelpCircleIcon className="h-3.5 w-3.5 ml-1 opacity-70" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This insurance policy has expired and is no longer active. You may renew it if eligible.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FileTextIcon className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  
                  {transaction.purchaseStatus === PurchaseStatusEnum.PAID && !isExpired() && transaction.payoutStatus !== PayoutStatusEnum.PAID && (
                    <Button variant="outline" className="w-full justify-center">
                      <AlertCircleIcon className="mr-1 h-4 w-4" />
                      File Claim
                    </Button>
                  )}
                  
                  {isExpired() && transaction.payoutStatus !== PayoutStatusEnum.PAID && (
                    <GlowButton className="w-full justify-start">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Renew Contract
                    </GlowButton>
                  )}
                  
                  {transaction.purchaseStatus === PurchaseStatusEnum.AWAITING_PAYMENT && (
                    <Button variant="outline" className="w-full justify-start">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      Complete Payment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <PolicyDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={transaction} 
      />
    </>
  );
};

export default PolicyCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldIcon, AlertCircleIcon, FileTextIcon, ClockIcon, CheckCircleIcon, HelpCircleIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/dateUtils';
import { PurchaseStatusEnum, PayoutStatusEnum } from '@/types/enums/common.enum';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PolicyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
}

const PolicyDetailsModal = ({ isOpen, onClose, transaction }: PolicyDetailsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  // Kiểm tra xem hợp đồng đã hết hạn chưa
  const isExpired = () => {
    const now = new Date();
    const endDate = new Date(transaction.insuredPeriod.end);
    return endDate < now;
  };

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
  
  const purchaseStatusDetails = getPurchaseStatusDetails(transaction.purchaseStatus);
  const payoutStatusDetails = getPayoutStatusDetails(transaction.payoutStatus);
  const packageData = transaction.package;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl max-h-full overflow-auto"
            ref={modalRef}
          >
            <Card className="border border-border shadow-lg">
              <CardContent className="p-0">
                <div className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`${purchaseStatusDetails.bgColor} p-3 rounded-full`}>
                        <ShieldIcon className={`h-6 w-6 ${purchaseStatusDetails.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold">{packageData.name}</h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Insurance Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">ID</div>
                          <div className="font-medium">{transaction._id}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Risk Type</div>
                          <div className="font-medium capitalize">{transaction.riskType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Description</div>
                          <div className="font-medium">{packageData.description}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Status</div>
                          <div className="space-y-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className={`inline-flex items-center gap-1.5 ${purchaseStatusDetails.color} text-sm font-medium px-3 py-1 rounded-full ${purchaseStatusDetails.bgColor} cursor-help`}>
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
                                  <div className={`inline-flex items-center gap-1.5 ${payoutStatusDetails.color} text-sm font-medium px-3 py-1 rounded-full ${payoutStatusDetails.bgColor} cursor-help`}>
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
                                    <div className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-medium px-3 py-1 rounded-full bg-orange-500/10 cursor-help">
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
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contract Details</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Insurance Amount</div>
                          <div className="font-medium">{transaction.payoutAmount} {transaction.cryptoCurrency}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Premium</div>
                          <div className="font-medium">{transaction.paidAmount} {transaction.cryptoCurrency}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Start Date</div>
                          <div className="font-medium">{formatDate(transaction.insuredPeriod.start)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">End Date</div>
                          <div className="font-medium">{formatDate(transaction.insuredPeriod.end)}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Location Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Province/City</div>
                          <div className="font-medium">{transaction.locationSnapshot.province}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Coordinates</div>
                          <div className="font-medium">
                            {transaction.locationSnapshot.coordinates.lat}, {transaction.locationSnapshot.coordinates.lng}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Status Details</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Purchase Status</div>
                          <div className="font-medium">{purchaseStatusDetails.label}</div>
                          <div className="text-sm text-foreground/70 mt-1">{purchaseStatusDetails.description}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Payout Status</div>
                          <div className="font-medium">{payoutStatusDetails.label}</div>
                          <div className="text-sm text-foreground/70 mt-1">{payoutStatusDetails.description}</div>
                        </div>
                        {isExpired() && (
                          <div>
                            <div className="text-sm text-foreground/50">Expiration</div>
                            <div className="font-medium text-orange-500">Expired on {formatDate(transaction.insuredPeriod.end)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Wallet Address</div>
                          <div className="font-medium break-all">{transaction.walletAddress}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Blockchain Network</div>
                          <div className="font-medium capitalize">{transaction.chain}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Transaction Details</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Purchase Date</div>
                          <div className="font-medium">{formatDate(transaction.purchaseAt)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Transaction Hash</div>
                          <div className="font-medium break-all">{transaction.purchaseTxHash}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Trigger Conditions</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Trigger Threshold</div>
                          <div className="font-medium">{transaction.triggerThreshold} {packageData.triggerUnit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Condition</div>
                          <div className="font-medium capitalize">
                            {packageData.triggerCondition === 'greater_than' ? 'Greater than' : 'Less than'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Measurement Metric</div>
                          <div className="font-medium capitalize">{packageData.triggerMetric}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Available Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      {transaction.purchaseStatus === PurchaseStatusEnum.PAID && !isExpired() && transaction.payoutStatus !== PayoutStatusEnum.PAID && (
                        <Button variant="outline" className="justify-center">
                          <AlertCircleIcon className="mr-1 h-4 w-4" />
                          File Claim
                        </Button>
                      )}
                      
                      {isExpired() && transaction.payoutStatus !== PayoutStatusEnum.PAID && (
                        <Button className="justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Renew Contract
                        </Button>
                      )}
                      
                      {transaction.purchaseStatus === PurchaseStatusEnum.AWAITING_PAYMENT && (
                        <Button variant="outline" className="justify-center">
                          <ClockIcon className="mr-2 h-4 w-4" />
                          Complete Payment
                        </Button>
                      )}
                      
                      <Button variant="outline" className="justify-center" onClick={onClose}>
                        <X className="mr-1 h-4 w-4" />
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PolicyDetailsModal;
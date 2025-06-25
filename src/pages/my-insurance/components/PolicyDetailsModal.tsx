/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldIcon, AlertCircleIcon, FileTextIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/dateUtils';

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
                      <div className={`${bgColor} p-3 rounded-full`}>
                        <ShieldIcon className={`h-6 w-6 ${color}`} />
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
                          <div className={`inline-flex items-center gap-1.5 ${color} text-sm font-medium px-3 py-1 rounded-full ${bgColor}`}>
                            {icon}
                            <span className="capitalize">{status}</span>
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
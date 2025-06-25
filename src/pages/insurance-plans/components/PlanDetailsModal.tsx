import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { IInsurancePackageResponse } from '@/types/interfaces/insurance-package';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: IInsurancePackageResponse;
}

const PlanDetailsModal = ({ isOpen, onClose, plan }: PlanDetailsModalProps) => {
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

  if (!isOpen || !plan) return null;

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
                      <div className="bg-primary/10 p-3 rounded-full">
                        <ShieldIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
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
                          <div className="font-medium">{plan.id}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Risk Type</div>
                          <div className="font-medium capitalize">{plan.riskType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Description</div>
                          <div className="font-medium">{plan.description}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contract Details</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Insurance Amount</div>
                          <div className="font-medium">{plan.payoutAmount} {plan.cryptoCurrency}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Premium</div>
                          <div className="font-medium">{plan.price} {plan.cryptoCurrency}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Duration</div>
                          <div className="font-medium">{plan.durationDays} days</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Blockchain</div>
                          <div className="font-medium capitalize">{plan.chain}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Location Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Province/City</div>
                          <div className="font-medium">{plan.region.province}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Coordinates</div>
                          <div className="font-medium">
                            {plan.region.coordinates.lat}, {plan.region.coordinates.lng}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Trigger Conditions</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Trigger Threshold</div>
                          <div className="font-medium">{plan.triggerThreshold} {plan.triggerUnit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Condition</div>
                          <div className="font-medium capitalize">
                            {plan.triggerCondition === 'greater_than' ? 'Greater than' : 'Less than'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Measurement Metric</div>
                          <div className="font-medium capitalize">{plan.triggerMetric}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Window Period</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-foreground/50">Trigger Window</div>
                          <div className="font-medium">{plan.triggerWindowDays} days</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Created At</div>
                          <div className="font-medium">{new Date(plan.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/50">Updated At</div>
                          <div className="font-medium">{new Date(plan.updatedAt).toLocaleDateString()}</div>
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

export default PlanDetailsModal;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IInsurancePackageResponse } from "@/types/interfaces/insurance-package";
import { motion } from "framer-motion";
import { CheckIcon, InfoIcon, ShieldIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import {
  usePurchaseInsuranceWithNative,
  usePurchaseInsuranceWithUSDC,
  purchaseInsuranceWithNative,
  purchaseInsuranceWithUSDC,
  useApproveUSDC
} from "@/lib/hooks/useInsurance";
import PlanDetailsModal from "./PlanDetailsModal";

const PlanCard = ({ plan, index }: { plan: IInsurancePackageResponse; index: number }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState<{
    value: bigint;
    packageId: string;
    latitude: number;
    longitude: number;
    startDate: number;
  } | null>(null);

  const { isConnected } = useAccount();
  const { writeContract: writeContractNative, isPending: isPendingNative } = usePurchaseInsuranceWithNative();
  const { writeContract: writeContractUSDC, isPending: isPendingUSDC } = usePurchaseInsuranceWithUSDC();
  const {
    approveUSDC,
    isApprovePending,
    isWaitingForTransaction,
    isApproveConfirmed,
    // resetApprovalState
  } = useApproveUSDC();

  useEffect(() => {
    const purchaseAfterApproval = async () => {
      if (isApproveConfirmed && purchaseData) {
        try {
          setIsPurchasing(true);
          toast.info("Approval successful! Proceeding with purchase...");
          await purchaseInsuranceWithUSDC({
            writeContract: writeContractUSDC,
            packageId: purchaseData.packageId,
            latitude: purchaseData.latitude,
            longitude: purchaseData.longitude,
            startDate: purchaseData.startDate,
            amount: purchaseData.value
          });
          toast.success("Insurance purchase with USDC initiated!");
        } catch (error) {
          console.error("Error purchasing after approval:", error);
          toast.error("Failed to purchase insurance after approval. Please try again.");
        } finally {
          setIsPurchasing(false);
          setPurchaseData(null);
        }
      }
    };

    purchaseAfterApproval();
  }, [isApproveConfirmed, purchaseData, writeContractUSDC]);

  const handlePurchaseInsurance = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!userLocation) {
      toast.error(locationError || "Vui lòng cho phép truy cập vị trí để tiếp tục");
      return;
    }

    const isUSDC = plan.cryptoCurrency.toLowerCase() === 'usdc';

    try {
      if (isWaitingForTransaction && isApproveConfirmed) {
        toast.info("Đang chờ xác nhận giao dịch. Vui lòng đợi...");
        return;
      }

      if (isUSDC && !isApproveConfirmed) {
        setIsApproving(true);
        const startDate = Math.floor(Date.now() / 1000) + 3600;
        const value = BigInt(Math.floor(plan.price * 10 ** 6));
        const latitude = Math.floor(userLocation.lat * 10 ** 6);
        const longitude = Math.floor(userLocation.lng * 10 ** 6);
        const packageId = plan.id;

        setPurchaseData({
          value,
          packageId,
          latitude,
          longitude,
          startDate
        });
        const inputVal = {
          writeContract: writeContractUSDC,
          packageId: purchaseData?.packageId ?? plan.id,
          latitude: purchaseData?.latitude ?? Math.floor(userLocation.lat * 10 ** 6),
          longitude: purchaseData?.longitude ?? Math.floor(userLocation.lng * 10 ** 6),
          startDate: purchaseData?.startDate ?? Math.floor(Date.now() / 1000) + 3600,
          amount: purchaseData?.value ?? BigInt(Math.floor(plan.price * 10 ** 6)).toString()
        }
        const approveResult = await approveUSDC(value);
        console.log("approveResult: ", approveResult + "\n inputVal: ", inputVal);

        // setInterval(() => {
        //   if (isWaitingForTransaction) {
        //     toast.info("Waiting for transaction confirmation...");
        //   } else if (isTransactionError) {
        //     toast.error("Transaction failed. Please try again.");
        //     resetApprovalState();
        //   } else {
        //     toast.success("USDC approval initiated! Waiting for confirmation...");
        //     setIsPurchasing(true);
        //     purchaseInsuranceWithUSDC({
        //       writeContract: writeContractUSDC,
        //       packageId: purchaseData?.packageId ?? plan.id,
        //       latitude: purchaseData?.latitude ?? Math.floor(userLocation.lat * 10 ** 6),
        //       longitude: purchaseData?.longitude ?? Math.floor(userLocation.lng * 10 ** 6),
        //       startDate: purchaseData?.startDate ?? Math.floor(Date.now() / 1000) + 3600,
        //       amount: purchaseData?.value ?? BigInt(Math.floor(plan.price * 10 ** 6))
        //     }).then(() => {
        //       toast.success("Insurance purchase with USDC initiated!");
        //       setIsPurchasing(false);
        //     });
        //   }
        // }, 500)
      }

      else {
        setIsPurchasing(true);
        const startDate = Math.floor(Date.now() / 1000) + 3600;
        const value = BigInt(Math.floor(plan.price * 10 ** 18));
        console.log(131);

        await purchaseInsuranceWithNative({
          writeContract: writeContractNative,
          packageId: plan.id,
          latitude: Math.floor(userLocation.lat * 10 ** 7),
          longitude: Math.floor(userLocation.lng * 10 ** 7),
          startDate,
          value
        });

        toast.success("Insurance purchase with Native Currency initiated!");
      }
    } catch (error) {
      console.error("Error in insurance process:", error);
      console.log(146);

      toast.error(`Failed to ${isApproving ? 'approve USDC' : 'purchase insurance'}. Please try again.`);
      if (isApproving) {
        setPurchaseData(null);
      }
    } finally {
      setIsPurchasing(false);
      setIsApproving(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Không thể lấy vị trí của bạn. Vui lòng cho phép truy cập vị trí.");
        }
      );
    } else {
      setLocationError("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  }, []);

  const determineCategory = (plan: IInsurancePackageResponse): 'basic' | 'premium' | 'enterprise' => {
    if (plan.price < 0.1) return 'basic';
    if (plan.price < 0.3) return 'premium';
    return 'enterprise';
  };

  const category = determineCategory(plan);

  const getFeatures = (plan: IInsurancePackageResponse, category: string): string[] => {
    const baseFeatures = [
      `Insurance up to ${plan.payoutAmount} ${plan.cryptoCurrency}`,
      `Protection against ${plan.riskType}`,
      `${plan.durationDays}-day insurance period`,
    ];

    if (category === 'basic') {
      return [...baseFeatures, 'Basic customer support'];
    }

    if (category === 'premium') {
      return [
        ...baseFeatures,
        'DeFi protocol insurance',
        'Priority customer support',
        'Wallet recovery support',
      ];
    }

    return [
      ...baseFeatures,
      'DeFi protocol insurance',
      'Exchange hack protection',
      '24/7 customer support',
      'Custom claim processing',
      'Multi-wallet protection',
    ];
  };

  const features = getFeatures(plan, category);
  const isRecommended = category === 'premium';

  // Xác định trạng thái disabled của nút
  const isButtonDisabled = () => {
    const isUSDC = plan.cryptoCurrency.toLowerCase() === 'usdc';

    if (isUSDC) {
      // Chỉ disable nút khi đang trong quá trình xử lý, không disable khi đang chờ xác nhận
      return isPurchasing || isApproving || isApprovePending ||
        (isApproveConfirmed && isPendingUSDC);
    } else {
      return isPurchasing || isPendingNative;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${isRecommended ? 'border-primary/50 shadow-md shadow-primary/20' : 'border-border'}`}>
          {isRecommended && (
            <div className="bg-gradient-to-r from-primary to-cyan-500 text-white text-xs font-medium px-3 py-1 text-center">
              RECOMMENDED
            </div>
          )}
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-lg font-medium">{plan.cryptoCurrency}</span>
              </div>
              <div className="text-sm text-foreground/70 flex items-center gap-1">
                <InfoIcon className="h-3 w-3" />
                <span>Insurance up to {plan.payoutAmount} {plan.cryptoCurrency} for {plan.durationDays} days</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="w-full space-y-3 ">
              <Button
                className="w-full justify-center h-10"
                // glowColor="rgba(0, 212, 255, 0.3)"
                onClick={handlePurchaseInsurance}
                disabled={isButtonDisabled()}
              >
                Buy Now
              </Button>

              <Button
                variant="outline"
                className="w-full justify-center h-10"
                onClick={() => setIsDetailsModalOpen(true)}
              >
                <InfoIcon className="mr-1 h-4 w-4" />
                More Details
              </Button>
            </div>

            {locationError && (
              <p className="text-red-500 text-xs mt-2">{locationError}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <PlanDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        plan={plan}
      />
    </>
  );
};

export default PlanCard;
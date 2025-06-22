import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IInsurancePackageResponse } from "@/types/interfaces/insurance-package";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon, InfoIcon, ShieldIcon } from "lucide-react";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { toast } from "sonner";
import { usePurchaseInsuranceWithAVAX } from "@/lib/hooks/usePurchaseInsuranceWithAVAX";
import { usePurchaseInsuranceWithUSDC, purchaseInsurance, purchaseInsuranceWithUSDC } from "@/lib/hooks/usePurchaseInsuranceWithUSDC";
import { Button } from "@/components/ui/button";

const PlanCard = ({ plan, index }: { plan: IInsurancePackageResponse; index: number }) => {
  const [, setIsPurchasing] = useState(false);
  
  // Wagmi hooks
  const { isConnected } = useAccount();
  const { connect, connectors
    // , isPending 
  } = useConnect();
  const { writeContract: writeContractAVAX
    // , isPending: isPendingAVAX 
  } = usePurchaseInsuranceWithAVAX();
  const { writeContract: writeContractUSDC
    // , isPending: isPendingUSDC 
  } = usePurchaseInsuranceWithUSDC();
  
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
  
  const handleConnectWallet = async () => {
    try {
      if (!isConnected) {
        if (typeof window !== 'undefined' && window.ethereum) {
          const metaMaskConnector = connectors.find(c => c.name === 'MetaMask');
          
          if (metaMaskConnector) {
            await connect({ connector: metaMaskConnector });
            toast.success("Wallet connected successfully");
            return true;
          } else {
            if (connectors.length > 0) {
              await connect({ connector: connectors[0] });
              toast.success("Wallet connected successfully");
              return true;
            } else {
              toast.error("No wallet connectors available");
              return false;
            }
          }
        } else {
          toast.error("Please install MetaMask wallet");
          return false;
        }
      }
      return true;
    } catch (error) {
      toast.error("Wallet connection failed");
      console.error("Wallet connection error:", error);
      return false;
    }
  };
  
  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const isWalletConnected = await handleConnectWallet();
      if (!isWalletConnected) {
        setIsPurchasing(false);
        return;
      }
      
      const packageId = plan.id;
      const latitude = 0; 
      const longitude = 0; 
      const startDate = Math.floor(Date.now() / 1000);
      
      if (plan.cryptoCurrency.toUpperCase() === 'AVAX') {
        const value = BigInt(Math.floor(plan.price * 10**18));
        await purchaseInsurance({
          writeContract: writeContractAVAX,
          packageId,
          latitude,
          longitude,
          startDate,
          value,
        });
        toast.success("Insurance purchase initiated with AVAX");
      } else if (plan.cryptoCurrency.toUpperCase() === 'USDC') {
        await purchaseInsuranceWithUSDC({
          writeContract: writeContractUSDC,
          packageId,
          latitude,
          longitude,
          startDate,
          // amount,
        });
        toast.success("Insurance purchase initiated with USDC");
      } else {
        toast.error(`Unsupported currency: ${plan.cryptoCurrency}`);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to purchase insurance");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
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

          <Button onClick={handlePurchase}>  <ArrowRightIcon className="h-4 w-4 ml-1" />Sign Up Now</Button>
          {/* <div className="mt-auto pt-4">
            <GlowButton 
              className="w-full justify-center" 
              glowColor="rgba(0, 212, 255, 0.3)"
              onClick={handlePurchase}

            >
              {isPurchasing || isPendingAVAX || isPendingUSDC ? 'Processing...' : 'Sign Up Now'} 
            
            </GlowButton>
          </div> */}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanCard
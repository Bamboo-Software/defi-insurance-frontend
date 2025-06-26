import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { INSURANCE_CONTRACT_ADDRESS, INSURANCE_CONTRACT_ABI, INSURANCE_USDC_TOKEN_ADDRESS } from '@/lib/configs';
import { useState, useEffect } from 'react';

const erc20ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  }
] as const;

interface PurchaseInsuranceParams {
  writeContract: ReturnType<typeof useWriteContract>['writeContract'];
  packageId: string;
  latitude: number;
  longitude: number;
  startDate: number;
}

interface PurchaseWithNativeParams extends PurchaseInsuranceParams {
  value: bigint;
}

interface PurchaseWithUSDCParams extends PurchaseInsuranceParams {
  amount: bigint;
}

interface SubmitClaimParams {
  writeContract: ReturnType<typeof useWriteContract>['writeContract'];
  policyId: number;
  reason: string;
}

export function purchaseInsuranceWithNative({
  writeContract,
  packageId,
  latitude,
  longitude,
  startDate,
  value,
}: PurchaseWithNativeParams) {
  return writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'purchaseInsuranceWithNative',
    args: [
      packageId, 
      BigInt(Math.floor(latitude * 10**7)), 
      BigInt(Math.floor(longitude * 10**7)), 
      BigInt(startDate), 
      value
    ],
    value,
  });
}

export async function purchaseInsuranceWithUSDC({
  writeContract,
  packageId,
  latitude,
  longitude,
  startDate,
  amount,
}: PurchaseWithUSDCParams) {
  return await writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'purchaseInsuranceWithERC20',
    args: [
      packageId, 
      BigInt(latitude), 
      BigInt(longitude), 
      BigInt(startDate), 
      amount, 
      INSURANCE_USDC_TOKEN_ADDRESS
    ],
  });
}

export function submitClaim({
  writeContract,
  policyId,
  reason,
}: SubmitClaimParams) {
  return writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'submitClaim',
    args: [BigInt(policyId), reason],
  });
}

export function usePurchaseInsuranceWithNative() {
  return useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error purchasing insurance with Native Currency:', error);
      },
    },
  });
}

export function usePurchaseInsuranceWithUSDC() {
  return useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error purchasing insurance with USDC:', error);
      },
    },
  });
}

export function useSubmitClaim() {
  return useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error submitting claim:', error);
      },
    },
  });
}

export function useApproveUSDC() {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [isApproveConfirmed, setIsApproveConfirmed] = useState(false);

  const { 
    writeContractAsync, 
    isPending: isApprovePending, 
    error 
  } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error approving USDC:', error);
      },
      onSuccess: (hash) => {
        setHash(hash);
      },
    },
  });

  const { isLoading: isWaitingForTransaction, isSuccess: transactionSuccess, isError: isTransactionError } = useWaitForTransactionReceipt({

    hash,
  });

  useEffect(() => {
    if (transactionSuccess) {
      setIsApproveConfirmed(true);
    }
  }, [transactionSuccess]);

  const approveUSDC = async (amount: bigint) => {
    try {
      const txHash = await writeContractAsync({
        address: INSURANCE_USDC_TOKEN_ADDRESS as `0x${string}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [INSURANCE_CONTRACT_ADDRESS as `0x${string}`, amount],
      });
      
      return txHash;
    } catch (error) {
      console.error('Failed to approve USDC:', error);
      throw error;
    }
  };

  const resetApprovalState = () => {
    setHash(undefined);
    setIsApproveConfirmed(false);
  };

  return {
    approveUSDC,
    hash,
    isTransactionError,
    isApprovePending,         
    isWaitingForTransaction, 
    isApproveConfirmed,  
    transactionSuccess,
    resetApprovalState,  
    error                     
  };
}

// Main hook that combines all insurance operations
export function useInsurance() {
  const purchaseWithNative = usePurchaseInsuranceWithNative();
  const purchaseWithUSDC = usePurchaseInsuranceWithUSDC();
  const submitClaimHook = useSubmitClaim();
  const approveUSDC = useApproveUSDC();

  return {
    // Native currency operations
    purchaseWithNative,
    purchaseInsuranceWithNative,
    
    // USDC operations
    purchaseWithUSDC,
    purchaseInsuranceWithUSDC,
    approveUSDC,
    
    // Claim operations
    submitClaimHook,
    submitClaim,
  };
}
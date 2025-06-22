import { useWriteContract } from 'wagmi';
import { INSURANCE_CONTRACT_ADDRESS, INSURANCE_CONTRACT_ABI } from '@/lib/configs';

export function purchaseInsurance({
  writeContract,
  packageId,
  latitude,
  longitude,
  startDate,
  value,
}: {
  writeContract: ReturnType<typeof useWriteContract>['writeContract'];
  packageId: string;
  latitude: number;
  longitude: number;
  startDate: number;
  value: bigint;
}) {
  return writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'purchaseInsuranceWithAVAX',
    args: [BigInt(packageId), BigInt(latitude), BigInt(longitude), BigInt(startDate)],
    value,
  });
}

export function purchaseInsuranceWithUSDC({
  writeContract,
  packageId,
  latitude,
  longitude,
  startDate,
//   amount,
}: {
  writeContract: ReturnType<typeof useWriteContract>['writeContract'];
  packageId: string;
  latitude: number;
  longitude: number;
  startDate: number;
//   amount: bigint;
}) {
  return writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'purchaseInsuranceWithUSDC',
    args: [BigInt(packageId), BigInt(latitude), BigInt(longitude), BigInt(startDate)],
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

export function submitClaim({
  writeContract,
  policyId,
  reason,
}: {
  writeContract: ReturnType<typeof useWriteContract>['writeContract'];
  policyId: number;
  reason: string;
}) {
  return writeContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'submitClaim',
    args: [BigInt(policyId), reason],
  });
}
import { useReadContract } from 'wagmi';
import { INSURANCE_CONTRACT_ADDRESS, INSURANCE_CONTRACT_ABI } from '@/lib/configs';

export function useInsurancePackages() {
  return useReadContract({
    address: INSURANCE_CONTRACT_ADDRESS,
    abi: INSURANCE_CONTRACT_ABI,
    functionName: 'getInsurancePackages',
  });
}
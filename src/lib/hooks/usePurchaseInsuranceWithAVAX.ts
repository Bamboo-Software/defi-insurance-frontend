import { useWriteContract } from 'wagmi';

export function usePurchaseInsuranceWithAVAX() {
  return useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error purchasing insurance with AVAX:', error);
      },
    },
  });
}


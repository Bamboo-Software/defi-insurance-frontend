import type { ReactNode } from 'react';
import { WagmiProvider as WagmiProviderCore, createConfig, http } from 'wagmi';
import { avalancheFuji, mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaMask } from 'wagmi/connectors'

interface WagmiProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia, avalancheFuji],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [avalancheFuji.id]: http(),
  },
  connectors: [
    metaMask(),
  ],
});

export function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <WagmiProviderCore config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderCore>
  );
}
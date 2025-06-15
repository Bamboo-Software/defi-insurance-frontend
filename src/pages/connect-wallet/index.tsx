import { motion } from 'framer-motion';
import { useState } from 'react';
import { WalletIcon, ShieldIcon, LockIcon, AlertCircleIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  popular?: boolean;
}

const ConnectWallet = () => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const walletOptions: WalletOption[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect with your MetaMask wallet',
      popular: true,
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Scan with WalletConnect to connect',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🪙',
      description: 'Connect with your Coinbase wallet',
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect with your Trust Wallet',
    },
  ];

  const handleConnectWallet = (walletId: string) => {
    setConnectingWallet(walletId);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
        setErrorMessage('Unable to connect to wallet. Please try again.');
      }
    }, 2000);
  };

  const resetConnection = () => {
    setConnectingWallet(null);
    setConnectionStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with animated gradient background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Connect Your Wallet
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Link your blockchain wallet to securely access insurance services, manage contracts, and process claims.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wallet connection section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border border-primary/20 shadow-lg shadow-primary/5 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-card/50">
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-5 w-5 text-primary" />
                Choose a wallet
              </CardTitle>
              <CardDescription>
                Connect with one of the available wallet providers or create a new wallet
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {connectionStatus === 'idle' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {walletOptions.map((wallet, index) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleConnectWallet(wallet.id)}
                        className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 bg-card/50 hover:bg-card/80 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{wallet.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium group-hover:text-primary transition-colors">{wallet.name}</h3>
                              {wallet.popular && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Popular</span>
                              )}
                            </div>
                            <p className="text-sm text-foreground/70">{wallet.description}</p>
                          </div>
                          <ArrowRightIcon className="h-5 w-5 text-foreground/50 group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-8">
                  {connectionStatus === 'connecting' && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                      <h3 className="text-xl font-medium mb-2">
                        Connecting to {walletOptions.find(w => w.id === connectingWallet)?.name}
                      </h3>
                      <p className="text-foreground/70 mb-4">
                        Please check your wallet and confirm the connection request
                      </p>
                      <Button variant="outline" onClick={resetConnection}>
                        Cancel
                      </Button>
                    </motion.div>
                  )}

                  {connectionStatus === 'success' && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircleIcon className="h-10 w-10 text-green-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-green-500">
                        Wallet connected successfully
                      </h3>
                      <p className="text-foreground/70 mb-6">
                        Your {walletOptions.find(w => w.id === connectingWallet)?.name} wallet has been connected. You can access all features.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetConnection}>
                          Disconnect
                        </Button>
                        <GlowButton>
                          Continue <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </GlowButton>
                      </div>
                    </motion.div>
                  )}

                  {connectionStatus === 'error' && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                          <AlertCircleIcon className="h-10 w-10 text-destructive" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-destructive">
                        Connection failed
                      </h3>
                      <p className="text-foreground/70 mb-6">
                        {errorMessage}
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetConnection}>
                          Try another wallet
                        </Button>
                        <Button onClick={() => handleConnectWallet(connectingWallet || '')}>
                          Try again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security information section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Your security is our priority
            </h2>
            <p className="text-lg text-foreground/70">
              We apply the highest security standards to protect your wallet connection
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card/50 border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Storage</h3>
              <p className="text-foreground/70">We never store your private keys. Your assets always remain under your control.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card/50 border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encrypted Connection</h3>
              <p className="text-foreground/70">All wallet connections are secured with end-to-end encryption to protect your data.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card/50 border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <AlertCircleIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Limited Permissions</h3>
              <p className="text-foreground/70">We only request the minimum permissions necessary to provide our insurance services.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Help section */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="bg-gradient-to-r from-background/80 to-card/50 border border-primary/20 rounded-2xl p-8 md:p-12 text-center shadow-lg shadow-primary/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Need help connecting your wallet?
            </h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any wallet connection issues.
            </p>
            <Button variant="outline" className="bg-card/50">
              Contact Support
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConnectWallet;
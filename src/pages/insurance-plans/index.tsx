import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShieldIcon, CheckIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InsurancePlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  coverageAmount: string;
  duration: string;
  category: 'basic' | 'premium' | 'enterprise';
}

const InsurancePlans = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'premium' | 'enterprise'>('all');
  
  const insurancePlans: InsurancePlan[] = [
    {
      id: 'basic-coverage',
      name: 'Basic Insurance',
      price: 0.05,
      description: 'Essential protection for individuals new to cryptocurrency',
      features: [
        'Insurance up to 5 ETH',
        'Protection against smart contract vulnerabilities',
        '30-day insurance period',
        'Basic customer support',
      ],
      coverageAmount: '5 ETH',
      duration: '30 days',
      category: 'basic',
    },
    {
      id: 'premium-coverage',
      name: 'Premium Insurance',
      price: 0.15,
      description: 'Enhanced protection with additional benefits for active traders',
      features: [
        'Insurance up to 20 ETH',
        'Protection against smart contract vulnerabilities',
        'DeFi protocol insurance',
        '90-day insurance period',
        'Priority customer support',
        'Wallet recovery support',
      ],
      recommended: true,
      coverageAmount: '20 ETH',
      duration: '90 days',
      category: 'premium',
    },
    {
      id: 'enterprise-coverage',
      name: 'Enterprise Insurance',
      price: 0.5,
      description: 'Comprehensive protection for businesses and large investments',
      features: [
        'Insurance up to 100 ETH',
        'Protection against smart contract vulnerabilities',
        'DeFi protocol insurance',
        'Exchange hack protection',
        '180-day insurance period',
        '24/7 customer support',
        'Custom claim processing',
        'Multi-wallet protection',
      ],
      coverageAmount: '100 ETH',
      duration: '180 days',
      category: 'enterprise',
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? insurancePlans 
    : insurancePlans.filter(plan => plan.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with animated gradient background */}
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
              Choose Your Insurance Plan
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Protect your digital assets with blockchain-based insurance packages, providing transparent coverage and instant claim processing.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              All Plans
            </button>
            <button 
              onClick={() => setSelectedCategory('basic')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'basic' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Basic
            </button>
            <button 
              onClick={() => setSelectedCategory('premium')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'premium' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Premium
            </button>
            <button 
              onClick={() => setSelectedCategory('enterprise')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'enterprise' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Enterprise
            </button>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${plan.recommended ? 'border-primary/50 shadow-md shadow-primary/20' : 'border-border'}`}>
                  {plan.recommended && (
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
                        <span className="text-lg font-medium">ETH</span>
                      </div>
                      <div className="text-sm text-foreground/70 flex items-center gap-1">
                        <InfoIcon className="h-3 w-3" />
                        <span>Insurance up to {plan.coverageAmount} for {plan.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-4">
                      <GlowButton className="w-full justify-center" glowColor="rgba(0, 212, 255, 0.3)">
                        Sign Up Now <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </GlowButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Why Choose Our Blockchain Insurance?
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Our blockchain insurance solution provides comprehensive protection for your digital assets with superior transparency and efficiency
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Protection</h3>
              <p className="text-foreground/70">Protect your digital assets from smart contract vulnerabilities, hacks, and other risks in the blockchain ecosystem.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
              <p className="text-foreground/70">All insurance contracts are executed through smart contracts, ensuring transparency and immutability.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-foreground/70">Claims are processed automatically and payments are made immediately after successful verification.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety & Security</h3>
              <p className="text-foreground/70">Our insurance system is audited by leading security experts, ensuring maximum safety for your assets.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-cyan-500/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Blockchain Insurance by the Numbers
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              We are proud of the impressive numbers we have achieved in protecting our customers' digital assets
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                10K+
              </div>
              <p className="text-foreground/70">Trusted Customers</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                500 ETH
              </div>
              <p className="text-foreground/70">Claims Paid</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                99.8%
              </div>
              <p className="text-foreground/70">Satisfaction Rate</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
"&lt; 24h"
              </div>
              <p className="text-foreground/70">Processing Time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Everything you need to know about our blockchain insurance packages
            </p>
          </motion.div>
          
          <div className="space-y-6">
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">How does blockchain insurance work?</h3>
              <p className="text-foreground/70">Our insurance contracts are encoded as smart contracts on the blockchain, creating an immutable record of your insurance. When a claim is made, the smart contract automatically verifies the conditions and processes the payment without manual intervention.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">What assets are insured?</h3>
              <p className="text-foreground/70">Our insurance packages cover various digital assets such as cryptocurrencies and tokens. Coverage includes protection against smart contract vulnerabilities, exchange hacks, and other specific risks depending on the package you choose.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">How do I make a claim?</h3>
              <p className="text-foreground/70">Claims are initiated through our dApp interface. Simply connect your wallet, select your insurance contract, and submit the claim details. Our smart contract will automatically verify the claim based on blockchain data and process valid claims immediately.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Can I upgrade my insurance package?</h3>
              <p className="text-foreground/70">Yes, you can upgrade your insurance package at any time. The remaining coverage from your current package will be prorated and applied to the new package, ensuring you don't lose any value when upgrading.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              What Our Customers Say About Us
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Discover the experiences of customers who have trusted our blockchain insurance solution
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card border border-border rounded-lg p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-5 left-6 bg-primary text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-foreground/70 mb-6 italic">"After experiencing an exchange hack, I lost a significant amount of ETH. Thanks to blockchain insurance, I was fully compensated within hours. Excellent service!"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">TN</span>
                  </div>
                  <div>
                    <p className="font-semibold">Tran Nam</p>
                    <p className="text-sm text-foreground/70">Individual Investor</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-5 left-6 bg-primary text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-foreground/70 mb-6 italic">"As a business operating in the DeFi space, protecting our customers' assets is a top priority. The enterprise insurance package has helped us build trust with our users."</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">HL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Hoang Linh</p>
                    <p className="text-sm text-foreground/70">CEO, DeFiSecure</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-5 left-6 bg-primary text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-foreground/70 mb-6 italic">"The claim process is simple and transparent. I received compensation for a smart contract vulnerability within minutes of submitting my claim. This is an essential service for anyone involved in the crypto market."</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">MT</span>
                  </div>
                  <div>
                    <p className="font-semibold">Minh Tuan</p>
                    <p className="text-sm text-foreground/70">Blockchain Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 z-0"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Ready to Protect Your Digital Assets?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of blockchain users who trust our insurance packages to protect their investments from unforeseen risks.
            </p>
            <GlowButton size="lg" className="px-8 py-6 text-lg">
              Start Today
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePlans;
import { Timeline } from '@/components/ui/timeline'
import { motion } from 'framer-motion'
import { CloudRainIcon, CheckCircleIcon, CreditCardIcon, CoinsIcon, SparklesIcon } from 'lucide-react';



const timelineSteps = [
  {
    title: 'Register Land Area',
    description: 'Enter information about your farming area and location in the Mekong Delta to calculate insurance premiums.',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />,
  },
  {
    title: 'Pay Insurance Premium',
    description: 'Pay insurance premium in USDC (4 USDC/ha) through Web3 wallets like MetaMask or WalletConnect.',
    icon: <CreditCardIcon className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />,
  },
  {
    title: 'Receive NFT Contract',
    description: 'Receive an NFT representing your insurance contract, securely stored on the blockchain.',
    icon: <SparklesIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
  },
  {
    title: 'Automatic Compensation',
    description: 'When weather data from Chainlink exceeds thresholds (like rain >200mm/5 days), smart contracts automatically pay out 10 USDC/ha.',
    icon: <CloudRainIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
  },
  {
    title: 'Online Monitoring',
    description: 'Track weather data, contract status, and potential payouts in real-time.',
    icon: <CoinsIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
  },
];

const HowItWorks = () => {
  return (
      <section className="py-20 px-4 bg-gradient-to-b from-background/80 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Experience the simple agricultural insurance process powered by blockchain technology:
            </p>
          </motion.div>
          
          <Timeline items={timelineSteps} />
        </div>
      </section>
  )
}

export default HowItWorks
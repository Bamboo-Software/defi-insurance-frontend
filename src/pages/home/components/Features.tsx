import { motion } from "framer-motion";
import { ArrowRightIcon, CloudRainIcon, BarChart3Icon, WalletIcon, DropletIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

// Features section with improved cards
const Features = () => {
    const features = [
      {
        title: "Comprehensive Insurance Solution",
        description: " Our platform combines blockchain technology with parametric insurance to provide farmers with transparent and efficient protection",
        icon: <CloudRainIcon className="h-10 w-10 text-white" />,
        color: "from-green-400 to-cyan-400 dark:from-green-500 dark:to-cyan-500"
      },
      {
        title: "DeFi Integration",
        description: "Pay insurance premiums in USDC and receive NFTs for insurance contracts with a simple process.",
        icon: <WalletIcon className="h-10 w-10 text-white" />,
        color: "from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500"
      },
      {
        title: "Liquidity Pool",
        description: "Manage integrated liquidity pools with Aave to generate returns for investors with attractive APY.",
        icon: <DropletIcon className="h-10 w-10 text-white" />,
        color: "from-blue-400 to-emerald-400 dark:from-blue-500 dark:to-emerald-500"
      },
      {
        title: "Transparency & Analytics",
        description: "Display public data on liquidity pools, payouts, and DeFi returns transparently.",
        icon: <BarChart3Icon className="h-10 w-10 text-white" />,
        color: "from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500"
      },
    ];
  
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              Comprehensive Insurance Solution
            </h2>
            <p className="text-xl text-foreground/70">
              Protect your crops with blockchain-based agricultural insurance products
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto text-green-400 dark:text-green-300 hover:text-green-400/80 dark:hover:text-green-300/80 hover:bg-transparent">
                      Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Features;
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { CloudRain, Sun, Sprout, Droplets, Leaf, ArrowRightIcon } from "lucide-react";
import BlockchainParticles from "@/components/ui/blockchain-particles";
import BlockchainCube from "@/components/ui/blockchain-cube";
import { useNavigate } from "react-router-dom";
import { routesPaths } from "@/types/constants/routes";

const { INSURANCE_PLANS } = routesPaths;

const Hero = () => {
  const navigate =  useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0"></div>
      
      {/* Animated gradient orbs - using lighter agricultural colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-300/20 dark:bg-green-500/30 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-500/30 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-500/30 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Blockchain particles effect */}
      <BlockchainParticles count={100} />

      {/* Blockchain network animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M200,200 C300,100 500,300 700,200"
            stroke="rgba(var(--primary-rgb), 0.3)"
            strokeWidth="1"
            fill="none"
            initial="initial"
            animate="animate"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: { 
                pathLength: 1, 
                opacity: 0.5,
                transition: { 
                  duration: 2,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M300,500 C400,400 600,450 750,350"
            stroke="rgba(var(--cyan-rgb), 0.3)"
            strokeWidth="1"
            fill="none"
            initial="initial"
            animate="animate"
            variants={{
                initial: { pathLength: 0, opacity: 0 },
                animate: { 
                  pathLength: 1, 
                  opacity: 0.5,
                  transition: { 
                    duration: 2,
                    ease: "easeInOut"
                  }
                }
              }}
          />
          <motion.path
            d="M200,350 C350,450 500,350 650,450"
            stroke="rgba(var(--purple-rgb), 0.3)"
            strokeWidth="1"
            fill="none"
            initial="initial"
            animate="animate"
            variants={{
                initial: { pathLength: 0, opacity: 0 },
                animate: { 
                  pathLength: 1, 
                  opacity: 0.5,
                  transition: { 
                    duration: 2,
                    ease: "easeInOut"
                  }
                }
              }}
          />
        </svg>

        {/* 3D Blockchain Cubes */}
        <div className="absolute top-1/5 left-1/6">
          <BlockchainCube 
            size={50} 
            color="rgba(var(--primary-rgb), 0.4)" 
            duration={25} 
            delay={0.5} 
          />
        </div>
        
        <div className="absolute bottom-1/4 left-1/3">
          <BlockchainCube 
            size={40} 
            color="rgba(var(--cyan-rgb), 0.4)" 
            duration={20} 
            delay={1.2} 
          />
        </div>
        
        <div className="absolute top-1/3 right-1/5">
          <BlockchainCube 
            size={60} 
            color="rgba(var(--purple-rgb), 0.4)" 
            duration={30} 
            delay={0.8} 
          />
        </div>

        {/* Floating blockchain icons */}
        <motion.div 
          className="absolute top-1/4 left-1/5 bg-card/30 p-3 rounded-full backdrop-blur-sm border border-green-300/30 dark:border-green-500/30"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            float: {
              y: ["-10px", "10px", "-10px"],
              rotate: ["-5deg", "5deg", "-5deg"],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              },
            },
          }}
          initial="initial"
          animate={["animate", "float"]}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CloudRain className="h-8 w-8 text-cyan-400 dark:text-cyan-500" />
        </motion.div>

        <motion.div 
          className="absolute top-1/3 right-1/4 bg-card/30 p-3 rounded-full backdrop-blur-sm border border-green-300/30 dark:border-green-500/30"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            float: {
              y: ["-10px", "10px", "-10px"],
              rotate: ["-5deg", "5deg", "-5deg"],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              },
            },
          }}
          initial="initial"
          animate={["animate", "float"]}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Sun className="h-8 w-8 text-yellow-400 dark:text-yellow-300" />
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 right-1/5 bg-card/30 p-3 rounded-full backdrop-blur-sm border border-green-300/30 dark:border-green-500/30"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            float: {
              y: ["-10px", "10px", "-10px"],
              rotate: ["-5deg", "5deg", "-5deg"],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              },
            },
          }}
          initial="initial"
          animate={["animate", "float"]}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Sprout className="h-8 w-8 text-green-400 dark:text-green-300" />
        </motion.div>

        <motion.div 
          className="absolute top-1/2 left-1/3 bg-card/30 p-3 rounded-full backdrop-blur-sm border border-green-300/30 dark:border-green-500/30"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            float: {
              y: ["-10px", "10px", "-10px"],
              rotate: ["-5deg", "5deg", "-5deg"],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              },
            },
          }}
          initial="initial"
          animate={["animate", "float"]}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Droplets className="h-8 w-8 text-blue-400 dark:text-blue-300" />
        </motion.div>

        <motion.div 
          className="absolute bottom-1/4 right-1/3 bg-card/30 p-3 rounded-full backdrop-blur-sm border border-green-300/30 dark:border-green-500/30"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            float: {
              y: ["-10px", "10px", "-10px"],
              rotate: ["-5deg", "5deg", "-5deg"],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              },
            },
          }}
          initial="initial"
          animate={["animate", "float"]}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          <Leaf className="h-8 w-8 text-emerald-400 dark:text-emerald-300" />
        </motion.div>

      </div>
      
      <div className="container relative z-10 mb-20">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
  <span className="bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
    Decentralized Agricultural Insurance
  </span>
</h1>
<p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl">
  Protect your crops with a smart insurance solution based on weather data and blockchain technology
</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton onClick={() => navigate(INSURANCE_PLANS)} size="lg" className="mr-4" glowColor="rgba(var(--primary-rgb), 0.4)">


  Explore Insurance Plans
</GlowButton>
<Button variant="outline" size="lg" className="flex items-center gap-2">
  Learn More
  <ArrowRightIcon className="h-4 w-4" />
</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
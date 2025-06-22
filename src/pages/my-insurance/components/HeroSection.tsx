import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                My Insurance Contracts
              </h1>
              <p className="text-lg text-foreground/70">
                Manage and track all your blockchain insurance contracts in one place
              </p>
            </div>
            <GlowButton className="flex items-center gap-1.5">
              <PlusIcon className="h-4 w-4" />
              New Contract
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

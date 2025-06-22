import { motion } from "framer-motion";

const HeroSection = ({ 
  selectedCategory, 
  setSelectedCategory 
}: { 
  selectedCategory: string; 
  setSelectedCategory: (category: 'all' | 'basic' | 'premium' | 'enterprise') => void 
}) => {
  return (
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
  );
};

export default HeroSection;
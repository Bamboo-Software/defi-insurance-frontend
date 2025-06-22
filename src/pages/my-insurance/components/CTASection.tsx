import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="bg-gradient-to-r from-background/80 to-card/50 border border-primary/20 rounded-2xl p-8 md:p-12 shadow-lg shadow-primary/5 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Need More Insurance?
              </h2>
              <p className="text-foreground/70 max-w-xl">
                Explore our insurance packages to find the perfect coverage for your digital assets.
              </p>
            </div>
            <GlowButton size="lg" className="whitespace-nowrap">
              View Packages
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default CTASection;
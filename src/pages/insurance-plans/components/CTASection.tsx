import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";

const CallToAction = () => {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background z-0"></div>
        
        {/* Animated gradient orbs - agricultural colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-300/20 dark:bg-green-500/30 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-500/30 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-background/80 to-card/50 border border-green-300/30 dark:border-green-500/30 rounded-2xl p-8 md:p-12 shadow-lg shadow-green-400/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-emerald-400 dark:from-green-300 dark:via-cyan-200 dark:to-emerald-300 bg-clip-text text-transparent">
                  Sẵn Sàng Bảo Vệ Mùa Màng Của Bạn?
                </h2>
                <p className="text-xl text-foreground/70 max-w-2xl">
                  Tham gia cùng hàng nghìn nông dân tại Đồng bằng Sông Cửu Long đang tin tưởng giải pháp bảo hiểm nông nghiệp của chúng tôi.
                </p>
              </div>
              <GlowButton size="lg" className="whitespace-nowrap" glowColor="rgba(var(--primary-rgb), 0.4)">
                Đăng Ký Ngay
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  export default CallToAction;
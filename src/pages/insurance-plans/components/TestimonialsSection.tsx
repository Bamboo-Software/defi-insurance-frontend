import { motion } from "framer-motion";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
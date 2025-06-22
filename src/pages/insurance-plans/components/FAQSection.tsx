import { motion } from "framer-motion";

const FAQSection = () => {
  return (
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
  );
};

export default FAQSection;

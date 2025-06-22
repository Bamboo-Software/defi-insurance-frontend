/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

interface StatisticsSectionProps {
  transactions: any[];
}

const StatisticsSection = ({ transactions }: StatisticsSectionProps) => {
  // Tính toán các thống kê từ dữ liệu giao dịch
  const activeContracts = transactions.filter(t => {
    const now = new Date();
    const endDate = new Date(t.insuredPeriod.end);
    return t.purchaseStatus === 'paid' && endDate > now && t.payoutStatus !== 'completed';
  }).length;
  
  const totalCoverage = transactions.reduce((sum, t) => sum + t.payoutAmount, 0);
  const claimsSubmitted = transactions.filter(t => t.payoutStatus === 'processing' || t.payoutStatus === 'completed').length;
//   const claimsPaid = transactions.filter(t => t.payoutStatus === 'completed').length;
  const totalPaidAmount = transactions.filter(t => t.payoutStatus === 'completed')
    .reduce((sum, t) => sum + t.payoutAmount, 0);
  
  // Lấy loại tiền điện tử phổ biến nhất
  const mostCommonCrypto = transactions.length > 0 ? transactions[0].cryptoCurrency : 'ETH';
  
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Insurance Statistics
          </h2>
          <p className="text-lg text-foreground/70">
            Overview of your insurance portfolio and claim history
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              {activeContracts}
            </div>
            <div className="text-foreground/70">Active Contracts</div>
          </motion.div>
          
          <motion.div 
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              {totalCoverage.toFixed(2)} {mostCommonCrypto}
            </div>
            <div className="text-foreground/70">Total Coverage</div>
          </motion.div>
          
          <motion.div 
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              {claimsSubmitted}
            </div>
            <div className="text-foreground/70">Claims Submitted</div>
          </motion.div>
          
          <motion.div 
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              {totalPaidAmount.toFixed(2)} {mostCommonCrypto}
            </div>
            <div className="text-foreground/70">Claims Paid</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
import { Timeline } from '@/components/ui/timeline'
import { motion } from 'framer-motion'
import { CloudRainIcon, CheckCircleIcon, CreditCardIcon, CoinsIcon, SparklesIcon } from 'lucide-react';



const timelineSteps = [
    {
      title: 'Đăng Ký Diện Tích Đất',
      description: 'Nhập thông tin về diện tích đất canh tác của bạn và vị trí tại Đồng bằng Sông Cửu Long để tính phí bảo hiểm.',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />,
    },
    {
      title: 'Thanh Toán Phí Bảo Hiểm',
      description: 'Thanh toán phí bảo hiểm bằng USDC (4 USDC/ha) thông qua ví Web3 như MetaMask hoặc WalletConnect.',
      icon: <CreditCardIcon className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />,
    },
    {
      title: 'Nhận NFT Hợp Đồng',
      description: 'Nhận NFT đại diện cho hợp đồng bảo hiểm của bạn, được lưu trữ an toàn trên blockchain.',
      icon: <SparklesIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
    },
    {
      title: 'Tự Động Nhận Bồi Thường',
      description: 'Khi dữ liệu thời tiết từ Chainlink vượt ngưỡng (như mưa >200mm/5 ngày), hợp đồng thông minh tự động chi trả 10 USDC/ha.',
      icon: <CloudRainIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    },
    {
      title: 'Theo Dõi Trực Tuyến',
      description: 'Theo dõi dữ liệu thời tiết, tình trạng hợp đồng và các khoản chi trả tiềm năng trong thời gian thực.',
      icon: <CoinsIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
    },
  ];

const HowItWorks = () => {
  return (
      <section className="py-20 px-4 bg-gradient-to-b from-background/80 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              Quy Trình Hoạt Động
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Trải nghiệm quy trình bảo hiểm nông nghiệp đơn giản được hỗ trợ bởi công nghệ blockchain:
            </p>
          </motion.div>
          
          <Timeline items={timelineSteps} />
        </div>
      </section>
  )
}

export default HowItWorks
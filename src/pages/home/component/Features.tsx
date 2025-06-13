import { motion } from "framer-motion";
import { ArrowRightIcon, CloudRainIcon, BarChart3Icon, WalletIcon, DropletIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

// Features section with improved cards
const Features = () => {
    const features = [
      {
        title: "Bảo Hiểm Tham Số",
        description: "Tự động chi trả dựa trên dữ liệu thời tiết từ Chainlink Data Streams khi có mưa vượt ngưỡng hoặc hạn hán.",
        icon: <CloudRainIcon className="h-10 w-10 text-white" />,
        color: "from-green-400 to-cyan-400 dark:from-green-500 dark:to-cyan-500"
      },
      {
        title: "Tích Hợp DeFi",
        description: "Thanh toán phí bảo hiểm bằng USDC và nhận NFT cho hợp đồng bảo hiểm với quy trình đơn giản.",
        icon: <WalletIcon className="h-10 w-10 text-white" />,
        color: "from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500"
      },
      {
        title: "Bể Thanh Khoản",
        description: "Quản lý bể thanh khoản tích hợp với Aave để tạo lợi nhuận cho nhà đầu tư với APY hấp dẫn.",
        icon: <DropletIcon className="h-10 w-10 text-white" />,
        color: "from-blue-400 to-emerald-400 dark:from-blue-500 dark:to-emerald-500"
      },
      {
        title: "Minh Bạch & Phân Tích",
        description: "Hiển thị dữ liệu công khai về bể thanh khoản, chi trả và lợi nhuận DeFi một cách minh bạch.",
        icon: <BarChart3Icon className="h-10 w-10 text-white" />,
        color: "from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500"
      },
    ];
  
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              Giải Pháp Bảo Hiểm Toàn Diện
            </h2>
            <p className="text-xl text-foreground/70">
              Bảo vệ mùa màng của bạn với các sản phẩm bảo hiểm nông nghiệp dựa trên công nghệ blockchain
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto text-green-400 dark:text-green-300 hover:text-green-400/80 dark:hover:text-green-300/80 hover:bg-transparent">
                      Tìm hiểu thêm <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Features;
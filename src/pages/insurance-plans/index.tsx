import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShieldIcon, CheckIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InsurancePlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  coverageAmount: string;
  duration: string;
  category: 'basic' | 'premium' | 'enterprise';
}

const InsurancePlans = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'premium' | 'enterprise'>('all');
  
  const insurancePlans: InsurancePlan[] = [
    {
      id: 'basic-coverage',
      name: 'Bảo Hiểm Cơ Bản',
      price: 0.05,
      description: 'Bảo vệ thiết yếu cho cá nhân mới bắt đầu hành trình tiền điện tử',
      features: [
        'Bảo hiểm lên đến 5 ETH',
        'Bảo vệ khỏi lỗ hổng hợp đồng thông minh',
        'Thời hạn bảo hiểm 30 ngày',
        'Hỗ trợ khách hàng cơ bản',
      ],
      coverageAmount: '5 ETH',
      duration: '30 ngày',
      category: 'basic',
    },
    {
      id: 'premium-coverage',
      name: 'Bảo Hiểm Cao Cấp',
      price: 0.15,
      description: 'Bảo vệ nâng cao với các lợi ích bổ sung cho các nhà giao dịch tích cực',
      features: [
        'Bảo hiểm lên đến 20 ETH',
        'Bảo vệ khỏi lỗ hổng hợp đồng thông minh',
        'Bảo hiểm giao thức DeFi',
        'Thời hạn bảo hiểm 90 ngày',
        'Hỗ trợ khách hàng ưu tiên',
        'Hỗ trợ khôi phục ví',
      ],
      recommended: true,
      coverageAmount: '20 ETH',
      duration: '90 ngày',
      category: 'premium',
    },
    {
      id: 'enterprise-coverage',
      name: 'Bảo Hiểm Doanh Nghiệp',
      price: 0.5,
      description: 'Bảo vệ toàn diện cho doanh nghiệp và các khoản đầu tư lớn',
      features: [
        'Bảo hiểm lên đến 100 ETH',
        'Bảo vệ khỏi lỗ hổng hợp đồng thông minh',
        'Bảo hiểm giao thức DeFi',
        'Bảo vệ khỏi hack sàn giao dịch',
        'Thời hạn bảo hiểm 180 ngày',
        'Hỗ trợ khách hàng 24/7',
        'Xử lý yêu cầu bồi thường tùy chỉnh',
        'Bảo vệ đa ví',
      ],
      coverageAmount: '100 ETH',
      duration: '180 ngày',
      category: 'enterprise',
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? insurancePlans 
    : insurancePlans.filter(plan => plan.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with animated gradient background */}
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
              Chọn Gói Bảo Hiểm Của Bạn
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Bảo vệ tài sản số của bạn với các gói bảo hiểm dựa trên blockchain, cung cấp bảo hiểm minh bạch và xử lý yêu cầu bồi thường tức thì.
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
              Tất Cả Gói
            </button>
            <button 
              onClick={() => setSelectedCategory('basic')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'basic' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Cơ Bản
            </button>
            <button 
              onClick={() => setSelectedCategory('premium')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'premium' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Cao Cấp
            </button>
            <button 
              onClick={() => setSelectedCategory('enterprise')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'enterprise' ? 'bg-primary text-primary-foreground' : 'bg-card/50 text-foreground/70 hover:bg-card/80'}`}
            >
              Doanh Nghiệp
            </button>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${plan.recommended ? 'border-primary/50 shadow-md shadow-primary/20' : 'border-border'}`}>
                  {plan.recommended && (
                    <div className="bg-gradient-to-r from-primary to-cyan-500 text-white text-xs font-medium px-3 py-1 text-center">
                      KHUYẾN NGHỊ
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                        <CardDescription className="mt-2">{plan.description}</CardDescription>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ShieldIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="flex items-end gap-1 mb-1">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-lg font-medium">ETH</span>
                      </div>
                      <div className="text-sm text-foreground/70 flex items-center gap-1">
                        <InfoIcon className="h-3 w-3" />
                        <span>Bảo hiểm lên đến {plan.coverageAmount} trong {plan.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-4">
                      <GlowButton className="w-full justify-center" glowColor="rgba(0, 212, 255, 0.3)">
                        Đăng Ký Ngay <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </GlowButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Tại Sao Chọn Bảo Hiểm Blockchain Của Chúng Tôi?
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Giải pháp bảo hiểm blockchain của chúng tôi mang đến sự bảo vệ toàn diện cho tài sản số của bạn với tính minh bạch và hiệu quả vượt trội
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bảo Vệ Toàn Diện</h3>
              <p className="text-foreground/70">Bảo vệ tài sản số của bạn khỏi các lỗ hổng hợp đồng thông minh, hack và các rủi ro khác trong hệ sinh thái blockchain.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hợp Đồng Thông Minh</h3>
              <p className="text-foreground/70">Tất cả các hợp đồng bảo hiểm được thực hiện thông qua hợp đồng thông minh, đảm bảo tính minh bạch và không thể thay đổi.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Xử Lý Nhanh Chóng</h3>
              <p className="text-foreground/70">Yêu cầu bồi thường được xử lý tự động và thanh toán được thực hiện ngay lập tức sau khi xác minh thành công.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">An Toàn & Bảo Mật</h3>
              <p className="text-foreground/70">Hệ thống bảo hiểm của chúng tôi được kiểm toán bởi các chuyên gia bảo mật hàng đầu, đảm bảo an toàn tối đa cho tài sản của bạn.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-cyan-500/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Bảo Hiểm Blockchain Bằng Số
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Chúng tôi tự hào về những con số ấn tượng đã đạt được trong việc bảo vệ tài sản số của khách hàng
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                10K+
              </div>
              <p className="text-foreground/70">Khách Hàng Tin Tưởng</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                500 ETH
              </div>
              <p className="text-foreground/70">Đã Bồi Thường</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                99.8%
              </div>
              <p className="text-foreground/70">Tỷ Lệ Hài Lòng</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
"&lt; 24h"
              </div>
              <p className="text-foreground/70">Thời Gian Xử Lý</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-foreground/70">
              Tất cả những điều bạn cần biết về các gói bảo hiểm blockchain của chúng tôi
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
              <h3 className="text-xl font-semibold mb-2">Bảo hiểm blockchain hoạt động như thế nào?</h3>
              <p className="text-foreground/70">Các hợp đồng bảo hiểm của chúng tôi được mã hóa dưới dạng hợp đồng thông minh trên blockchain, tạo ra bản ghi bất biến về bảo hiểm của bạn. Khi có yêu cầu bồi thường, hợp đồng thông minh sẽ tự động xác minh các điều kiện và xử lý thanh toán mà không cần can thiệp thủ công.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Những tài sản nào được bảo hiểm?</h3>
              <p className="text-foreground/70">Các gói bảo hiểm của chúng tôi bao gồm nhiều loại tài sản số như tiền điện tử và token. Bảo hiểm bao gồm bảo vệ chống lại các lỗ hổng hợp đồng thông minh, hack sàn giao dịch và các rủi ro cụ thể khác tùy thuộc vào gói bạn chọn.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Làm thế nào để yêu cầu bồi thường?</h3>
              <p className="text-foreground/70">Yêu cầu bồi thường được khởi tạo thông qua giao diện dApp của chúng tôi. Chỉ cần kết nối ví của bạn, chọn hợp đồng bảo hiểm và gửi chi tiết yêu cầu. Hợp đồng thông minh của chúng tôi sẽ tự động xác minh yêu cầu dựa trên dữ liệu blockchain và xử lý các yêu cầu hợp lệ ngay lập tức.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Tôi có thể nâng cấp gói bảo hiểm không?</h3>
              <p className="text-foreground/70">Có, bạn có thể nâng cấp gói bảo hiểm bất cứ lúc nào. Phần bảo hiểm còn lại từ gói hiện tại của bạn sẽ được tính theo tỷ lệ và áp dụng cho gói mới, đảm bảo bạn không mất bất kỳ giá trị nào khi nâng cấp.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Khám phá trải nghiệm của những khách hàng đã tin tưởng giải pháp bảo hiểm blockchain của chúng tôi
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
                <p className="text-foreground/70 mb-6 italic">"Sau khi bị hack sàn giao dịch, tôi đã mất một lượng ETH đáng kể. Nhờ có bảo hiểm blockchain, tôi đã được bồi thường đầy đủ chỉ trong vài giờ. Dịch vụ tuyệt vời!"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">TN</span>
                  </div>
                  <div>
                    <p className="font-semibold">Trần Nam</p>
                    <p className="text-sm text-foreground/70">Nhà đầu tư cá nhân</p>
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
                <p className="text-foreground/70 mb-6 italic">"Là một doanh nghiệp hoạt động trong lĩnh vực DeFi, việc bảo vệ tài sản của khách hàng là ưu tiên hàng đầu. Gói bảo hiểm doanh nghiệp đã giúp chúng tôi xây dựng niềm tin với người dùng."</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">HL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Hoàng Linh</p>
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
                <p className="text-foreground/70 mb-6 italic">"Quy trình yêu cầu bồi thường đơn giản và minh bạch. Tôi đã nhận được bồi thường cho lỗ hổng hợp đồng thông minh chỉ trong vài phút sau khi gửi yêu cầu. Đây là dịch vụ không thể thiếu cho bất kỳ ai tham gia vào thị trường crypto."</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">MT</span>
                  </div>
                  <div>
                    <p className="font-semibold">Minh Tuấn</p>
                    <p className="text-sm text-foreground/70">Nhà phát triển blockchain</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Sẵn Sàng Bảo Vệ Tài Sản Số Của Bạn?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn người dùng blockchain đang tin tưởng các gói bảo hiểm của chúng tôi để bảo vệ khoản đầu tư của họ khỏi những rủi ro không lường trước.
            </p>
            <GlowButton size="lg" className="px-8 py-6 text-lg">
              Bắt Đầu Ngay Hôm Nay
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePlans;
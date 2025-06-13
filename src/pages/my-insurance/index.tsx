import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShieldIcon, FileTextIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InsurancePolicy {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'expired' | 'pending' | 'claimed';
  coverageAmount: string;
  premium: string;
  startDate: string;
  endDate: string;
  description: string;
}

const MyInsurance = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired' | 'pending' | 'claimed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dữ liệu mẫu các hợp đồng bảo hiểm
  const insurancePolicies: InsurancePolicy[] = [
    {
      id: 'INS-001',
      name: 'Bảo Vệ Hợp Đồng Thông Minh',
      type: 'Bảo Hiểm Cơ Bản',
      status: 'active',
      coverageAmount: '5 ETH',
      premium: '0.05 ETH',
      startDate: '2023-10-15',
      endDate: '2024-10-15',
      description: 'Bảo vệ chống lại các lỗ hổng và khai thác hợp đồng thông minh.',
    },
    {
      id: 'INS-002',
      name: 'Bảo Hiểm Giao Thức DeFi',
      type: 'Bảo Hiểm Cao Cấp',
      status: 'active',
      coverageAmount: '20 ETH',
      premium: '0.15 ETH',
      startDate: '2023-11-01',
      endDate: '2024-02-01',
      description: 'Bảo hiểm toàn diện cho việc tham gia giao thức DeFi và canh tác lợi nhuận.',
    },
    {
      id: 'INS-003',
      name: 'Bảo Vệ Hack Sàn Giao Dịch',
      type: 'Bảo Hiểm Doanh Nghiệp',
      status: 'expired',
      coverageAmount: '50 ETH',
      premium: '0.3 ETH',
      startDate: '2023-05-10',
      endDate: '2023-11-10',
      description: 'Bảo vệ chống lại tổn thất do hack sàn giao dịch và vi phạm bảo mật.',
    },
    {
      id: 'INS-004',
      name: 'Bảo Hiểm Bộ Sưu Tập NFT',
      type: 'Bảo Hiểm Cao Cấp',
      status: 'pending',
      coverageAmount: '15 ETH',
      premium: '0.12 ETH',
      startDate: 'Pending',
      endDate: 'Pending',
      description: 'Bảo hiểm cho các bộ sưu tập NFT giá trị cao chống lại trộm cắp và vấn đề hợp đồng thông minh.',
    },
    {
      id: 'INS-005',
      name: 'Bảo Hiểm Bảo Mật Ví',
      type: 'Bảo Hiểm Cơ Bản',
      status: 'claimed',
      coverageAmount: '3 ETH',
      premium: '0.03 ETH',
      startDate: '2023-08-15',
      endDate: '2024-08-15',
      description: 'Bảo vệ chống lại hack ví và giao dịch trái phép.',
    },
  ];

  // Lọc các hợp đồng bảo hiểm dựa trên tab đang hoạt động và truy vấn tìm kiếm
  const filteredPolicies = insurancePolicies
    .filter(policy => {
      if (activeTab === 'all') return true;
      return policy.status === activeTab;
    })
    .filter(policy => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        policy.name.toLowerCase().includes(query) ||
        policy.id.toLowerCase().includes(query) ||
        policy.type.toLowerCase().includes(query)
      );
    });

  // Lấy biểu tượng và màu sắc trạng thái
  const getStatusDetails = (status: InsurancePolicy['status']) => {
    switch (status) {
      case 'active':
        return { 
          icon: <CheckCircleIcon className="h-5 w-5" />, 
          color: 'text-green-500',
          bgColor: 'bg-green-500/10'
        };
      case 'expired':
        return { 
          icon: <AlertCircleIcon className="h-5 w-5" />, 
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10'
        };
      case 'pending':
        return { 
          icon: <ClockIcon className="h-5 w-5" />, 
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10'
        };
      case 'claimed':
        return { 
          icon: <FileTextIcon className="h-5 w-5" />, 
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10'
        };
      default:
        return { 
          icon: <ShieldIcon className="h-5 w-5" />, 
          color: 'text-primary',
          bgColor: 'bg-primary/10'
        };
    }
  };

  // Định dạng ngày tháng để dễ đọc hơn
  const formatDate = (dateString: string) => {
    if (dateString === 'Pending') return 'Đang chờ';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Phần Hero với nền gradient động */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0"></div>
        
        {/* Các quả cầu gradient động */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Hợp Đồng Bảo Hiểm Của Tôi
                </h1>
                <p className="text-lg text-foreground/70">
                  Quản lý và theo dõi tất cả các hợp đồng bảo hiểm blockchain của bạn tại một nơi
                </p>
              </div>
              <GlowButton className="flex items-center gap-1.5">
                <PlusIcon className="h-4 w-4" />
                Hợp Đồng Mới
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phần Hợp Đồng Bảo Hiểm */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Bộ lọc và Tìm kiếm */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border border-primary/10">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm hợp đồng theo tên hoặc ID..."
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <span className="text-sm text-foreground/70 flex items-center gap-1">
                      <FilterIcon className="h-4 w-4" /> Lọc:
                    </span>
                    <Button 
                      variant={activeTab === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('all')}
                      className="whitespace-nowrap"
                    >
                      Tất Cả
                    </Button>
                    <Button 
                      variant={activeTab === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('active')}
                      className="whitespace-nowrap"
                    >
                      Đang Hoạt Động
                    </Button>
                    <Button 
                      variant={activeTab === 'pending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('pending')}
                      className="whitespace-nowrap"
                    >
                      Đang Chờ
                    </Button>
                    <Button 
                      variant={activeTab === 'claimed' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('claimed')}
                      className="whitespace-nowrap"
                    >
                      Đã Yêu Cầu
                    </Button>
                    <Button 
                      variant={activeTab === 'expired' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('expired')}
                      className="whitespace-nowrap"
                    >
                      Đã Hết Hạn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danh sách Hợp đồng */}
          <div className="space-y-4">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy, index) => {
                const { icon, color, bgColor } = getStatusDetails(policy.status);
                
                return (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="border border-border hover:border-primary/30 transition-all duration-200 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Phần bên trái với chi tiết hợp đồng */}
                          <div className="md:col-span-9 p-6">
                            <div className="flex items-start gap-4">
                              <div className={`${bgColor} p-3 rounded-full`}>
                                <ShieldIcon className={`h-6 w-6 ${color}`} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                  <div>
                                    <h3 className="text-xl font-semibold">{policy.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                                      <span>ID: {policy.id}</span>
                                      <span className="text-foreground/30">•</span>
                                      <span>{policy.type}</span>
                                    </div>
                                  </div>
                                  
                                  <div className={`flex items-center gap-1.5 ${color} text-sm font-medium px-3 py-1 rounded-full ${bgColor}`}>
                                    {icon}
                                    <span className="capitalize">
                                      {policy.status === 'active' && 'Đang hoạt động'}
                                      {policy.status === 'expired' && 'Đã hết hạn'}
                                      {policy.status === 'pending' && 'Đang chờ'}
                                      {policy.status === 'claimed' && 'Đã yêu cầu'}
                                    </span>
                                  </div>
                                </div>
                                
                                <p className="text-foreground/70 mb-4">
                                  {policy.description}
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <div className="text-foreground/50 mb-1">Số Tiền Bảo Hiểm</div>
                                    <div className="font-medium">{policy.coverageAmount}</div>
                                  </div>
                                  <div>
                                    <div className="text-foreground/50 mb-1">Phí Bảo Hiểm</div>
                                    <div className="font-medium">{policy.premium}</div>
                                  </div>
                                  <div>
                                    <div className="text-foreground/50 mb-1">Ngày Bắt Đầu</div>
                                    <div className="font-medium">{formatDate(policy.startDate)}</div>
                                  </div>
                                  <div>
                                    <div className="text-foreground/50 mb-1">Ngày Kết Thúc</div>
                                    <div className="font-medium">{formatDate(policy.endDate)}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Phần bên phải với các hành động */}
                          <div className="md:col-span-3 bg-card/50 border-t md:border-t-0 md:border-l border-border flex flex-col justify-center p-6">
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full justify-start">
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                Xem Chi Tiết
                              </Button>
                              
                              {policy.status === 'active' && (
                                <Button variant="outline" className="w-full justify-start">
                                  <AlertCircleIcon className="mr-2 h-4 w-4" />
                                  Yêu Cầu Bồi Thường
                                </Button>
                              )}
                              
                              {policy.status === 'expired' && (
                                <GlowButton className="w-full justify-start">
                                  <PlusIcon className="mr-2 h-4 w-4" />
                                  Gia Hạn Hợp Đồng
                                </GlowButton>
                              )}
                              
                              {policy.status === 'pending' && (
                                <Button variant="outline" className="w-full justify-start">
                                  <ClockIcon className="mr-2 h-4 w-4" />
                                  Kiểm Tra Trạng Thái
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="bg-card/50 inline-flex rounded-full p-4 mb-4">
                  <ShieldIcon className="h-8 w-8 text-foreground/30" />
                </div>
                <h3 className="text-xl font-medium mb-2">Không tìm thấy hợp đồng nào</h3>
                <p className="text-foreground/70 mb-6">
                  {searchQuery 
                    ? "Không có hợp đồng nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử điều chỉnh bộ lọc."
                    : "Bạn chưa có hợp đồng bảo hiểm nào."}
                </p>
                <GlowButton>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Đăng Ký Hợp Đồng Đầu Tiên
                </GlowButton>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Phần Thống Kê Bảo Hiểm */}
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
              Thống Kê Bảo Hiểm
            </h2>
            <p className="text-lg text-foreground/70">
              Tổng quan về danh mục bảo hiểm và lịch sử yêu cầu bồi thường của bạn
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
                {insurancePolicies.filter(p => p.status === 'active').length}
              </div>
              <div className="text-foreground/70">Hợp Đồng Đang Hoạt Động</div>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                28 ETH
              </div>
              <div className="text-foreground/70">Tổng Bảo Hiểm</div>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                1
              </div>
              <div className="text-foreground/70">Yêu Cầu Đã Nộp</div>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                3 ETH
              </div>
              <div className="text-foreground/70">Bồi Thường Đã Trả</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phần CTA */}
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
                  Cần Thêm Bảo Hiểm?
                </h2>
                <p className="text-foreground/70 max-w-xl">
                  Khám phá các gói bảo hiểm của chúng tôi để tìm bảo hiểm hoàn hảo cho tài sản số của bạn.
                </p>
              </div>
              <GlowButton size="lg" className="whitespace-nowrap">
                Xem Các Gói
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MyInsurance;
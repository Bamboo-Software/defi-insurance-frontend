import { TestimonialGrid } from '@/components/ui/testimonial'
import { motion } from 'framer-motion'


  const testimonials = [
    {
      quote: 'Khi mưa lớn làm ngập úng ruộng lúa của tôi, khoản bồi thường được chuyển đến ví của tôi chỉ trong vài phút. Đây thực sự là một cách tiếp cận mới cho bảo hiểm nông nghiệp!',
      author: 'Nguyễn Văn Minh',
      role: 'Nông dân, Cần Thơ',
    },
    {
      quote: "Tính minh bạch khi thấy hợp đồng bảo hiểm của tôi trên blockchain giúp tôi yên tâm rằng tôi đang nhận được đúng những gì tôi đã trả tiền.",
      author: 'Trần Thị Hương',
      role: 'Nông dân, An Giang',
    },
    {
      quote: 'Là một nhà đầu tư, tôi đánh giá cao khả năng theo dõi hiệu suất của bể thanh khoản và nhận lợi nhuận ổn định từ việc cung cấp thanh khoản cho nền tảng.',
      author: 'Lê Minh Tuấn',
      role: 'Nhà đầu tư DeFi',
    },
    {
      quote: 'Tôi đã từng mất trắng vụ mùa do hạn hán mà không có bảo hiểm. Giờ đây với bảo hiểm tham số, tôi có thể yên tâm canh tác mà không lo lắng về những rủi ro thời tiết.',
      author: 'Phạm Văn Đức',
      role: 'Nông dân, Đồng Tháp',
    },
  ];

const Testimonials = () => {
  return (
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              Chia Sẻ Từ Người Dùng
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Tham gia cùng hàng nghìn nông dân và nhà đầu tư đã thay đổi trải nghiệm bảo hiểm của họ:
            </p>
          </motion.div>
          
          <TestimonialGrid testimonials={testimonials} />
        </div>
      </section>
  )
}

export default Testimonials
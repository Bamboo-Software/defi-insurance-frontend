import { TestimonialGrid } from '@/components/ui/testimonial'
import { motion } from 'framer-motion'


const testimonials = [
  {
    quote: 'When heavy rain flooded my rice field, the compensation was transferred to my wallet within minutes. This is truly a new approach to agricultural insurance!',
    author: 'Nguyen Van Minh',
    role: 'Farmer, Can Tho',
  },
  {
    quote: "The transparency of seeing my insurance contract on the blockchain gives me peace of mind that I'm getting exactly what I paid for.",
    author: 'Tran Thi Huong',
    role: 'Farmer, An Giang',
  },
  {
    quote: 'As an investor, I appreciate the ability to track the performance of the liquidity pool and receive stable returns from providing liquidity to the platform.',
    author: 'Le Minh Tuan',
    role: 'DeFi Investor',
  },
  {
    quote: 'I once lost an entire harvest to drought without insurance. Now with parametric insurance, I can farm with confidence without worrying about weather risks.',
    author: 'Pham Van Duc',
    role: 'Farmer, Dong Thap',
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
              User Testimonials
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Join thousands of farmers and investors who have transformed their insurance experience:
            </p>
          </motion.div>
          
          <TestimonialGrid testimonials={testimonials} />
        </div>
      </section>
  )
}

export default Testimonials
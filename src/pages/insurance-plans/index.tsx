import { useState } from 'react';
import { useGetInsurancePlansQuery } from '@/app/services/insurance/package';
import type { IInsurancePackageResponse } from '@/types/interfaces/insurance-package';
import BenefitsSection from './components/BenefitsSection';
import StatisticsSection from './components/StatisticsSection';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import HeroSection from './components/HeroSection';
import PlanCard from './components/PlanCard';

const InsurancePlans = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'premium' | 'enterprise'>('all');
  const { data: plansData, isLoading, error } = useGetInsurancePlansQuery();
  
  const insurancePlans = plansData?.data || [];
  
  const getCategory = (plan: IInsurancePackageResponse): 'basic' | 'premium' | 'enterprise' => {
    if (plan.price < 0.1) return 'basic';
    if (plan.price < 0.3) return 'premium';
    return 'enterprise';
  };

  const filteredPlans = selectedCategory === 'all' 
    ? insurancePlans 
    : insurancePlans.filter(plan => getCategory(plan) === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-lg">Loading insurance plans...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">Failed to load insurance plans. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
              {filteredPlans.length === 0 && (
                <div className="col-span-3 text-center py-10">
                  <p className="text-lg text-foreground/70">No insurance plans found in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <BenefitsSection />
      <StatisticsSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default InsurancePlans;
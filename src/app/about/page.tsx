import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Award, Heart } from 'lucide-react';

export const metadata = {
  title: 'About Us - Niketan Mart',
};

export default function AboutPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Our Story</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark mt-2 mb-4 leading-snug">
            Fresh Groceries Delivered Directly to Your Doorstep
          </h1>
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
            Founded in 2023, Niketan Mart is dedicated to revolutionizing grocery shopping in Bangladesh. We bring farm-fresh organic produce, daily essentials, and premium international goods straight to your family with uncompromised quality and speed.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Happy Customers', value: '50,000+' },
            { label: 'Products Available', value: '10,000+' },
            { label: 'Retail Stores', value: '12 Outlets' },
            { label: 'On-Time Delivery', value: '99.4%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8 text-center">Why Choose Niketan Mart</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: '100% Organic & Fresh', desc: 'Directly sourced from trusted local farmers and certified organic producers.' },
              { icon: Truck, title: 'Express Delivery', desc: 'Get your daily essentials delivered in 60 minutes or choose your preferred slot.' },
              { icon: Award, title: 'Quality Guaranteed', desc: 'Strict multi-tier quality checks on every item before it leaves our store.' },
              { icon: Heart, title: 'Customer First', desc: 'Dedicated 24/7 customer support ready to help with hassle-free refunds.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:border-rose-200 transition-all">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
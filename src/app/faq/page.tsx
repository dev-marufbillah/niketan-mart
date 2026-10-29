import React from 'react';

export const metadata = {
  title: 'FAQ - Niketon Mart',
};

const FAQS = [
  {
    question: "How do I place an order?",
    answer: "Browse our categories, add items to your cart, and proceed to checkout. You will need to sign in or create an account to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), bKash, Nagad, and all major Credit/Debit cards."
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, you can cancel your order before it gets dispatched. Go to your Account Dashboard > Orders, and click 'Cancel Order'."
  },
  {
    question: "Do you deliver fresh meat and vegetables?",
    answer: "Absolutely! We guarantee the freshness of all our perishable items. They are sourced daily and delivered in temperature-controlled bags."
  },
  {
    question: "What if I miss my delivery?",
    answer: "Our rider will try to contact you. If unreachable, the order will be rescheduled for the next available slot. Additional delivery charges may apply."
  }
];

export default function FAQPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">Frequently Asked Questions</h1>
        <p className="text-sm sm:text-base text-stone-500 mb-10 text-center">Find answers to common questions about our services.</p>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 mb-2">{faq.question}</h3>
              <p className="text-sm sm:text-base text-stone-500">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-stone-500 text-sm">
            Still have questions? <a href="/contact" className="text-rose-600 font-semibold hover:underline">Contact our Support Team</a>
          </p>
        </div>
      </div>
    </main>
  );
}
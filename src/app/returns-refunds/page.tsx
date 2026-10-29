import React from 'react';

export default function ReturnsRefundsPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8 text-center">
          Returns &amp; Refunds
        </h1>
        
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200/80 shadow-xs space-y-8">
          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">Our Return Policy</h2>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you receive a damaged, defective, or incorrect item, you can return it within <strong className="text-rose-600">3 days</strong> of delivery. Perishable goods (like fresh vegetables and meat) must be reported within <strong className="text-rose-600">24 hours</strong>.
            </p>
          </section>

          <hr className="border-stone-100" />

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">How to Return an Item</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-stone-500 leading-relaxed">
              <li>Log in to your account and go to your Order History.</li>
              <li>Select the order and click on &quot;Request Return&quot;.</li>
              <li>Provide a reason and attach a photo if the item is damaged.</li>
              <li>Our delivery executive will pick up the item within 48 hours.</li>
            </ol>
          </section>

          <hr className="border-stone-100" />

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">Refund Process</h2>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Once we receive and inspect your returned item, we will process your refund. 
              Refunds are issued to your original payment method (e.g., bKash, Card) within 3-5 business days. 
              If you paid by Cash on Delivery (COD), the refund will be credited to your Niketan Mart wallet.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
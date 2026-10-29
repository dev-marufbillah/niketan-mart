import React from 'react';

export const metadata = {
  title: 'Delivery Information - Niketon Mart',
};

export default function DeliveryInfoPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8 text-center">Delivery Information</h1>
        
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-8">
          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">Delivery Options & Charges</h2>
            <p className="text-sm sm:text-base text-stone-500 mb-4">
              We offer several delivery options to ensure you receive your groceries when you need them. Delivery charges are calculated based on your location and chosen delivery slot.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-stone-500">
              <li><strong className="text-stone-700">Standard Delivery (Next Day):</strong> ৳50 - Available for all locations within Dhaka.</li>
              <li><strong className="text-stone-700">Express Delivery (Same Day):</strong> ৳100 - Order before 2 PM for same-day delivery.</li>
              <li><strong className="text-stone-700">Free Delivery:</strong> Orders over ৳2,000 qualify for free standard delivery.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">Delivery Time Slots</h2>
            <p className="text-sm sm:text-base text-stone-500">
              You can choose a convenient 2-hour delivery slot during checkout. Our delivery hours are from 9:00 AM to 9:00 PM, Saturday to Thursday.
            </p>
          </section>

          <hr className="border-stone-100" />

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-3">Order Tracking</h2>
            <p className="text-sm sm:text-base text-stone-500">
              Once your order is confirmed, you can track its status directly from your Account Dashboard. Our delivery rider will call you when they are near your location.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
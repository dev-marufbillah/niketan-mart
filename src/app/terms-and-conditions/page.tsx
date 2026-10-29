import React from 'react';

export const metadata = {
  title: 'Terms & Conditions - Niketan Mart',
};

export default function TermsConditionsPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">Terms & Conditions</h1>
        <p className="text-xs sm:text-sm text-stone-400 mb-8 text-center">Effective Date: January 1, 2025</p>

        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6 text-stone-600 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">1. Overview</h2>
            <p>
              By accessing and using Niketan Mart website or mobile application, you agree to comply with these terms and conditions. Please read them carefully before making a transaction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">2. Pricing & Availability</h2>
            <p>
              All prices listed on the site are in Bangladeshi Taka (৳) and include applicable taxes unless specified otherwise. Prices and product availability are subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. Niketan Mart reserves the right to suspend accounts engaged in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">4. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
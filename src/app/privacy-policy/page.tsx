import React from 'react';

export const metadata = {
  title: 'Privacy Policy - Niketan Mart',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-stone-400 mb-8 text-center">Last updated: January 2025</p>

        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6 text-stone-600 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly when placing an order, creating an account, or subscribing to our newsletter. This includes your name, delivery address, phone number, and payment details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">2. How We Use Your Data</h2>
            <p>
              Your data is utilized strictly for processing orders, managing your account, providing customer support, and improving our delivery network. We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">3. Security</h2>
            <p>
              We implement industry-standard encryption protocols (SSL) to protect your payment credentials and personal data during transmission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-2">4. Contact Privacy Team</h2>
            <p>
              If you have any questions regarding your personal information or wish to request data deletion, contact us at <strong className="text-stone-800">privacy@niketonmart.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
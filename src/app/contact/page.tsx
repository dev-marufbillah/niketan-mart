'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2">Contact Us</h1>
        <p className="text-sm sm:text-base text-stone-500 mb-10">
          We&apos;d love to hear from you. Please reach out with any questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs">
            <h2 className="text-xl font-bold text-brand-dark mb-4">Get in Touch</h2>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Phone</h3>
                <p className="text-sm text-stone-500 mt-1">+880 1234 567 890</p>
                <p className="text-sm text-stone-500">Sat-Thu, 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Email</h3>
                <p className="text-sm text-stone-500 mt-1">support@niketonmart.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Address</h3>
                <p className="text-sm text-stone-500 mt-1">
                  123 Niketon Avenue,<br />Gulshan 1, Dhaka 1212,<br />Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs">
            <h2 className="text-xl font-bold text-brand-dark mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-600">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-stone-700">First Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-stone-700">Last Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 outline-none resize-none transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-md active:scale-[0.99]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
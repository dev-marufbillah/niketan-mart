import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Our Stores - Niketan Mart',
};

const STORES = [
  {
    name: 'Niketan Main Hub',
    address: 'House 42, Road 3, Block B, Niketan, Gulshan-1, Dhaka 1212',
    phone: '+880 1711 000 111',
    hours: '8:00 AM - 10:00 PM (Daily)',
    zone: 'Gulshan / Niketan Area',
  },
  {
    name: 'Dhanmondi Express Store',
    address: 'House 15, Road 27 (Old), Dhanmondi, Dhaka 1209',
    phone: '+880 1711 000 222',
    hours: '8:00 AM - 10:00 PM (Daily)',
    zone: 'Dhanmondi & Lalmatia',
  },
  {
    name: 'Uttara Retail Outlet',
    address: 'Plot 8, Sector 3, Uttara Model Town, Dhaka 1230',
    phone: '+880 1711 000 333',
    hours: '8:00 AM - 10:00 PM (Daily)',
    zone: 'Uttara Sector 1-14',
  },
  {
    name: 'Banani Gourmet Superstore',
    address: 'Block E, Road 11, Banani, Dhaka 1213',
    phone: '+880 1711 000 444',
    hours: '8:00 AM - 11:00 PM (Daily)',
    zone: 'Banani & Baridhara',
  },
];

export default function StoresPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Physical Outlets</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark mt-2 mb-3">
            Visit Our Superstores
          </h1>
          <p className="text-sm sm:text-base text-stone-500">
            Prefer in-person shopping? Drop by any of our physical stores to experience fresh products firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STORES.map((store, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold mb-3">
                  {store.zone}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">{store.name}</h3>

                <div className="space-y-3 text-sm text-stone-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Map</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
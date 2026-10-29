"use client";

import { useState } from "react";
import { ChevronDown, Clock, MapPin } from "lucide-react";

const areas = [
  { name: "Gulshan 1, Dhaka", slot: "Within 45 Minutes" },
  { name: "Gulshan 2, Dhaka", slot: "Within 45 Minutes" },
  { name: "Banani, Dhaka", slot: "Within 60 Minutes" },
  { name: "Baridhara, Dhaka", slot: "Within 60 Minutes" },
  { name: "Dhanmondi, Dhaka", slot: "Within 90 Minutes" },
];

export default function DeliveryChecker() {
  const [area, setArea] = useState(areas[0].name);
  const current = areas.find((a) => a.name === area) ?? areas[0];

  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 pb-10 sm:pb-14 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-brand-gold">
              <MapPin size={22} />
            </span>
            <div className="leading-tight">
              <h3 className="text-base font-bold text-brand-dark">
                Check Delivery Time for Your Neighborhood
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Select your area to check live slot availability and instant
                grocery dispatch time.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="appearance-none rounded-lg border border-stone-300 bg-white py-2.5 pl-3 pr-9 text-xs font-medium text-brand-dark outline-none focus:border-brand-gold"
              >
                {areas.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
              />
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700">
              <Clock size={14} />
              Next Slot: {current.slot}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
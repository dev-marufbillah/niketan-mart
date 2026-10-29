"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Image pore add korte chaile:
 * 1. public/images folder e image rakhun
 * 2. `image: null` er jayga-y likhun, jemon: image: "/images/hero-1.jpg"
 */
const slides: {
  title: string;
  sub: string;
  image: string | null;
  bg: string;
}[] = [
  {
    title: "Fresh • Healthy • Convenient",
    sub: "Artisan sourdough, crisp green vegetables & extra virgin olive oil",
    image: null,
    bg: "from-[#ecd08a] via-[#c49a4a] to-[#3f3119]",
  },
  {
    title: "Straight From the Farm",
    sub: "Seasonal vegetables picked fresh every morning",
    image: null,
    bg: "from-[#cfe3b0] via-[#7fa35a] to-[#27401c]",
  },
  {
    title: "Restaurant Meals, Delivered",
    sub: "Gulshan's finest kitchens at your doorstep",
    image: null,
    bg: "from-[#f1c6a0] via-[#c9784a] to-[#4a2312]",
  },
];

const stats = [
  { value: "45 Mins", label: "Average Delivery" },
  { value: "100% Halal", label: "Fresh Meat & Fish" },
  { value: "৳0 Delivery", label: "Orders over ৳1,500" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto grid max-w-360 items-center gap-10 px-4 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
            <span className="h-3 w-3 rounded-full bg-amber-200" />
            Fresh Groceries &amp; More
          </span>

          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-brand-dark sm:text-6xl lg:text-7xl">
            Everything for
            <span className="block font-normal italic">Your Table.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-500 sm:text-lg">
            Hand-selected farm fresh produce, daily pantry staples, artisanal
            bakes, and beloved restaurant meals from Gulshan&apos;s finest
            kitchens delivered right to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-dark shadow-sm transition hover:brightness-95"
            >
              Explore the Market <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop/restaurant-meals"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-brand-dark transition hover:bg-stone-50"
            >
              Discover Restaurant Meals
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-stone-200 pt-6">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`${
                  i > 0 ? "border-l border-stone-200 pl-3 sm:pl-5" : ""
                } pr-2`}
              >
                <p className="text-sm font-bold text-brand-dark sm:text-base">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-stone-500 sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          {/* Floating badge */}
          <div className="absolute -top-4 right-3 z-10 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg sm:right-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Sparkles size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                Harvested 5:00 AM
              </span>
              <span className="block text-xs font-bold text-brand-dark">
                Direct From Narsingdi &amp; Savar
              </span>
            </span>
          </div>

          {/* Card */}
          <div className="rounded-4xl bg-[#fdf9ec] p-4 shadow-xl ring-1 ring-black/5 sm:p-5">
            <div
              className={`relative aspect-4/3 overflow-hidden rounded-2xl bg-linear-to-br ${slide.bg} transition-all duration-700`}
            >
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 px-4 pb-6 text-center text-white sm:pb-8">
                <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-dark">
                  Niketan Mart Bag
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  {slide.title}
                </h2>
                <p className="mt-1.5 text-xs text-white/90 sm:text-sm">
                  {slide.sub}
                </p>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-brand-gold" : "w-1.5 bg-stone-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
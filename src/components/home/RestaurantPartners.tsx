import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Image pore add korte chaile:
 * 1. public/images e image rakhun (jemon biryani.jpg)
 * 2. `image: null` er jayga-y likhun: image: "/images/biryani.jpg"
 */
const meal = {
  name: "Old Dhaka Style Dum Kacchi Biryani & Shahi Borhani",
  price: "৳380",
  ready: "Ready in 25–30 mins",
  image: null as string | null,
};

export default function RestaurantPartners() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 pb-8 pt-4 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl bg-[#1c1917] p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
              Restaurant Partners
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Delicious Meals From
              <br />
              Our Partners
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              Enjoy your favourite chef-crafted dishes and authentic biryanis
              from trusted Gulshan &amp; Banani restaurant partners.
            </p>
            <Link
              href="/shop/restaurant-meals"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-dark transition hover:brightness-95"
            >
              Explore Restaurant Meals <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-[#8a5a2b] via-[#5b3a1e] to-[#2a1a0e]">
            {meal.image && (
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10" />

            <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {meal.ready}
            </span>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
              <p className="text-[11px] font-semibold sm:text-xs">{meal.name}</p>
              <p className="shrink-0 text-[11px] font-semibold text-brand-gold sm:text-xs">
                From {meal.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
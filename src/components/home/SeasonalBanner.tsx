import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

/**
 * Product image pore add korte chaile:
 * 1. public/images e image rakhun
 * 2. `image: null` er jayga-y likhun, jemon: image: "/images/tomatoes.jpg"
 */
const featured = {
  tag: "Early Morning Harvest",
  name: "Fresh Country Tomatoes",
  price: "৳69 / kg",
  href: "/shop/fresh-market",
  image: null as string | null,
};

export default function SeasonalBanner() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 pb-10 sm:pb-14 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1e3a28] via-[#2c4a35] to-[#1c3324] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-y-0 left-1/3 w-1/3 bg-white/5 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            {/* Left */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-gold">
                Fresh Market • আজকের তাজা সবজি
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Seasonal Freshness
                <br />
                Just For You
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                Handpicked farm vegetables, local greens, and organic fruits
                sourced before sunrise from trusted farmers.
              </p>
              <Link
                href="/shop/fresh-market"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-dark transition hover:brightness-95"
              >
                Shop Fresh Market <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: floating product card */}
            <div className="lg:flex lg:justify-end">
              <Link
                href={featured.href}
                className="flex w-full max-w-md items-center gap-4 rounded-2xl bg-white p-3 shadow-xl transition hover:-translate-y-0.5 lg:max-w-lg"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-red-300 to-red-600">
                  {featured.image && (
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    {featured.tag}
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-brand-dark sm:text-base">
                    {featured.name}
                  </p>
                  <p className="mt-1 text-xs font-bold text-brand-gold">
                    {featured.price}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
                  <ChevronRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
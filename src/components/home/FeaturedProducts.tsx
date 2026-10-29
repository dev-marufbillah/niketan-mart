"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products as allProducts, Category } from "@/lib/data/products";
import ProductCard from "@/components/shop/ProductCard";

const tabs: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "কাঁচাবাজার", value: "fresh" },
  { label: "ফলমূল", value: "fruits" },
  { label: "মাছ ও মাংস", value: "meat" },
];

export default function FeaturedProducts() {
  const [tab, setTab] = useState<"all" | Category>("all");

  const featuredList = allProducts.slice(0, 12);
  const visible =
    tab === "all" ? featuredList : featuredList.filter((p) => p.category === tab);

  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 py-10 sm:py-14 lg:px-8">
        {/* Heading + Tabs */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
              Everyday Essentials
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
              Featured Products
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 pb-1">
            {tabs.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  tab === t.value
                    ? "bg-brand-dark text-white"
                    : "bg-stone-100 text-brand-dark hover:bg-stone-200"
                }`}
              >
                {t.label}
              </button>
            ))}
            <Link
              href="/shop/all"
              className="ml-1 flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:underline"
            >
              See All <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Product Grid using the exact card design */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
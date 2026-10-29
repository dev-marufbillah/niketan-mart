"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Timer, Zap, Heart, ShoppingBag } from "lucide-react";
import { products, Product } from "@/lib/data/products";
import { useShop } from "@/context/ShopContext";

export default function DealsView() {
  // শুধুমাত্র ডিসকাউন্ট (oldPrice > price) বা অফার ব্যাজ আছে এমন প্রোডাক্ট ফিল্টার করা হচ্ছে
  const dealProducts = products.filter(
    (p) => (p.oldPrice && p.oldPrice > p.price) || (p.badge && p.badge.length > 0)
  );

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Deals Header Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-360 mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 fill-current text-red-600" />
                Limited Time Offers
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-brand-dark leading-snug">
                Today&apos;s Deals <span className="text-stone-300 font-light mx-1">/</span> <span className="text-brand-gold">আজকের অফার</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-500 max-w-xl">
                Save big on your daily essentials. Fresh stock added every morning.
                Grab them before they are gone!
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-3 bg-brand-dark text-white px-5 py-3 rounded-sm shadow-sm self-start md:self-auto">
              <Timer className="w-5 h-5 text-brand-gold animate-pulse" />
              <div>
                <p className="text-[10px] uppercase opacity-70 leading-none mb-1 tracking-wider">Ends In</p>
                <p className="text-sm font-bold tracking-widest font-mono text-brand-gold">12 : 45 : 02</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-360 mx-auto px-4 py-4">
        <nav className="flex text-[11px] uppercase tracking-wider font-bold">
          <Link href="/" className="text-stone-400 hover:text-brand-gold transition-colors">Home</Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-brand-dark">Today&apos;s Deals</span>
        </nav>
      </div>

      {/* Products Grid */}
      <main className="max-w-360 mx-auto px-4 pb-20">
        {dealProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {dealProducts.map((product) => (
              <DealProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm italic">No deals available right now. Check back later!</p>
          </div>
        )}
      </main>
    </div>
  );
}

function DealProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const imageSrc = product.image || "/placeholder.jpg";

  return (
    <div className="group bg-white rounded-lg border border-stone-200/80 overflow-hidden hover:border-brand-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            {discountPercent}% OFF
          </span>
        ) : product.badge ? (
          <span className="absolute top-2.5 left-2.5 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            {product.badge}
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs shadow-xs transition-colors ${
            isWishlisted
              ? "bg-red-50 text-red-500"
              : "bg-white/90 text-stone-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-stone-400 block mb-1">
            {product.category}
          </span>
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.bn && (
              <p className="text-xs text-stone-400 line-clamp-1 font-normal">
                {product.bn}
              </p>
            )}
          </Link>
          {product.unit && (
            <p className="text-xs text-stone-500 mt-1">{product.unit}</p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-brand-dark">৳{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs text-stone-400 line-through">৳{product.oldPrice}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-8 h-8 rounded bg-brand-dark hover:bg-brand-gold text-white flex items-center justify-center transition-colors shadow-xs"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
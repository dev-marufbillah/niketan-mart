'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { products as defaultProducts, Product } from '@/lib/data/products';
import { Flame, Clock, Heart, ShoppingBag, Check, ArrowRight, Star } from 'lucide-react';

// Extended product type to safely support optional oldPrice/originalPrice/reviewsCount
export type DealProduct = Product & {
  originalPrice?: number;
  oldPrice?: number;
  reviewsCount?: number;
};

// Deal metadata mapping for stock progress bars & custom deal urgency
const DEAL_METADATA: Record<string, { sold: number; total: number; label?: string }> = {
  '1': { sold: 42, total: 50, label: 'Almost Sold Out' },
  '2': { sold: 18, total: 60, label: 'Selling Fast' },
  '3': { sold: 35, total: 40, label: 'Limited Stock' },
  '4': { sold: 12, total: 50, label: 'Hot Deal' },
  '5': { sold: 28, total: 35, label: 'Urgent' },
  '6': { sold: 15, total: 45, label: 'Best Seller' },
};

export default function FlashDeals() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Countdown timer state (Ends in ~8 hours)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter deal products with typed product list
  const productsList = defaultProducts as DealProduct[];
  const dealProducts: DealProduct[] = productsList
    .filter((p: DealProduct) => {
      const orig = p.oldPrice || p.originalPrice;
      return (orig && orig > p.price) || p.badge || true;
    })
    .slice(0, 4);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    // Quick feedback animation
    const idStr = String(product.id);
    setAddedIds((prev) => ({ ...prev, [idStr]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [idStr]: false }));
    }, 1500);
  };

  const handleWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-10 bg-linear-to-b from-rose-50/40 via-stone-50/50 to-transparent border-y border-rose-100/60">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark">
              Today&apos;s Flash Deals
            </h2>
          </div>

          {/* Countdown & View All Link */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Live Countdown Timer */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-stone-200/80 shadow-xs">
              <Clock className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-medium text-stone-500 hidden xs:inline">Ends in:</span>
              <div className="flex items-center gap-1 text-xs font-bold font-mono text-stone-800">
                <span className="bg-stone-900 text-white px-2 py-1 rounded-md">{formatNumber(timeLeft.hours)}</span>
                <span className="text-stone-400 font-bold">:</span>
                <span className="bg-stone-900 text-white px-2 py-1 rounded-md">{formatNumber(timeLeft.minutes)}</span>
                <span className="text-stone-400 font-bold">:</span>
                <span className="bg-rose-600 text-white px-2 py-1 rounded-md animate-pulse">{formatNumber(timeLeft.seconds)}</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 group transition-colors"
            >
              <span>See All Deals</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product: DealProduct) => {
            const idStr = String(product.id);
            const inWishlist = isInWishlist(product.id);
            const isAdded = !!addedIds[idStr];

            // Discount percent calculation
            const origPrice = product.oldPrice || product.originalPrice || Math.round(product.price * 1.25);
            const discountPercent = Math.round(((origPrice - product.price) / origPrice) * 100);
            const reviewsCount = product.reviews ?? product.reviewsCount ?? 24;

            // Stock Metadata (Fallback if not predefined)
            const meta = DEAL_METADATA[idStr] || { sold: 20, total: 30, label: 'Hot Sale' };
            const stockRatio = meta.sold / meta.total;
            const isUrgent = stockRatio >= 0.75; // Red if >= 75% sold, else Green

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-stone-200/80 hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative aspect-square w-full bg-stone-50 overflow-hidden">
                    <Image
                      src={product.image || '/images/products/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Deal Badge (Left) */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
                      {discountPercent > 0 && (
                        <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
                          -{discountPercent}% OFF
                        </span>
                      )}
                      {meta.label && (
                        <span className="bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          ⚡ {meta.label}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button (Right) */}
                    <button
                      onClick={(e) => handleWishlist(product, e)}
                      aria-label="Add to Wishlist"
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-rose-600 shadow-xs hover:shadow-md transition-all duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          inWishlist ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Details Area */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Weight/Unit */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-medium">
                      <span className="capitalize">{product.category}</span>
                      {product.unit && (
                        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono text-[11px]">
                          {product.unit}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>
                      <h3 className="font-semibold text-stone-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-stone-700 ml-1">
                          {product.rating || '4.8'}
                        </span>
                      </div>
                      <span className="text-stone-300 text-xs">•</span>
                      <span className="text-xs text-stone-400 font-medium">
                        {reviewsCount} reviews
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-brand-dark">
                        ৳{product.price}
                      </span>
                      {origPrice > product.price && (
                        <span className="text-sm text-stone-400 line-through font-medium">
                          ৳{origPrice}
                        </span>
                      )}
                    </div>

                    {/* Stock Urgency Progress Bar (Red/Green) */}
                    <div className="space-y-1.5 mb-4 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className={isUrgent ? 'text-rose-600' : 'text-emerald-600'}>
                          {isUrgent ? '🔥 Selling Fast!' : 'Available in stock'}
                        </span>
                        <span className="text-stone-500 font-mono text-[11px]">
                          {meta.sold}/{meta.total} Sold
                        </span>
                      </div>
                      
                      {/* Bar Container */}
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUrgent ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(10, Math.round(stockRatio * 100)))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Add to Cart Action */}
                <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAdded}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-900 hover:bg-rose-600 text-white shadow-md hover:shadow-lg active:scale-[0.98]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
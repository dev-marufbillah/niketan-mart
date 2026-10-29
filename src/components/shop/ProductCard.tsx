"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useShop } from "@/context/ShopContext";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list"; // List ভিউ সাপোর্ট করার জন্য যুক্ত করা হয়েছে
}

export default function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  // ডিসকাউন্ট পার্সেন্টেজ হিসাব করা
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const imageSrc = product.image || "/placeholder.jpg";

  // ==========================================
  // LIST VIEW (হরিজন্টাল / পাশাপাশি লেআউট)
  // ==========================================
  if (view === "list") {
    return (
      <div className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-brand-gold/60 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row p-3 gap-4">
        {/* Left Image Box */}
        <div className="relative aspect-square sm:aspect-auto w-full sm:w-40 sm:h-40 bg-[#fbf9f5] rounded-lg overflow-hidden shrink-0">
          <Link href={`/product/${product.id}`} className="block w-full h-full relative">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 160px, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Discount Badge */}
          {discountPercent > 0 ? (
            <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              {discountPercent}% OFF
            </span>
          ) : product.badge ? (
            <span className="absolute top-2.5 left-2.5 bg-brand-gold text-brand-dark text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              {product.badge}
            </span>
          ) : null}

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-xs shadow-xs transition-colors ${
              isWishlisted
                ? "text-red-500 bg-white"
                : "text-stone-400 hover:text-red-500 hover:bg-white"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Right Product Information */}
        <div className="flex flex-col flex-1 justify-between py-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              {product.category}
            </span>

            <Link href={`/product/${product.id}`} className="block group-hover:text-brand-gold transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-brand-dark leading-snug line-clamp-2">
                {product.name}
              </h3>
              {product.bn && (
                <p className="text-xs text-stone-400 font-normal mt-1">
                  {product.bn}
                </p>
              )}
            </Link>

            <p className="text-[11px] text-stone-500 font-medium mt-2">
              {product.unit}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between sm:justify-start sm:gap-6">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-brand-dark">
                ৳{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ৳{product.oldPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              aria-label="Add to cart"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="px-4 py-2 rounded-md bg-brand-dark hover:bg-brand-gold text-white hover:text-brand-dark flex items-center gap-2 text-xs font-bold transition-colors shadow-xs sm:ml-auto lg:ml-0"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // GRID VIEW (আপনার আগের অরিজিনাল লেআউট)
  // ==========================================
  return (
    <div className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-brand-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-3">
      {/* Top Image Box */}
      <div className="relative aspect-4/5 w-full bg-[#fbf9f5] rounded-lg overflow-hidden mb-3">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge - Top Left */}
        {discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
            {discountPercent}% OFF
          </span>
        ) : product.badge ? (
          <span className="absolute top-2.5 left-2.5 bg-brand-gold text-brand-dark text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
            {product.badge}
          </span>
        ) : null}

        {/* Wishlist Button - Top Right */}
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-xs shadow-xs transition-colors ${
            isWishlisted
              ? "text-red-500 bg-white"
              : "text-stone-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Eyebrow / Category */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            {product.category}
          </span>

          {/* Title & Bengali subtitle */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-brand-gold transition-colors">
            <h3 className="text-xs sm:text-sm font-bold text-brand-dark leading-snug line-clamp-1">
              {product.name}
            </h3>
            {product.bn && (
              <p className="text-[11px] text-stone-400 font-normal line-clamp-1 mt-0.5">
                {product.bn}
              </p>
            )}
          </Link>

          {/* Unit / Weight */}
          <p className="text-[11px] text-stone-500 font-medium mt-1">
            {product.unit}
          </p>
        </div>

        {/* Bottom Row: Price & Black Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-brand-dark">
              ৳{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through">
                ৳{product.oldPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-8 h-8 rounded-md bg-brand-dark hover:bg-brand-gold text-white hover:text-brand-dark flex items-center justify-center transition-colors shadow-xs shrink-0"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
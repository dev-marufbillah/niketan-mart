"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Heart,
  Plus,
  Trash2,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function WishlistView() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  // Add all wishlist items to bag
  const handleAddAllToBag = () => {
    wishlist.forEach((product) => addToCart(product, 1));
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-brand-dark">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 items-center gap-1.5 px-4 py-2.5 text-xs text-stone-500 lg:px-8">
          <Link href="/" className="hover:text-brand-dark">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/account" className="hover:text-brand-dark">
            Account
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-brand-dark">Wishlist</span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
              Saved for later
            </p>
            <h1 className="mt-1 text-xl font-bold text-brand-dark sm:text-2xl">
              My Wishlist (পছন্দের তালিকা)
            </h1>
            <p className="mt-0.5 text-xs text-stone-500">
              {wishlist.length} items saved · Tap heart on any product to add more
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={handleAddAllToBag}
              className="flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition"
            >
              <ShoppingBag size={14} /> Add All to Bag
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <Heart size={32} className="mx-auto text-stone-300" />
            <p className="mt-3 text-base font-bold text-brand-dark">
              Wishlist empty
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Browse the market and tap the heart icon to save items.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex rounded-full bg-brand-dark px-5 py-2.5 text-xs font-bold text-white transition hover:bg-stone-800"
            >
              Explore Fresh Market
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((p) => (
              <article
                key={p.id}
                className="group relative rounded-2xl border border-stone-200 bg-white p-3 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  aria-label="Remove from wishlist"
                  onClick={() => removeFromWishlist(p.id)}
                  className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-stone-400 shadow-sm hover:text-rose-500 hover:bg-rose-50 transition"
                >
                  <Trash2 size={13} />
                </button>

                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 border border-stone-100">
                  <Image
                    src={p.image || "/placeholder.jpg"}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <p className="mt-2 flex items-center gap-1 text-[11px] text-stone-500">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <b className="text-brand-dark">4.8</b>
                </p>
                <Link href={`/product/${p.id}`}>
                  <h3 className="mt-0.5 line-clamp-2 min-h-9 text-sm font-bold leading-snug text-brand-dark hover:text-brand-gold transition">
                    {p.name}
                  </h3>
                </Link>
                <p className="mt-0.5 truncate text-[11px] text-stone-500">
                  {p.bn || p.unit}
                </p>

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-brand-dark">
                    ৳{p.price}
                  </span>
                  {p.oldPrice && p.oldPrice > p.price && (
                    <span className="text-[11px] text-stone-400 line-through">
                      ৳{p.oldPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(p, 1)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-dark py-2 text-xs font-bold text-white hover:bg-stone-800 transition"
                >
                  <Plus size={14} /> Add to Bag
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
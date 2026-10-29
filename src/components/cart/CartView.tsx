"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CartView() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useShop();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Calculations
  const targetFreeDelivery = 1500;
  const remainingForFree = Math.max(0, targetFreeDelivery - cartTotal);
  const progressPct = Math.min(100, Math.round((cartTotal / targetFreeDelivery) * 100));

  const totalSavings = cart.reduce((sum, item) => {
    if (item.product.oldPrice && item.product.oldPrice > item.product.price) {
      return sum + (item.product.oldPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  const deliveryFee = cartTotal >= targetFreeDelivery ? 0 : 50;
  const promoDiscount = isPromoApplied ? 100 : 0; // Example fixed discount
  const finalTotal = Math.max(0, cartTotal + deliveryFee - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().length > 0) setIsPromoApplied(true);
  };

  return (
    <div className="bg-[#f8f5f0] text-brand-dark min-h-screen pb-20 font-sans">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto flex max-w-360 items-center px-4 py-3 text-xs text-stone-500 lg:px-8">
          <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link href="/shop" className="hover:text-brand-dark transition-colors">Fresh Market</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="font-bold text-brand-dark">Shopping Bag</span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-8 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
            Shopping Bag <span className="text-stone-400 font-medium text-lg">(আপনার ব্যাগ)</span>
          </h1>
          <p className="text-sm text-stone-500">
            You have {cartCount} items in your cart.
          </p>
        </div>

        {cart.length === 0 ? (
          /* ── Empty Cart State ── */
          <div className="bg-white rounded-2xl border border-stone-200 p-12 flex flex-col items-center justify-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-300">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-xl font-bold text-brand-dark mb-2">Your bag is currently empty</h2>
            <p className="text-sm text-stone-500 mb-8 text-center max-w-md">
              Looks like you haven&apos;t added any farm-fresh items yet. Discover our latest offers and fresh arrivals.
            </p>
            <Link
              href="/shop"
              className="bg-brand-dark text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-stone-800 transition-all flex items-center gap-2"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* ── Active Cart Layout ── */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* ── LEFT: Cart Items List ── */}
            <div className="w-full lg:w-2/3 space-y-4">
              
              {/* Free Delivery Progress */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="flex items-center gap-2 font-bold text-brand-dark">
                    <Truck size={18} className={remainingForFree === 0 ? "text-emerald-500" : "text-brand-gold"} />
                    {remainingForFree === 0 
                      ? <span className="text-emerald-600">Free Delivery Unlocked!</span> 
                      : <span>Add ৳{remainingForFree.toLocaleString("en-BD")} more for Free Delivery</span>
                    }
                  </span>
                  <span className="text-stone-500 font-medium text-xs hidden sm:block">
                    ৳{cartTotal.toLocaleString("en-BD")} / ৳{targetFreeDelivery.toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${remainingForFree === 0 ? 'bg-emerald-500' : 'bg-brand-gold'}`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Items Container */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-stone-100 bg-stone-50/50 text-xs font-bold uppercase tracking-wider text-stone-500">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Subtotal</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-stone-100">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center">
                      
                      {/* Product Info (Mobile: Full width, Desktop: Col 6) */}
                      <div className="col-span-6 flex gap-4 w-full">
                        <Link href={`/product/${product.id}`} className="shrink-0">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-100 group">
                            <Image
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col justify-center flex-1">
                          {product.category && (
                            <span className="text-[10px] font-bold uppercase text-brand-gold mb-1">
                              {product.category}
                            </span>
                          )}
                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-sm font-bold text-brand-dark leading-tight hover:text-brand-gold transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          {product.bn && <p className="text-xs text-stone-500 mt-1">{product.bn}</p>}
                          {product.unit && <p className="text-xs text-stone-400 mt-1">{product.unit}</p>}
                          
                          {/* Mobile Price (Hidden on Desktop) */}
                          <div className="mt-2 sm:hidden flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-dark">৳{product.price.toLocaleString("en-BD")}</span>
                            {product.oldPrice && product.oldPrice > product.price && (
                              <span className="text-xs text-stone-400 line-through">৳{product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Controls Area (Mobile: Flex row with price, Desktop: Grid columns) */}
                      <div className="w-full sm:col-span-6 flex items-center justify-between sm:grid sm:grid-cols-6 gap-4">
                        
                        {/* Quantity (Desktop: Col 3) */}
                        <div className="col-span-3 flex justify-start sm:justify-center">
                          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full h-9">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-9 h-full flex items-center justify-center text-stone-500 hover:text-brand-dark transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-brand-dark">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-9 h-full flex items-center justify-center text-stone-500 hover:text-brand-dark transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal & Delete (Desktop: Col 3) */}
                        <div className="col-span-3 flex items-center justify-end gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-base font-bold text-brand-dark">
                              ৳{(product.price * quantity).toLocaleString("en-BD")}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Remove Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Section */}
                <div className="p-4 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-bold text-stone-500 hover:text-rose-500 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={14} /> Clear Cart
                  </button>
                  <Link href="/shop" className="text-xs font-bold text-brand-dark hover:text-brand-gold transition-colors flex items-center gap-1">
                    Continue Shopping <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
                <h3 className="text-lg font-bold text-brand-dark mb-4 pb-4 border-b border-stone-100">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      disabled={isPromoApplied}
                      className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold disabled:bg-stone-50 disabled:text-stone-400"
                    />
                    <button
                      type="submit"
                      disabled={isPromoApplied || !promoCode}
                      className="bg-stone-100 text-stone-700 font-bold text-sm px-5 rounded-xl hover:bg-stone-200 transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                      <Tag size={12} /> Promo code applied successfully!
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-stone-100">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-bold text-brand-dark">৳{cartTotal.toLocaleString("en-BD")}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Item Discounts</span>
                      <span className="font-bold">- ৳{totalSavings.toLocaleString("en-BD")}</span>
                    </div>
                  )}

                  {isPromoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo Discount</span>
                      <span className="font-bold">- ৳{promoDiscount.toLocaleString("en-BD")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-brand-dark">
                      {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `৳${deliveryFee}`}
                    </span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="block text-base font-bold text-brand-dark">Total Amount</span>
                    <span className="block text-[10px] text-stone-400">VAT & Taxes included</span>
                  </div>
                  <span className="text-2xl font-bold text-brand-dark">
                    ৳{finalTotal.toLocaleString("en-BD")}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-bold text-sm hover:bg-stone-800 transition-all shadow-md hover:shadow-lg"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>

                {/* Trust Badges Minimal */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <span>Secure end-to-end encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <Truck size={16} className="text-brand-dark shrink-0" />
                    <span>Cold-chain thermal delivery guaranteed</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
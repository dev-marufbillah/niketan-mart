"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Wallet,
  ShoppingBag,
  FileText,
  Download,
  User
} from "lucide-react";
import { useShop, CartItem } from "@/context/ShopContext";

// Type for the saved invoice data
interface InvoiceData {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  paymentMethod: string;
}

// ==========================================
// Helper Functions (Outside Component to prevent ESLint Purity Error)
// ==========================================
const generateOrderId = () => {
  // eslint-disable-next-line
  return `NKT-${Math.floor(100000 + Math.random() * 900000)}`;
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function CheckoutView() {
  const { cart, cartTotal, clearCart } = useShop();
  
  // States
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "card">("cod");
  const [addressType, setAddressType] = useState<"home" | "office">("home");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fix Hydration & Effect issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Real Calculations based on ShopContext
  const itemsSubtotal = cartTotal;
  const discount = cart.reduce((sum, item) => {
    if (item.product.oldPrice && item.product.oldPrice > item.product.price) {
      return sum + (item.product.oldPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);
  
  // Smart Delivery Fee (Free over 1500)
  const delivery = itemsSubtotal >= 1500 ? 0 : 50; 
  const totalAmount = itemsSubtotal + delivery; 
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Form Submit Handler
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // Create new order data using safe helper functions
    const newOrderData: InvoiceData = {
      orderId: generateOrderId(),
      date: getCurrentDate(),
      items: [...cart],
      subtotal: itemsSubtotal,
      discount: discount,
      delivery: delivery,
      total: totalAmount,
      paymentMethod: paymentMethod
    };

    // 1. Save data for current invoice screen
    setInvoiceData(newOrderData);

    // 2. Save Order to LocalStorage for Account > Order History overview
    try {
      const existingOrders = JSON.parse(localStorage.getItem("niketan_orders") || "[]");
      const updatedOrders = [newOrderData, ...existingOrders];
      localStorage.setItem("niketan_orders", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Failed to save order history", error);
    }

    // 3. Show Success Screen & Clear Cart
    setIsOrderPlaced(true);
    clearCart(); 
    window.scrollTo(0, 0);
  };

  // Trigger system print window specifically designed for PDF save
  const handleDownloadPDF = () => {
    window.print();
  };

  // Prevent Hydration Error
  if (!mounted) return null;

  // ==========================================
  // SUCCESS SCREEN & INVOICE
  // ==========================================
  if (isOrderPlaced && invoiceData) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center p-4 py-12 font-sans">
        
        {/* CSS rule to hide header, footer, and everything EXCEPT the invoice card when printing/downloading PDF */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #printable-invoice-card, #printable-invoice-card * {
              visibility: visible !important;
            }
            #printable-invoice-card {
              position: absolute !important;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: 100% !important;
              max-width: 480px !important;
              box-shadow: none !important;
              border: 1px solid #e7e5e4 !important;
              border-radius: 24px !important;
              padding: 32px !important;
              margin: 0 !important;
              background: #ffffff !important;
            }
          }
        `}</style>

        {/* Success Banner Above (Hidden in Print/PDF) */}
        <div className="text-center mb-6 print:hidden">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs border border-emerald-200">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark mb-1">Order Placed Successfully!</h1>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            Your invoice has been generated below. Click the download button to save it.
          </p>
        </div>

        {/* ── EXACT MATCH INVOICE CARD (This is the ONLY part saved/printed) ── */}
        <div 
          id="printable-invoice-card" 
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-stone-200/80 font-sans"
        >
          {/* Invoice Title */}
          <div className="text-center pb-5 mb-5 border-b border-dashed border-stone-200">
            <h2 className="text-xl font-black text-brand-dark tracking-tight uppercase">
              NIKETAN MART
            </h2>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
              OFFICIAL INVOICE
            </p>
          </div>

          {/* Order ID & Date */}
          <div className="flex justify-between items-start text-xs mb-5">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">ORDER ID</p>
              <p className="font-bold text-brand-dark">{invoiceData.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">DATE</p>
              <p className="font-bold text-brand-dark">{invoiceData.date}</p>
            </div>
          </div>

          {/* Items Header & List */}
          <div className="border-t border-dashed border-stone-200 pt-4 pb-4 space-y-3">
            <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              <span>ITEM</span>
              <span>AMOUNT</span>
            </div>
            
            {invoiceData.items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-start text-xs">
                <span className="text-stone-700 pr-4 leading-snug">
                  <b className="text-brand-dark">{item.quantity}x</b> {item.product.name}
                </span>
                <span className="font-bold text-brand-dark shrink-0">
                  ৳{(item.product.price * item.quantity).toLocaleString("en-BD")}
                </span>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="border-t border-dashed border-stone-200 pt-4 pb-4 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-bold text-brand-dark">৳{invoiceData.subtotal.toLocaleString("en-BD")}</span>
            </div>
            
            {invoiceData.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Batch Savings</span>
                <span className="font-bold">- ৳{invoiceData.discount.toLocaleString("en-BD")}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-brand-dark">
                {invoiceData.delivery === 0 ? "FREE" : `৳${invoiceData.delivery}`}
              </span>
            </div>
          </div>

          {/* Total Paid Row */}
          <div className="border-t border-dashed border-stone-200 pt-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">TOTAL PAID</p>
              <p className="text-[11px] text-stone-500 font-medium">Via {invoiceData.paymentMethod.toUpperCase()}</p>
            </div>
            <p className="text-2xl font-black text-brand-dark">
              ৳{invoiceData.total.toLocaleString("en-BD")}
            </p>
          </div>
        </div>

        {/* Action Buttons (Hidden in Downloaded PDF) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-brand-dark text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 transition shadow-md"
          >
            <Download size={15} /> Download Invoice (PDF)
          </button>
          
          <Link
            href="/account"
            className="flex-1 bg-white border border-stone-200 text-brand-dark font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-50 transition shadow-xs text-center"
          >
            <User size={15} /> My Orders Overview
          </Link>
        </div>

      </div>
    );
  }

  // ==========================================
  // CHECKOUT SCREEN (Form & Summary)
  // ==========================================
  return (
    <div className="bg-[#f8f5f0] text-brand-dark min-h-screen pb-16">
      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 items-center justify-between px-4 py-2.5 text-xs text-stone-500 lg:px-8">
          <nav className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-dark transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/cart" className="hover:text-brand-dark transition">Shopping Bag</Link>
            <ChevronRight size={12} />
            <span className="font-semibold text-brand-dark">Secure Checkout</span>
          </nav>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <Lock size={12} /> 256-bit SSL Secure
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-6 lg:px-8 space-y-6">
        
        {/* ── Page Title ── */}
        <div className="border-b border-stone-200 pb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
            ALMOST THERE
          </p>
          <h1 className="text-xl font-bold text-brand-dark sm:text-2xl mt-1">
            Secure Checkout (চেকআউট)
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-brand-dark mb-2">Your bag is empty</h2>
            <p className="text-sm text-stone-500 mb-6">Please add some items to your cart before proceeding to checkout.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-stone-800 transition">
              Go to Shop <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-12">
            
            {/* ── LEFT COLUMN: Forms ── */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Contact Information */}
              <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-xs font-bold text-white shadow-sm">1</span>
                  <h2 className="text-base font-bold text-brand-dark">Contact Information</h2>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Mobile Number <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* 2. Delivery Address */}
              <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-xs font-bold text-white shadow-sm">2</span>
                    <h2 className="text-base font-bold text-brand-dark">Delivery Details</h2>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setAddressType("home")}
                      className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition border shadow-sm ${
                        addressType === "home" ? "border-brand-dark bg-brand-dark text-white" : "border-stone-200 text-stone-500 hover:border-brand-dark"
                      }`}
                    >
                      <MapPin size={14} /> Home
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddressType("office")}
                      className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition border shadow-sm ${
                        addressType === "office" ? "border-brand-dark bg-brand-dark text-white" : "border-stone-200 text-stone-500 hover:border-brand-dark"
                      }`}
                    >
                      <Truck size={14} /> Office
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Area / Zone <span className="text-rose-500">*</span></label>
                      <select required className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-3 text-sm font-semibold text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors">
                        <option value="">Select your area...</option>
                        <option value="Gulshan 1">Gulshan 1, Dhaka</option>
                        <option value="Gulshan 2">Gulshan 2, Dhaka</option>
                        <option value="Banani">Banani, Dhaka</option>
                        <option value="Baridhara">Baridhara, Dhaka</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Road / Street <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Road 54"
                        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">House / Building <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. House 12"
                        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Floor & Apt / Flat No.</label>
                      <input
                        type="text"
                        placeholder="e.g. Floor 4B (Optional)"
                        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Payment Method */}
              <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-xs font-bold text-white shadow-sm">3</span>
                  <h2 className="text-base font-bold text-brand-dark">Payment Method</h2>
                </div>
                
                <div className="mt-5 space-y-3">
                  {/* Cash on Delivery */}
                  <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition shadow-sm ${
                    paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500" : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-emerald-600 h-4 w-4"
                      />
                      <div className="flex items-center gap-2">
                        <Wallet size={18} className={paymentMethod === "cod" ? "text-emerald-600" : "text-stone-400"} />
                        <div>
                          <p className="text-sm font-bold text-brand-dark">Cash on Delivery (ক্যাশ অন ডেলিভারি)</p>
                          <p className="text-[11px] text-stone-500">Pay via Cash or Card/POS when order arrives.</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* bKash */}
                  <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition shadow-sm ${
                    paymentMethod === "bkash" ? "border-[#d12053] bg-rose-50/50 ring-1 ring-[#d12053]" : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className="accent-[#d12053] h-4 w-4"
                      />
                      <div>
                        <p className="text-sm font-bold text-brand-dark">bKash Mobile Payment</p>
                        <p className="text-[11px] text-stone-500">Fast and secure mobile payment.</p>
                      </div>
                    </div>
                    <span className="rounded bg-[#d12053] px-2 py-1 text-[10px] font-bold text-white">bKash</span>
                  </label>

                  {/* Nagad */}
                  <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition shadow-sm ${
                    paymentMethod === "nagad" ? "border-[#f7921e] bg-orange-50/50 ring-1 ring-[#f7921e]" : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "nagad"}
                        onChange={() => setPaymentMethod("nagad")}
                        className="accent-[#f7921e] h-4 w-4"
                      />
                      <div>
                        <p className="text-sm font-bold text-brand-dark">Nagad Payment</p>
                        <p className="text-[11px] text-stone-500">Instant payment via Nagad.</p>
                      </div>
                    </div>
                    <span className="rounded bg-[#f7921e] px-2 py-1 text-[10px] font-bold text-white">Nagad</span>
                  </label>

                  {/* Credit Card */}
                  <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition shadow-sm ${
                    paymentMethod === "card" ? "border-brand-dark bg-stone-50 ring-1 ring-brand-dark" : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="accent-brand-dark h-4 w-4"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className={paymentMethod === "card" ? "text-brand-dark" : "text-stone-400"} />
                        <div>
                          <p className="text-sm font-bold text-brand-dark">Credit / Debit Card</p>
                          <p className="text-[11px] text-stone-500">Visa, MasterCard, Amex via SSLCommerz</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              {/* Order Notes */}
              <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-brand-dark" />
                  <h2 className="text-sm font-bold text-brand-dark">Order Notes (Optional)</h2>
                </div>
                <textarea 
                  rows={2}
                  placeholder="e.g. Call upon arrival, pack fish separately..."
                  className="w-full rounded-xl border border-stone-200 bg-[#fbf9f5] px-3.5 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-gold focus:bg-white transition-colors"
                />
              </section>

            </div>

            {/* ── RIGHT COLUMN: Order Summary ── */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 lg:p-6 shadow-xs sticky top-20">
                
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="text-base font-bold text-brand-dark">Order Summary</h3>
                  <p className="text-xs text-stone-500">{totalItems} Items • Gulshan Express Delivery</p>
                </div>

                {/* Items Mini List (Real Data) */}
                <div className="py-4 border-b border-stone-100 space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start text-xs">
                      <span className="text-stone-600 pr-2 leading-relaxed">
                        <b className="text-brand-dark">{item.quantity}x</b> {item.product.name}
                      </span>
                      <span className="font-bold text-brand-dark shrink-0">
                        ৳{(item.product.price * item.quantity).toLocaleString("en-BD")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="py-4 space-y-2.5 text-xs border-b border-stone-100">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-brand-dark">৳{itemsSubtotal.toLocaleString("en-BD")}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-stone-600 bg-emerald-50 px-2 py-1 -mx-2 rounded">
                      <span>Batch Savings (Discount)</span>
                      <span className="font-bold text-emerald-600">- ৳{discount.toLocaleString("en-BD")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-brand-dark">
                      {delivery === 0 ? <span className="text-emerald-600">FREE</span> : `৳${delivery}`}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-bold text-brand-dark">Total Amount</p>
                    <p className="text-[10px] text-stone-400">VAT & Taxes Included</p>
                  </div>
                  <p className="text-2xl font-black text-brand-dark">
                    ৳{totalAmount.toLocaleString("en-BD")}
                  </p>
                </div>

                {/* CTA Button (Trigger Form Submit) */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-stone-800 shadow-md mt-2"
                >
                  Confirm Order <ArrowRight size={16} />
                </button>
                
                <p className="text-center text-[10px] text-stone-400 mt-4 leading-tight px-4">
                  By confirming this order, you securely agree to Niketan Mart&apos;s Terms of Service and Privacy Policy.
                </p>

                {/* Trust Badges */}
                <div className="mt-5 rounded-xl bg-stone-50 border border-stone-100 p-4 text-xs text-stone-600 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <p><b>100% Quality Promise:</b> Farm fresh guarantee or instant replacement within 2 hours.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <p><b>Secure Information:</b> Your payment and contact details are end-to-end encrypted.</p>
                  </div>
                </div>

              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
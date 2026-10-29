"use client";

import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  User,
} from "lucide-react";
import NavLinks from "./NavLinks";
import { navItems } from "./nav-items";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { cartCount, cartTotal, wishlist } = useShop();
  const { user } = useAuth();

  return (
    <header className="contents">
      {/* Announcement bar (scroll korle chole jabe) */}
      <div className="bg-brand-dark text-white">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-4 px-4 py-2 text-xs sm:text-sm lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 rounded bg-brand-gold px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-dark sm:text-xs">
              Gulshan Express
            </span>
            <p className="truncate">
              Free delivery on orders above ৳1,500 in Gulshan 1 &amp; 2, Banani
              &amp; Baridhara
            </p>
          </div>
          <div className="hidden items-center gap-8 lg:flex">
            <span className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              100% Farm Fresh Guarantee
            </span>
            <Link
              href="/orders"
              className="flex items-center gap-1 text-brand-gold hover:underline"
            >
              Live Order Tracking <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky area: Main bar + Nav bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Main bar */}
        <div className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-360 flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 lg:flex-nowrap lg:gap-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark text-brand-gold sm:h-14 sm:w-14">
                <ShoppingBasket size={26} />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-bold tracking-wide text-brand-dark sm:text-2xl">
                  NIKETAN MART
                </span>
                <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500 sm:block">
                  Your Everyday Market
                </span>
              </span>
            </Link>

            {/* Deliver to */}
            <div className="hidden h-10 w-px bg-stone-200 lg:block" />
            <button
              type="button"
              className="hidden shrink-0 items-center gap-3 text-left lg:flex"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-brand-gold">
                <MapPin size={18} />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-medium uppercase tracking-wide text-stone-500">
                  Deliver to
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-brand-dark">
                  Gulshan 1, Dhaka <ChevronDown size={14} />
                </span>
              </span>
            </button>

            {/* Search */}
            <form
              action="/search"
              className="order-last flex w-full flex-1 items-center rounded-full border border-stone-300 bg-white p-1.5 pl-4 shadow-sm lg:order-0 lg:w-auto"
            >
              <Search size={18} className="shrink-0 text-stone-400" />
              <input
                type="text"
                name="q"
                placeholder="Search farm fresh vegetables, Hilsha fish, panir..."
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-dark transition hover:brightness-95 sm:px-7"
              >
                Search
              </button>
            </form>

            {/* Actions */}
            <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5 lg:ml-0">
              {/* Account */}
              <Link
                href="/account"
                className="hidden items-center gap-2 text-sm font-medium text-brand-dark sm:flex"
              >
                {user ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-dark text-[10px] font-bold uppercase text-white">
                    {user.name.trim().substring(0, 2)}
                  </span>
                ) : (
                  <User size={20} />
                )}
                {user ? user.name.split(" ")[0] : "Account"}
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative text-brand-dark"
              >
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 rounded-full bg-brand-dark px-4 py-2 text-white"
              >
                <span className="relative">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-dark">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase tracking-wide text-stone-400">
                    Cart
                  </span>
                  <span className="block text-sm font-bold">
                    ৳{cartTotal.toLocaleString("en-BD")}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="border-b border-stone-200 bg-white">
          <Suspense
            fallback={
              <ul className="mx-auto flex max-w-360 items-center gap-6 overflow-x-auto whitespace-nowrap px-4 text-sm lg:gap-8 lg:px-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <span className="flex items-center gap-1.5 border-b-2 border-transparent py-3.5 text-stone-600">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            }
          >
            <NavLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
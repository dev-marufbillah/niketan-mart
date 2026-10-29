'use client';

import Link from "next/link";
import { MessageCircle, Mail, ShoppingBasket } from "lucide-react";

const columns = [
  {
    title: "Customer Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Delivery Information", href: "/delivery-information" },
      { label: "Returns & Refunds", href: "/returns-refunds" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "About Niketan Mart",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Stores", href: "/stores" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden>
      <path d="M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2S15.5 4 14.3 4C11.8 4 10.2 5.5 10.2 8.2v2.6H7.5V14h2.7v8h3.3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-none stroke-white"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.8" className="fill-white" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden>
      <path d="M16.6 3c.3 2.2 1.6 3.6 3.8 3.8v3c-1.4.1-2.7-.3-3.8-1.1v6.1c0 3.3-2.3 5.7-5.5 5.7a5.4 5.4 0 0 1-5.5-5.4c0-3.4 2.9-5.9 6.2-5.3v3.1c-1.7-.5-3.2.6-3.2 2.2 0 1.3 1 2.3 2.4 2.3 1.5 0 2.3-1 2.3-2.5V3h3.3z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "#", bg: "bg-[#1877f2]", Icon: FacebookIcon },
  { label: "Instagram", href: "#", bg: "bg-[#d6403c]", Icon: InstagramIcon },
  { label: "TikTok", href: "#", bg: "bg-transparent", Icon: TikTokIcon },
  {
    label: "WhatsApp",
    href: "#",
    bg: "bg-transparent",
    Icon: () => <MessageCircle size={14} className="text-white" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0e0d] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-360 flex-col gap-5 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
          <div className="flex items-center gap-4 lg:w-1/4">
            <Mail
              size={34}
              strokeWidth={1.1}
              className="shrink-0 text-brand-gold"
            />
            <div className="leading-tight">
              <h3 className="text-sm font-semibold">Join Our Newsletter</h3>
              <p className="mt-0.5 text-[10px] text-white/60">
                Get exclusive offers, new arrivals and more.
              </p>
            </div>
          </div>

          <form
            className="flex w-full items-center rounded-full bg-[#f6f1e7] p-1 lg:max-w-xl lg:flex-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-[11px] text-brand-dark outline-none placeholder:text-stone-500"
            />
            <button
              type="submit"
              className="rounded-full bg-[#c9ad7c] px-7 py-2 text-[11px] font-semibold text-white transition hover:brightness-95"
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center gap-8 lg:w-1/4 lg:justify-end">
            <span className="hidden h-12 w-px bg-white/10 lg:block" />
            <div>
              <p className="text-[10px] font-semibold">Follow Us</p>
              <div className="mt-2 flex gap-2.5">
                {socials.map(({ label, href, bg, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${bg} transition hover:opacity-80`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-360 gap-8 px-4 py-6 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-6 lg:px-8">
        {/* Brand */}
        <div className="lg:w-1/4">
          <Link href="/" className="flex items-center gap-3">
            <ShoppingBasket
              size={40}
              strokeWidth={1.1}
              className="shrink-0 text-brand-gold"
            />
            <span className="leading-none">
              <span className="block text-base font-light tracking-[0.12em]">
                NIKETAN MART
              </span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-brand-gold">
                Your Everyday Market
              </span>
            </span>
          </Link>
          <p className="mt-8 text-[10px] text-white/70">
            © 2025 Niketan Mart. All rights reserved.
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title} className="lg:w-36">
            <h4 className="text-[11px] font-bold">{col.title}</h4>
            <ul className="mt-2.5 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[10px] text-white/70 transition hover:text-brand-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Payments */}
        <div className="sm:col-span-2 lg:col-span-1 lg:text-right">
          <h4 className="text-[11px] font-bold">We Accept</h4>
          <div className="mt-2.5 flex flex-wrap items-center gap-2 lg:justify-end">
            <span className="flex h-7 w-[46px] items-center justify-center rounded bg-white text-[11px] font-black italic tracking-tight text-[#1a1f71]">
              VISA
            </span>
            <span className="flex h-7 w-[46px] items-center justify-center rounded bg-white">
              <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
              <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#f79e1b] opacity-90" />
            </span>
            <span className="flex h-7 w-[46px] items-center justify-center rounded bg-white text-[10px] font-bold text-[#e2136e]">
              bKash
            </span>
            <span className="flex h-7 w-[46px] items-center justify-center rounded bg-white text-[10px] font-bold text-[#f26522]">
              Nagad
            </span>
          </div>
          <p className="mt-6 text-[10px] text-white/70">
            Fresh <span className="mx-2">•</span> Quality{" "}
            <span className="mx-2">•</span> Together
          </p>
        </div>
      </div>
    </footer>
  );
}
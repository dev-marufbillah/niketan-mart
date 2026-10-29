"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  MapPin,
  Clock,
  Check,
  Leaf,
  Thermometer,
  Fish,
} from "lucide-react";
import { type Product } from "@/lib/data/products";

type Props = { product: Product };

const weights = [
  { id: "1kg", label: "1kg Standard", sub: "Whole fish · cleaned", price: 0 },
  { id: "1.5kg", label: "1.5kg Family", sub: "King size · 4–5 pcs", price: 480 },
  { id: "2kg", label: "2.4kg Family", sub: "Banquet pack", price: 980 },
];

const cuts = [
  { id: "whole", label: "Whole (as caught)", price: 0 },
  { id: "steak", label: "Steak cut (1.5\" thick)", price: 40 },
  { id: "curry", label: "Curry cut (ready pot)", price: 60 },
  { id: "boneless", label: "Boneless fillet", price: 180 },
];

const tabs = [
  "Freshness & Origin",
  "Formaldehyde Test",
  "Nutritional Data",
  "Cooking Heritage",
] as const;

const related = [
  {
    id: "r1",
    name: "River Boal Fresh (বোয়াল মাছ)",
    bn: "500g · Sliced & Descaled",
    price: 420,
    old: 480,
    img: null,
    bg: "from-sky-100 to-cyan-50",
  },
  {
    id: "r2",
    name: "Jumbo Cockle Clam (ঝিনুক)",
    bn: "500g · 12–15 pcs · Purged",
    price: 310,
    old: null,
    img: null,
    bg: "from-orange-50 to-amber-50",
  },
  {
    id: "r3",
    name: "Live Deshi Magur (দেশি মাগুর)",
    bn: "1kg Pack · 4–5 Priority",
    price: 890,
    old: null,
    img: null,
    bg: "from-emerald-50 to-green-50",
  },
  {
    id: "r4",
    name: "River Pabda Live (পাবদা)",
    bn: "500g · Whole Cleaned",
    price: 560,
    old: 620,
    img: null,
    bg: "from-violet-50 to-purple-50",
  },
];

const reviews = [
  {
    name: "Tanvir Ahmed",
    area: "Gulshan · Ordered 2x",
    date: "Yesterday",
    rating: 5,
    text: "স্বাদের ঘ্রাণ একেবারে চাঁদপুরের ঘাটের মতো। Ilish-er fat layer soft, roe intact. Cut clean, no smell. 38 minutes e pouch elo.",
    tags: ["Very Helpful", "Cut type: Cleaned & Curry Cut"],
  },
  {
    name: "Nusrat Jahan Chowdhury",
    area: "Banani",
    date: "3 days ago",
    rating: 5,
    text: "Full of healthy oil and eggs (ডিম সহ)! Everyone in house where we sourced such fresh hilsa in Dhaka without going to Kawran. Arrived personally at 2PM. Will reorder for upcoming Pahela.",
    tags: ["Helpful", "Cut type: Traditional Pitha Cut"],
  },
];

export default function ProductDetailView({ product }: Props) {
  const [weight, setWeight] = useState(weights[0].id);
  const [cut, setCut] = useState(cuts[0].id);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Freshness & Origin");
  const [activeImg, setActiveImg] = useState(0);

  const weightOpt = weights.find((w) => w.id === weight)!;
  const cutOpt = cuts.find((c) => c.id === cut)!;
  const unitPrice = product.price + weightOpt.price + cutOpt.price;
  const total = unitPrice * qty;

  const thumbs = useMemo(
    () => [product.image, product.image, product.image, product.image].filter(Boolean),
    [product.image]
  );

  return (
    <div className="bg-[#f8f5f0]">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 items-center gap-1.5 px-4 py-3 text-xs text-stone-500 lg:px-8">
          <Link href="/" className="hover:text-brand-dark">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop/fresh-market" className="hover:text-brand-dark">
            Fresh Market (তাজা)
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop/fish-meat" className="hover:text-brand-dark">
            Fish &amp; Meat (মাছ-মাংস)
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-brand-dark line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-6 lg:px-8">
        {/* Hero: Gallery + Buy box */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div
                className={`absolute inset-0 bg-linear-to-br ${product.bg ?? "from-stone-100 to-stone-50"}`}
              />
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              )}
              <button
                type="button"
                aria-label="Wishlist"
                onClick={() => setLiked(!liked)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-500 shadow-sm hover:text-rose-500"
              >
                <Heart
                  size={16}
                  className={liked ? "fill-rose-500 text-rose-500" : ""}
                />
              </button>
              {product.badge && (
                <span className="absolute left-3 top-3 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2">
              {(thumbs.length ? thumbs : [null, null, null, null]).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 bg-stone-100 ${
                    activeImg === i
                      ? "border-brand-dark"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${product.bg ?? "from-stone-100 to-stone-50"}`}
                  />
                  {src && (
                    <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                  )}
                </button>
              ))}
            </div>

            {/* 3 trust chips under gallery */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                {
                  icon: MapPin,
                  t: "CATCH POINT",
                  d: "Chandpur Terminal Jetty",
                },
                {
                  icon: Clock,
                  t: "AUCTION HARVEST",
                  d: "Today 4:52 AM · Cold-press Transit",
                },
                {
                  icon: ShieldCheck,
                  t: "SAFETY STANDARD",
                  d: "0% Formalin · Lab-AO Batch Verified",
                },
              ].map(({ icon: Icon, t, d }) => (
                <div
                  key={t}
                  className="rounded-xl border border-stone-200 bg-white p-3 text-center"
                >
                  <Icon size={16} className="mx-auto text-brand-gold" />
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-dark">
                    {t}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-stone-500">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — purchase panel */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
              100% Authentic Padma · SKU NH-FISH-0482
            </p>
            <h1 className="mt-2 text-2xl font-medium leading-snug text-brand-dark sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-1 text-base text-stone-600 sm:text-lg">
              {product.bn ?? "Chandpur Hilsa · River-fresh Whole Cut"}
            </p>

            {/* Rating row */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <b className="text-brand-dark">{product.rating}</b>
                <span className="text-stone-400">({product.reviews} Verified Reviews)</span>
              </span>
              <span className="h-3 w-px bg-stone-200" />
              <span className="text-emerald-600 font-medium">In Stock · 14 left</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-brand-dark">
                ৳{unitPrice.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-base text-stone-400 line-through">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="rounded bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">
                SAVE 18%
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Incl. cold-chain · Source-to-door · Per selected weight
            </p>

            {/* Weight */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
                1. Select Weight / Size
              </p>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                {weights.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWeight(w.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition ${
                      weight === w.id
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-stone-200 bg-white hover:border-brand-gold"
                    }`}
                  >
                    <p className="text-sm font-bold">{w.label}</p>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        weight === w.id ? "text-white/70" : "text-stone-500"
                      }`}
                    >
                      {w.sub}
                    </p>
                    {w.price > 0 && (
                      <p
                        className={`mt-1 text-xs font-semibold ${
                          weight === w.id ? "text-brand-gold" : "text-stone-600"
                        }`}
                      >
                        +৳{w.price}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cut / cleaning */}
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
                2. Custom Cleaning &amp; Cutting
                <span className="ml-2 font-medium normal-case tracking-normal text-emerald-600">
                  Free service
                </span>
              </p>
              <div className="mt-2.5 space-y-2">
                {cuts.map((c) => (
                  <label
                    key={c.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 transition ${
                      cut === c.id
                        ? "border-brand-dark bg-white ring-1 ring-brand-dark"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm text-stone-700">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          cut === c.id
                            ? "border-brand-dark bg-brand-dark"
                            : "border-stone-300"
                        }`}
                      >
                        {cut === c.id && <Check size={10} className="text-white" />}
                      </span>
                      {c.label}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {c.price === 0 ? "Included" : `+৳${c.price}`}
                    </span>
                    <input
                      type="radio"
                      className="sr-only"
                      checked={cut === c.id}
                      onChange={() => setCut(c.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-stone-200 bg-white">
                <button
                  type="button"
                  aria-label="Decrease"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center text-stone-600 hover:text-brand-dark"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center text-stone-600 hover:text-brand-dark"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
              >
                <Plus size={16} />
                Add to Bag · ৳{total.toLocaleString()}
              </button>
            </div>

            <button
              type="button"
              className="mt-2.5 w-full rounded-full border border-brand-dark py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-dark hover:text-white"
            >
              Buy Now with Gulshan Express (৪৫ মিনিট)
            </button>

            {/* Delivery card */}
            <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <Truck size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                <div className="flex-1 leading-tight">
                  <p className="text-sm font-bold text-brand-dark">
                    Rapid Delivery Estimation
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Delivering to:{" "}
                    <button type="button" className="font-semibold text-brand-gold underline">
                      Gulshan 1, Block C
                    </button>
                  </p>
                  <p className="mt-2 text-xs">
                    <span className="font-semibold text-emerald-600">
                      Earliest Slot: Today within 45 Minutes
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-400">
                    Packed in ice-insulated bag · Rider leaves hub on confirmation
                  </p>
                </div>
              </div>
            </div>

            {/* Mini trust row */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: ShieldCheck, t: "100% Formalin Free" },
                { icon: RefreshCw, t: "2-Hr Replacement" },
                { icon: Thermometer, t: "Never Frozen" },
              ].map(({ icon: Icon, t }) => (
                <div
                  key={t}
                  className="flex flex-col items-center gap-1 rounded-lg bg-white px-2 py-2.5 border border-stone-200"
                >
                  <Icon size={14} className="text-emerald-600" />
                  <p className="text-[10px] font-semibold leading-tight text-stone-600">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traceability */}
        <section className="mt-14">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
              From River to Your Home Kitchen
            </p>
            <h2 className="mt-2 text-2xl font-medium text-brand-dark sm:text-3xl">
              Uncompromising Traceability
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-stone-500">
              প্রতিটি মাছের জেটি → ল্যাব → হাব → আপনার দরজা — সম্পূর্ণ স্বচ্ছ হিসাব
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  tab === t
                    ? "bg-brand-dark text-white"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-brand-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {/* Flavour profile */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">
                Sweet Water Flavour Profile
              </p>
              <h3 className="mt-1 text-lg font-bold text-brand-dark">
                Sourced Exclusively from Chandpur&apos;s Confluence of Three Rivers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                When the Hilsa migrates to the same Bay of Bengal upstream into the
                freshwater current of the Padma and Meghna rivers at Chandpur, the fat
                composition changes almost overnight. This sweet-water flush produces the
                unmistakable buttery texture, buttery aroma, and melt-in-mouth mouthfeel that
                deep-sea/hilsa can never replicate.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { n: "18.4%", l: "Natural Omega-3 Oil" },
                  { n: "4.2hrs", l: "Jetty → Cold Transit" },
                  { n: "0 Days", l: "Zero Cold Storage" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl bg-[#f8f5f0] px-3 py-3 text-center"
                  >
                    <p className="text-lg font-bold text-brand-dark">{s.n}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-stone-500">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs text-stone-500">
                <Fish size={14} className="mt-0.5 shrink-0 text-brand-gold" />
                Guaranteed authentic Padma catch by Niketan Mart Fisherman Cooperative.
              </p>
            </div>

            {/* Batch verification */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">
                Batch Verification
              </p>
              <h3 className="mt-1 text-lg font-bold text-brand-dark">
                Lab Certificate #NK-1723
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Every morning departure undergoes spot chromatograph testing for formalin and
                illegal chemical preservatives before unloading at our Niketan cold-chain.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { k: "Formaldehyde / Formalin", v: "0.00 ppm (Negative)", ok: true },
                  { k: "Ammonia / Path Residual", v: "Undetected", ok: true },
                  { k: "Temperature at Receiving", v: "1.4°C · Controlled", ok: true },
                  {
                    k: "View Full Department of Fisheries verified PDF",
                    v: "↓",
                    ok: false,
                  },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-center justify-between border-b border-stone-100 pb-2 text-sm last:border-0"
                  >
                    <span className="text-stone-600">{row.k}</span>
                    <span
                      className={`font-semibold ${
                        row.ok ? "text-emerald-600" : "text-brand-gold"
                      }`}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Epicurean + Nutrition */}
        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">
              Epicurean Flavor Matrix
            </p>
            <h3 className="mt-1 text-lg font-bold text-brand-dark">
              Padma Hilsa Taste Profile
            </h3>

            {/* Simple CSS radar substitute */}
            <div className="relative mx-auto mt-6 flex h-52 w-52 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-stone-200" />
              <div className="absolute inset-6 rounded-full border border-stone-200" />
              <div className="absolute inset-12 rounded-full border border-stone-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="h-0 w-0 border-l-70 border-r-70 border-b-110 border-l-transparent border-r-transparent border-b-brand-gold/30"
                  style={{ transform: "rotate(0deg)" }}
                />
              </div>
              {/* Axis labels */}
              {[
                { t: "Buttery", style: "top-1 left-1/2 -translate-x-1/2" },
                { t: "Omega Rich", style: "right-0 top-1/2 -translate-y-1/2" },
                { t: "Sweet", style: "bottom-1 left-1/2 -translate-x-1/2" },
                { t: "Clean", style: "left-0 top-1/2 -translate-y-1/2" },
                { t: "Roe Density", style: "top-8 right-4" },
              ].map((a) => (
                <span
                  key={a.t}
                  className={`absolute text-[10px] font-semibold text-stone-500 ${a.style}`}
                >
                  {a.t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-stone-500">
              Marked by exceptionally low iron (Fe) and distinctive buttery pungency when
              heated in open pan.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">
              Nutritional Snapshot · per 100g Cooked Portion
            </p>
            <h3 className="mt-1 text-lg font-bold text-brand-dark">
              Values from Niketan Lab Panel
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: "242", u: "kcal", l: "Calories" },
                { n: "21.8", u: "g", l: "Protein" },
                { n: "16.2", u: "g", l: "Omega-3" },
                { n: "92%", u: "", l: "Vit D3 RDA" },
              ].map((n) => (
                <div
                  key={n.l}
                  className="rounded-xl bg-[#f8f5f0] px-3 py-3 text-center"
                >
                  <p className="text-xl font-bold text-brand-dark">
                    {n.n}
                    <span className="text-xs font-medium text-stone-500">{n.u}</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-stone-500">{n.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-stone-200 p-4">
              <p className="text-xs font-bold text-brand-dark">
                Storage Tips from Niketan Fish Masters
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                If consuming within 24 hours, keep unwashed in ice paper before deep
                freezer. For longer keeping up to 30 days, wrap airtight in foil paper before deep
                freezer at −18°C.
              </p>
            </div>
          </div>
        </section>

        {/* Heritage Kitchen Guide */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
                Heritage Kitchen Guide
              </p>
              <h2 className="mt-1 text-2xl font-medium text-brand-dark sm:text-3xl">
                Pair the Textbook Ilish Recipes
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Ready in 25 minutes with ghee · onion · cold-pressed mustard oil and hand-picked spices
              </p>
            </div>
            <div className="flex gap-4 text-xs text-stone-500">
              <span>
                Cooking Time: <b className="text-brand-dark">25 mins</b>
              </span>
              <span>
                Difficulty: <b className="text-brand-dark">Moderate</b>
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Recipe image card */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="relative aspect-16/10 bg-linear-to-br from-amber-100 to-orange-50">
                <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                  <Leaf size={32} />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-stone-500">Classic Bhapa Ilish</p>
                <h3 className="mt-0.5 text-base font-bold text-brand-dark">
                  Steamed Mustard Hilsa
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">
                  Envelop the 1.2kg whole fish with curry cut. The mustard is
                  exceedingly soft yet holds aroma when cut. Took precisely 28
                  minutes from placing order on Niketan app to delivery at door
                  apartment. Outstanding cut and gut cleaning.
                </p>
              </div>
            </div>

            {/* Ingredient checklist */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Add Required Cooking Ingredients Directly
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Get the exact chef-grade pantry items delivered with the same express basket.
              </p>

              <div className="mt-4 space-y-2.5">
                {[
                  {
                    name: "Pure Wood-Pressed Mustard Oil (খুব সরিষার তেল)",
                    meta: "500ml Glass Bottle · Cold Filtered",
                    price: 340,
                  },
                  {
                    name: "Bhapa Green Chilli & Mustard Paste Combo",
                    meta: "100g Fresh Chilli · 50g Ground Mustard Paste",
                    price: 65,
                  },
                  {
                    name: "Shogun Premium Chengra Aromatic Rice",
                    meta: "1KG Pack · 12-Month Long-Aged Grain",
                    price: 189,
                  },
                ].map((ing) => (
                  <label
                    key={ing.name}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 p-3 hover:border-brand-gold"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 accent-brand-dark"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-brand-dark">
                        {ing.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-stone-500">
                        {ing.meta}
                      </span>
                    </span>
                    <span className="text-sm font-bold text-brand-dark">
                      ৳{ing.price}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-4">
                <p className="text-xs text-stone-500">
                  Combo Add-on Price · 3 items
                </p>
                <button
                  type="button"
                  className="rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white"
                >
                  Add All Recipe Ingredients · ৳594
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-brand-dark sm:text-3xl">
                Neighborhood Kitchen Reviews
              </h2>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <b className="text-brand-dark">{product.rating}</b>
                <span className="text-stone-500">
                  · {product.reviews} verified ratings
                </span>
              </div>
            </div>

            {/* Rating breakdown */}
            <div className="w-full max-w-xs space-y-1 sm:w-56">
              {[5, 4, 3, 2, 1].map((n) => {
                const pct = n === 5 ? 92 : n === 4 ? 6 : n === 3 ? 2 : 0;
                return (
                  <div key={n} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-stone-500">{n}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-stone-400">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="rounded-2xl border border-stone-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-dark">{r.name}</p>
                      <p className="text-[11px] text-stone-400">{r.area}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400">{r.date}</span>
                </div>

                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {r.text}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#f8f5f0] px-2.5 py-1 text-[10px] font-medium text-stone-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Photo strip */}
          <div className="mt-6">
            <p className="text-xs font-bold text-stone-500">
              Unboxing Photos from Neighborhood Kitchens
            </p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-stone-100"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${
                      [
                        "from-sky-100 to-cyan-50",
                        "from-amber-50 to-orange-50",
                        "from-emerald-50 to-green-50",
                        "from-rose-50 to-pink-50",
                        "from-violet-50 to-purple-50",
                      ][i]
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
                Niketan Fresh Pier
              </p>
              <h2 className="mt-1 text-2xl font-medium text-brand-dark sm:text-3xl">
                Other River Catch Landing Today
              </h2>
            </div>
            <Link
              href="/shop/fish-meat"
              className="text-xs font-semibold text-brand-gold hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((r) => (
              <article
                key={r.id}
                className="group rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
                  <div className={`absolute inset-0 bg-linear-to-br ${r.bg}`} />
                </div>
                <h3 className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-brand-dark">
                  {r.name}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-stone-500">{r.bn}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-brand-dark">
                    ৳{r.price}
                  </span>
                  {r.old && (
                    <span className="text-[11px] text-stone-400 line-through">
                      ৳{r.old}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-dark py-2 text-xs font-bold text-white transition hover:bg-stone-800"
                >
                  <Plus size={14} /> Add to Bag
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
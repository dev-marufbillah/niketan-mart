"use client";

import Link from "next/link";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Flame,
  Grid2X2,
  List,
  MapPin,
  ShieldCheck,
  Truck,
  Sprout,
  RefreshCw,
  Phone,
  X,
  Zap,
} from "lucide-react";
import {
  products as allProducts,
  type Category,
  type Diet,
} from "@/lib/data/products";
import ProductCard from "@/components/shop/ProductCard";

type Props = { title: string; bn: string; desc: string; crumb: string };

const dietOptions: { key: Diet; label: string }[] = [
  { key: "organic", label: "100% Farm Fresh / Organic" },
  { key: "halal", label: "Halal Certified" },
  { key: "desi", label: "Deshi Origin (দেশীয়)" },
  { key: "direct", label: "Direct Farm Contract" },
  { key: "sugarfree", label: "Sugar-Free / Keto Pantry" },
];

const offerOptions = ["On Sale", "Buy 1 Get 1", "Morning Harvest", "Family Bundle"];

const PAGE = 8;
const MAX_PRICE = 5000;

function ShopViewContent({ title, bn, desc, crumb }: Props) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [cat, setCat] = useState<"all" | Category>("all");
  const [prevUrlCategory, setPrevUrlCategory] = useState<string | null>(null);

  const [express, setExpress] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minPrice, setMinPrice] = useState(0);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE);

  // 🔥 Sync category state with URL search param (Smart Matcher)
  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    if (urlCategory) {
      const catLower = urlCategory.toLowerCase();
      let matchedCat: Category | "all" = "all";

      if (catLower.includes("fresh") || catLower.includes("veg")) {
        matchedCat = "fresh";
      } else if (catLower.includes("grocery") || catLower.includes("pantry")) {
        matchedCat = "grocery";
      } else if (catLower.includes("meat") || catLower.includes("fish")) {
        matchedCat = "meat";
      } else if (catLower.includes("dairy") || catLower.includes("egg") || catLower.includes("bakery")) {
        matchedCat = "dairy";
      } else if (catLower.includes("fruit")) {
        matchedCat = "fruits";
      }

      setCat(matchedCat);
      setVisible(PAGE);
    } else {
      setCat("all");
    }
  }

  // 🔥 Dynamic Metadata for Hero Section
  const categoryMeta = useMemo(() => {
    const meta: Record<string, { t: string; b: string; d: string; bg: string; c: string }> = {
      all: { 
        t: title || "Shop Everything Fresh", 
        b: bn || "(সব পণ্য এক জায়গায়)", 
        d: desc || "Browse the full Niketan Mart catalog: vegetables, fruits, fish, meat, dairy and pantry staples.", 
        bg: "from-stone-100 to-[#f8f5f0]",
        c: crumb || "Shop All"
      },
      fresh: { 
        t: "Farm Fresh Vegetables", 
        b: "(টাটকা কাঁচাবাজার)", 
        d: "Daily harvested leafy greens and vegetables from Savar & Bogura farms, packed for Gulshan express delivery.", 
        bg: "from-emerald-100/70 to-[#f8f5f0]",
        c: "Fresh Veg"
      },
      fruits: { 
        t: "Seasonal Fresh Fruits", 
        b: "(তাজা ফলমূল)", 
        d: "Premium quality local and imported seasonal fruits delivered fresh.", 
        bg: "from-amber-100/70 to-[#f8f5f0]",
        c: "Fruits"
      },
      meat: { 
        t: "Fish & Premium Meat", 
        b: "(মাছ ও মাংস)", 
        d: "Halal-certified meat and river-fresh fish, cleaned and portioned for same-day cooking.", 
        bg: "from-rose-100/70 to-[#f8f5f0]",
        c: "Fish & Meat"
      },
      dairy: { 
        t: "Dairy & Bakery", 
        b: "(ডেইরি ও ডিম)", 
        d: "Fresh milk, yogurt, cheese and farm eggs from trusted dairy partners across Bangladesh.", 
        bg: "from-blue-100/70 to-[#f8f5f0]",
        c: "Dairy & Eggs"
      },
      grocery: { 
        t: "Grocery & Pantry Staples", 
        b: "(মুদির বাজার)", 
        d: "Rice, oil, spices, snacks and daily household essentials for your complete monthly pantry.", 
        bg: "from-orange-100/60 to-[#f8f5f0]",
        c: "Grocery"
      },
    };
    return meta[cat] || meta.all;
  }, [cat, title, bn, desc, crumb]);

  const toggle = <T,>(list: T[], set: (v: T[]) => void, v: T) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const brandList = useMemo(() => {
    const map = new Map<string, number>();
    allProducts.forEach((p) => map.set(p.brand, (map.get(p.brand) ?? 0) + 1));
    return [...map.entries()];
  }, []);

  const filtered = useMemo(() => {
    let list = allProducts.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        diets.every((d) => p.diet.includes(d)) &&
        (brands.length === 0 || brands.includes(p.brand)) &&
        (offers.length === 0 || offers.some((o) => p.offers.includes(o)))
    );
    if (sort === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, minPrice, maxPrice, diets, brands, offers, sort]);

  const shown = filtered.slice(0, visible);

  const reset = () => {
    setCat("all");
    setExpress(false);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setDiets([]);
    setBrands([]);
    setOffers([]);
    setVisible(PAGE);
  };

  const applied: { label: string; clear: () => void }[] = [
    ...diets.map((d) => ({
      label: dietOptions.find((o) => o.key === d)!.label,
      clear: () => setDiets(diets.filter((x) => x !== d)),
    })),
    ...brands.map((b) => ({
      label: b,
      clear: () => setBrands(brands.filter((x) => x !== b)),
    })),
    ...offers.map((o) => ({
      label: o,
      clear: () => setOffers(offers.filter((x) => x !== o)),
    })),
    ...(maxPrice < MAX_PRICE
      ? [
          {
            label: `Under ৳${maxPrice.toLocaleString()}`,
            clear: () => setMaxPrice(MAX_PRICE),
          },
        ]
      : []),
  ];

  return (
    <div className="bg-[#f8f5f0]">
      {/* Promo strip */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs lg:px-8">
          <p className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase text-stone-600">
              Flash Weekend
            </span>
            <span>
              <b>Special Harvest Offer:</b> Use code{" "}
              <b className="underline">FRESH10</b> for 10% off organic farm
              produce &amp; dairy above ৳1,200.
            </span>
          </p>
          <p className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-brand-gold" /> 45-Min Express Slot
              Active
            </span>
            <Link href="/deals" className="font-semibold text-brand-gold">
              Claim Now →
            </Link>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-5">
          <Link href="/" className="hover:text-brand-dark transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-brand-dark transition-colors">
            All Products
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-brand-dark capitalize">
            {categoryMeta.c}
          </span>
        </nav>

        {/* 🔥 Dynamic Hero Box (Matches Header selection automatically) */}
        <div className={`relative overflow-hidden rounded-3xl border border-stone-200/50 bg-linear-to-br ${categoryMeta.bg} p-6 sm:p-8 lg:p-10 transition-all duration-500 ease-in-out`}>
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold bg-white/60 backdrop-blur-xs px-3 py-1 rounded-full inline-block shadow-xs mb-3">
                Gulshan, Banani &amp; Baridhara Farm Hub
              </p>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl md:text-5xl tracking-tight transition-all duration-300">
                {categoryMeta.t}
              </h1>
              <p className="mt-2 font-display text-2xl font-bold text-stone-700 sm:text-3xl transition-all duration-300">
                {categoryMeta.b}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base font-medium transition-all duration-300">
                {categoryMeta.d}
              </p>
            </div>

            <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md p-4 shadow-sm lg:w-auto">
              <div className="p-3 bg-stone-900 rounded-xl text-white">
                <Truck size={22} className="shrink-0" />
              </div>
              <div className="leading-tight">
                <p className="text-xs text-stone-500 font-medium">
                  Next Delivery:{" "}
                  <b className="text-emerald-600 font-bold text-sm">Within 45 Mins</b>
                </p>
                <p className="mt-1 text-[11px] text-stone-500 font-medium">
                  Gulshan 1, Dhaka Express Hub
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Body (Cards and Sidebar) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Delivery Location
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-brand-gold"
                >
                  Change
                </button>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-brand-dark" />
                <div className="leading-tight">
                  <p className="text-sm font-bold text-brand-dark">
                    Gulshan 1, Block C, Dhaka
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Slot:{" "}
                    <span className="font-semibold text-emerald-600">
                      Today in 45 mins
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-brand-dark">
                  Filters (ফিল্টার)
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-semibold text-brand-gold"
                >
                  Reset All
                </button>
              </div>

              {/* Express */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-stone-50 p-3">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-brand-gold" />
                  <div className="leading-tight">
                    <p className="text-xs font-bold">45-Min Express Only</p>
                    <p className="text-[11px] text-stone-400">
                      Direct Gulshan Hub stock
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={express}
                  onClick={() => setExpress(!express)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                    express ? "bg-brand-gold" : "bg-stone-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      express ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Price */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">Price Range</span>
                  <span className="text-stone-500">
                    ৳{minPrice} – ৳{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setVisible(PAGE);
                  }}
                  className="mt-3 w-full accent-brand-gold"
                />
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                  <label>
                    Min
                    <input
                      type="number"
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                      className="mt-1 w-full rounded border border-stone-200 px-2 py-1.5 text-xs text-brand-dark outline-none focus:border-brand-gold"
                    />
                  </label>
                  <label>
                    Max
                    <input
                      type="number"
                      min={0}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Number(e.target.value) || MAX_PRICE)
                      }
                      className="mt-1 w-full rounded border border-stone-200 px-2 py-1.5 text-xs text-brand-dark outline-none focus:border-brand-gold"
                    />
                  </label>
                </div>
              </div>

              {/* Dietary */}
              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Dietary &amp; Sourcing
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {dietOptions.map((o) => (
                    <label
                      key={o.key}
                      className="flex cursor-pointer items-center gap-2 text-[13px] text-stone-700"
                    >
                      <input
                        type="checkbox"
                        checked={diets.includes(o.key)}
                        onChange={() => {
                          toggle(diets, setDiets, o.key);
                          setVisible(PAGE);
                        }}
                        className="h-3.5 w-3.5 accent-brand-dark"
                      />
                      <span className="flex-1">{o.label}</span>
                      <span className="text-[11px] text-stone-400">
                        {allProducts.filter((p) => p.diet.includes(o.key)).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Brands &amp; Cooperatives
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {brandList.map(([b, n]) => (
                    <label
                      key={b}
                      className="flex cursor-pointer items-center gap-2 text-[13px] text-stone-700"
                    >
                      <input
                        type="checkbox"
                        checked={brands.includes(b)}
                        onChange={() => {
                          toggle(brands, setBrands, b);
                          setVisible(PAGE);
                        }}
                        className="h-3.5 w-3.5 accent-brand-dark"
                      />
                      <span className="flex-1">{b}</span>
                      <span className="text-[11px] text-stone-400">{n}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Offers */}
              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Offers &amp; Special Lots
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {offerOptions.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        toggle(offers, setOffers, o);
                        setVisible(PAGE);
                      }}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                        offers.includes(o)
                          ? "border-brand-dark bg-brand-dark text-white"
                          : "border-stone-200 text-stone-600 hover:border-brand-gold"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setVisible(PAGE)}
                className="mt-5 w-full rounded-full bg-brand-dark py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800"
              >
                Apply Selected Filters
              </button>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
              <ShieldCheck size={20} className="mx-auto text-emerald-600" />
              <p className="mt-2 text-sm font-bold">Farm Quality Guarantee</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                If any fruit, vegetable, or fish is not 100% fresh, we replace
                it instantly within 2 hours or issue full cashback refund.
              </p>
            </div>
          </aside>

          {/* Results Area */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs mb-4">
              <div className="leading-tight px-2">
                <p className="text-sm font-semibold text-brand-dark">
                  Showing 1–{shown.length} of {filtered.length} products in{" "}
                  <span className="capitalize">{categoryMeta.c}</span>
                </p>
                <p className="mt-0.5 text-xs text-stone-400">
                  Live updates from Karwan Bazar &amp; Savar Organic Estates
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                  Sort By:
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm font-bold text-brand-dark outline-none cursor-pointer"
                  >
                    <option value="popular">Popularity &amp; Best Selling</option>
                    <option value="rating">Top Rated</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </label>
                <div className="flex gap-1 border-l border-stone-200 pl-3">
                  {(["grid", "list"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-label={`${v} view`}
                      onClick={() => setView(v)}
                      className={`rounded-lg p-2 transition-all ${
                        view === v
                          ? "bg-brand-dark text-white shadow-md"
                          : "bg-stone-50 text-stone-400 hover:text-brand-dark hover:bg-stone-100"
                      }`}
                    >
                      {v === "grid" ? <Grid2X2 size={16} /> : <List size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Applied Filters */}
            {applied.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">Applied:</span>
                {applied.map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={a.clear}
                    className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 hover:border-rose-300 hover:bg-rose-50 transition-colors"
                  >
                    {a.label} <X size={12} className="text-stone-400" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={reset}
                  className="font-bold text-rose-500 hover:underline ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Grid using ProductCard component */}
            {shown.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-stone-300 bg-white py-16 px-6 text-center text-stone-500 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-stone-800">No products found</h3>
                <p className="text-sm mt-1 mb-4">We couldn&apos;t find anything matching your filters.</p>
                <button onClick={reset} className="px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-semibold hover:bg-brand-gold transition-colors">Clear Filters</button>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-5 ${
                  view === "grid"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {shown.map((p, i) => (
                  <div key={p.id} className="contents">
                    <ProductCard product={p} view={view} />

                    {/* Fresh Club banner after 8 items (grid view) */}
                    {i === 7 && view === "grid" && (
                      <div className="col-span-full rounded-2xl border-2 border-brand-gold/30 bg-linear-to-r from-amber-50 to-orange-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm my-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white bg-brand-gold px-2.5 py-1 rounded-md">
                              VIP Club
                            </span>
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
                            Save 5% Extra + Free Delivery
                          </p>
                          <p className="text-sm leading-relaxed text-stone-600 max-w-xl font-medium">
                            Become a Gulshan Circle member. Unlock priority 30-minute delivery slots and exclusive morning bazaar allocations.
                          </p>
                        </div>
                        <div className="shrink-0 flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            className="w-full sm:w-auto rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white hover:bg-stone-800 transition-colors shadow-md"
                          >
                            Join for ৳299/mo
                          </button>
                          <Link href="/club" className="text-xs font-bold text-brand-gold hover:underline">
                            View Member Benefits →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Load more */}
            {filtered.length > 0 && (
              <div className="mt-10 mb-6 text-center border-t border-stone-200 pt-8">
                <p className="text-xs font-semibold text-stone-500 mb-4 uppercase tracking-wider">
                  Showing {shown.length} of {filtered.length} products
                </p>
                {visible < filtered.length && (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + 8)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-stone-300 px-8 py-3 text-sm font-bold text-brand-dark hover:border-brand-gold hover:text-brand-gold transition-all shadow-xs"
                  >
                    <RefreshCw size={16} className="text-stone-400" /> 
                    Load More Items
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-360 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            {
              Icon: Flame,
              t: "45-Minute Delivery",
              d: "Swift neighborhood fleet running continuous temperature-controlled slots in Gulshan, Banani and Baridhara.",
            },
            {
              Icon: Sprout,
              t: "Direct Farm Harvest",
              d: "Zero wholesale middlemen. Direct contracts with organic growers in Bogura, Savar, and Dinajpur.",
            },
            {
              Icon: RefreshCw,
              t: "100% Replacement",
              d: "Damaged, bruised, or unsatisfied with any fruit, fish or produce? We swap within 2 hours, no questions asked.",
            },
            {
              Icon: Phone,
              t: "Neighborhood Helpline",
              d: "Chat on WhatsApp or call our Gulshan hub hotline: +880 1800-NIKETAN.",
            },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex gap-3">
              <Icon size={22} className="mt-0.5 shrink-0 text-brand-dark" />
              <div>
                <h4 className="text-sm font-bold text-brand-dark sm:text-base">
                  {t}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Next.js Suspense Wrapper exported default
export default function ShopView(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-8 text-center text-sm font-semibold text-stone-500">
          Loading catalog...
        </div>
      }
    >
      <ShopViewContent {...props} />
    </Suspense>
  );
}
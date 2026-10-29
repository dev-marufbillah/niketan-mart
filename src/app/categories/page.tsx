import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Fish,
  Leaf,
  ShoppingCart,
  UtensilsCrossed,
  PackageSearch,
} from "lucide-react";

const mainCategories = [
  {
    title: "Restaurant",
    subtitle: "Partner kitchens & chef meals",
    cta: "Explore meals",
    href: "/shop?category=Restaurant",
    Icon: UtensilsCrossed,
    iconColor: "text-brand-gold",
    subtitleColor: "text-white/70",
    english: true,
    bg: "from-[#6b5535] to-[#4a3820]",
  },
  {
    title: "কাঁচাবাজার",
    subtitle: "Fresh Market & Vegetables",
    cta: "Shop fresh",
    href: "/shop?category=Fresh Veg",
    Icon: Leaf,
    iconColor: "text-emerald-400",
    subtitleColor: "text-emerald-200",
    english: false,
    bg: "from-[#4f4d27] to-[#6b6a45]",
  },
  {
    title: "মুদির বাজার",
    subtitle: "Grocery, Spices & Pantry",
    cta: "Shop groceries",
    href: "/shop?category=Grocery",
    Icon: ShoppingCart,
    iconColor: "text-brand-gold",
    subtitleColor: "text-white/80",
    english: false,
    bg: "from-[#7a6a58] to-[#5c4a30]",
  },
  {
    title: "মাছ-মাংস",
    subtitle: "River Fish & Halal Meat",
    cta: "Shop now",
    href: "/shop?category=Fish & Meat",
    Icon: Fish,
    iconColor: "text-rose-400",
    subtitleColor: "text-white/80",
    english: false,
    bg: "from-[#6e5638] to-[#4d3a22]",
  },
];

// এখানে আরও ক্যাটাগরি যোগ করা হয়েছে যাতে পেজটি ভরা মনে হয়
const subCategories = [
  { label: "ডেইরি ও ডিম", emoji: "🥛", href: "/shop?category=Dairy & Eggs" },
  { label: "তাজা ফলমূল", emoji: "🍎", href: "/shop?category=Fruits" },
  { label: "বেকারি ও বিস্কুট", emoji: "🥐", href: "/shop?category=Grocery" },
  { label: "খাঁটি মধু ও তেল", emoji: "🍯", href: "/shop?category=Grocery" },
  { label: "চা ও স্ন্যাকস", emoji: "🍵", href: "/shop?category=Grocery" },
  { label: "ক্লিনিং ও হাইজিন", emoji: "🧼", href: "/shop?category=Grocery" },
  { label: "পার্সোনাল কেয়ার", emoji: "🧴", href: "/shop?category=Grocery" },
  { label: "বেবি কেয়ার", emoji: "🍼", href: "/shop?category=Grocery" },
  { label: "পেট কেয়ার", emoji: "🐾", href: "/shop?category=Grocery" },
  { label: "ফ্রোজেন ফুড", emoji: "🧊", href: "/shop?category=Grocery" },
  { label: "সস ও আচার", emoji: "🥫", href: "/shop?category=Grocery" },
  { label: "পানীয় ও জুস", emoji: "soda", href: "/shop?category=Grocery" },
];

export const metadata = {
  title: "All Categories - Niketan Mart",
  description: "Explore all departments and categories at Niketan Mart.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 items-center gap-1.5 px-4 py-2.5 text-xs text-stone-500 lg:px-8">
          <Link href="/" className="hover:text-brand-dark">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-brand-dark">All Categories</span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl flex items-center gap-3 justify-center sm:justify-start">
              <PackageSearch className="text-brand-gold" size={32} />
              All Categories
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Browse the full Niketan Mart catalog (আমাদের সকল প্রোডাক্ট ক্যাটাগরি)
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-stone-800"
          >
            Shop All Items <ArrowRight size={16} />
          </Link>
        </div>

        {/* Main Departments */}
        <div className="mb-10">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-2">
            Main Departments
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {mainCategories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br ${c.bg} p-5 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

                {/* Icon */}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <c.Icon size={24} className={c.iconColor} />
                </span>

                {/* Text */}
                <div className="relative mt-auto pt-4">
                  <h3
                    className={`leading-tight ${
                      c.english
                        ? "font-display text-xl font-bold"
                        : "text-2xl font-bold"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`mt-1 text-xs ${c.subtitleColor}`}>
                    {c.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sub Categories */}
        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-2">
            Aisles & Sub-categories
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {subCategories.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-xs transition hover:-translate-y-1 hover:border-brand-gold hover:shadow-md"
              >
                <span className="text-4xl transition-transform group-hover:scale-110">
                  {chip.emoji}
                </span>
                <span className="text-sm font-bold text-brand-dark">
                  {chip.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Fish,
  Leaf,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Image pore add korte chaile:
 * 1. public/images e image rakhun
 * 2. `image: null` er jayga-y likhun, jemon: image: "/images/cat-restaurant.jpg"
 */
const categories = [
  {
    title: "Restaurant",
    subtitle: "Partner kitchens & chef meals",
    cta: "Explore meals",
    href: "/shop?category=Restaurant",
    Icon: UtensilsCrossed,
    iconColor: "text-brand-gold",
    subtitleColor: "text-white/70",
    english: true,
    image: null as string | null,
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
    image: null as string | null,
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
    image: null as string | null,
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
    image: null as string | null,
    bg: "from-[#6e5638] to-[#4d3a22]",
  },
];

const chips = [
  { label: "ডেইরি ও ডিম", emoji: "🥛", href: "/shop?category=Dairy & Eggs" },
  { label: "তাজা ফলমূল", emoji: "🍎", href: "/shop?category=Fruits" },
  { label: "বেকারি ও বিস্কুট", emoji: "🥐", href: "/shop?category=Grocery" },
  { label: "খাঁটি মধু ও তেল", emoji: "🍯", href: "/shop?category=Grocery" },
  { label: "চা ও স্ন্যাকস", emoji: "🍵", href: "/shop?category=Grocery" },
  { label: "ক্লিনিং ও হাইজিন", emoji: "🧼", href: "/shop?category=Grocery" },
];

export default function Categories() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 py-10 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
              Explore Department
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
              Shop by Category
            </h2>
          </div>
          {/* ✅ href="/categories" আপডেট করা হয়েছে */}
          <Link
            href="/categories"
            className="flex shrink-0 items-center gap-1.5 pb-1 text-xs font-semibold text-brand-gold hover:underline sm:text-sm"
          >
            See All Categories <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative flex h-52 flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br ${c.bg} p-4 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:h-56`}
            >
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

              {/* Icon */}
              <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <c.Icon size={20} className={c.iconColor} />
              </span>

              {/* Text */}
              <div className="relative">
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

              {/* CTA */}
              <span className="relative mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-gold">
                {c.cta}
                <ArrowRight
                  size={13}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Sub-category chips */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-3 text-xs font-semibold text-brand-dark shadow-sm transition hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-md sm:text-sm"
            >
              <span className="text-base leading-none">{chip.emoji}</span>
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    desc: "Fresh & certified products",
    Icon: BadgeCheck,
    iconWrap: "bg-amber-50 text-amber-600",
  },
  {
    title: "Express Delivery",
    desc: "At your doorstep in 45–60m",
    Icon: Truck,
    iconWrap: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "100% Halal Certified",
    desc: "Fresh river fish & organic meat",
    Icon: ShieldCheck,
    iconWrap: "bg-blue-50 text-blue-600",
  },
  {
    title: "Neighborhood Support",
    desc: "Live chat & instant returns",
    Icon: Headphones,
    iconWrap: "bg-purple-50 text-purple-600",
  },
];

export default function Features() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {features.map(({ title, desc, Icon, iconWrap }) => (
          <div key={title} className="flex items-center gap-3.5">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
            >
              <Icon size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-brand-dark">{title}</p>
              <p className="mt-0.5 text-xs text-stone-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { Star } from "lucide-react";

/**
 * Ekhane shudhu REAL customer-er review boshan (tader onumotir shathe).
 * Ekhon placeholder ache. Pore eta MongoDB theke ante parben.
 */
const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Sample review text. Replace this with a real customer review.",
    name: "Customer Name",
    area: "Area, Dhaka",
  },
  {
    id: 2,
    rating: 5,
    text: "Sample review text. Replace this with a real customer review.",
    name: "Customer Name",
    area: "Area, Dhaka",
  },
  {
    id: 3,
    rating: 5,
    text: "Sample review text. Replace this with a real customer review.",
    name: "Customer Name",
    area: "Area, Dhaka",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Testimonials() {
  return (
    <section className="bg-[#f8f5f0]">
      <div className="mx-auto max-w-360 px-4 py-10 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Trusted in Dhaka
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Loved by Dhaka Foodies &amp; Families
          </h2>
          <p className="mt-2 text-xs text-stone-500 sm:text-sm">
            See why our neighbors trust Niketan Mart for their daily fresh meals
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < r.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-300"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 text-xs italic leading-relaxed text-stone-600 sm:text-sm">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-[11px] font-bold text-brand-dark">
                  {initials(r.name)}
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-brand-dark">{r.name}</p>
                  <p className="mt-0.5 text-[11px] text-stone-400">{r.area}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, UtensilsCrossed } from "lucide-react";
import { navItems } from "./nav-items";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="mx-auto flex max-w-360 items-center gap-6 overflow-x-auto whitespace-nowrap px-4 text-sm lg:gap-8 lg:px-8">
      {navItems.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : item.href === "/shop"
            ? pathname === "/shop"
            : pathname.startsWith(item.href);
        const isDeal = item.icon === "deal";
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-1.5 border-b-2 py-3.5 transition ${
                active
                  ? "border-brand-gold font-semibold text-brand-dark"
                  : "border-transparent text-stone-600 hover:text-brand-dark"
              } ${isDeal ? "font-semibold text-red-500!" : ""}`}
            >
              {item.dot && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              )}
              {item.icon === "meal" && (
                <UtensilsCrossed size={14} className="text-brand-gold" />
              )}
              {isDeal && <Flame size={14} className="text-orange-500" />}
              <span
                className={
                  item.icon === "meal" ? "font-semibold text-brand-dark" : ""
                }
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
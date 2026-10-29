import { notFound } from "next/navigation";
import ShopView from "@/components/shop/ShopView";
import { departments } from "@/lib/data/products";
export const instant = false;

export function generateStaticParams() {
  return Object.keys(departments)
    .filter((key) => key !== "all")
    .map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const d = departments[category];
  if (!d) notFound();
  return <ShopView title={d.title} bn={d.bn} desc={d.desc} crumb={d.crumb} />;
}
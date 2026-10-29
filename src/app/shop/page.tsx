import ShopView from "@/components/shop/ShopView";
import { departments } from "@/lib/data/products";

export const metadata = { title: "Shop All" };

export default function ShopPage() {
  const d = departments.all;
  return <ShopView title={d.title} bn={d.bn} desc={d.desc} crumb={d.crumb} />;
}
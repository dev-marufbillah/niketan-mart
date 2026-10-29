import { notFound } from "next/navigation";
import ProductDetailView from "@/components/shop/ProductDetailView";
import { products } from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailView product={product} />;
}
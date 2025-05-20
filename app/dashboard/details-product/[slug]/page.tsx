import ProductDetailForm from "@/components/product/ProductDetailForm";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Product Details</h1>
      <ProductDetailForm slug={params.slug} />
    </div>
  );
}

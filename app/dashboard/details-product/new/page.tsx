import CreateProductForm from "@/components/product/CreateProductForm";

export default function CreateProductPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <CreateProductForm />
    </div>
  );
}

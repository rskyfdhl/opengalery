import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { ProductDetailWithProduct } from "@/types/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Fetch products with their related data
async function getProducts(): Promise<ProductDetailWithProduct[]> {
  const { data, error } = await supabase
    .from("product_details")
    .select(
      `
        *,
        products(*)
      `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data as ProductDetailWithProduct[];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/dashboard/details-product/new">Add New Product</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of all products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No products found. Add your first product!
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const {
                id,
                name,
                price,
                quantity,
                slug,
                products: parentProduct,
              } = product;

              return (
                <TableRow key={id}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {parentProduct?.type || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    Rp.{price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">{quantity}</TableCell>
                  <TableCell>
                    {quantity > 0 ? (
                      <Badge className="bg-green-100 text-green-800">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/details-product/${slug}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" disabled>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

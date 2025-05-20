"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { uploadProductImage } from "@/lib/supabase/upload-product-image";
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const createProductSchema = z.object({
  product_id: z.string().min(1, "Please select a product"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must contain lowercase, numbers, and hyphens"),
  price: z.coerce.number().nonnegative("Price must be 0 or more"),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

export default function CreateProductForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      product_id: "",
      name: "",
      slug: "",
      price: 0,
      quantity: 0,
      description: "",
    },
  });

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const { data } = await res.json();
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    const currentSlug = form.getValues("slug");
    if (!currentSlug || currentSlug === generateSlug(form.getValues("name"))) {
      form.setValue("slug", generateSlug(name));
    }
  };

  const onSubmit = async (values: CreateProductFormValues) => {
    setIsSubmitting(true);
    setError(null);

    const selectedProduct = products.find(
      (p) => p.id === Number(values.product_id)
    );

    if (!selectedProduct) {
      toast.error("Invalid product selection");
      setIsSubmitting(false);
      return;
    }

    if (!imageFile) {
      toast.error("Image is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const imageUrl = await uploadProductImage(
        imageFile,
        selectedProduct.type
      );

      const { error } = await supabase.from("product_details").insert([
        {
          ...values,
          product_id: Number(values.product_id),
          image_url: imageUrl,
        },
      ]);

      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      toast.success("Product detail created");
      router.push("/dashboard/details-product");
    } catch (err: any) {
      toast.error("Failed to upload image");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Product Detail</CardTitle>
        <CardDescription>
          Fill out the form below to add product details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={handleNameChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Auto-generated URL slug.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="">-- Choose a product --</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.type}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Pilih kategori produk seperti Undangan, Photostrip, dsb.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
                  }}
                />
              </FormControl>
              <FormDescription>Upload product image</FormDescription>
            </FormItem>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create Detail"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

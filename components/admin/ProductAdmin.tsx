"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: number;
  type: string;
  is_customizable: boolean;
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: "",
    is_customizable: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const { data } = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error("Gagal fetch produk:", err);
    }
  }

  async function handleSubmit() {
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify([form]),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setForm({ type: "", is_customizable: false });
      setOpen(false);
      fetchProducts();
    } else {
      const { error } = await res.json();
      console.error("Gagal simpan:", error);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    else console.error("Gagal hapus produk");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Kelola Produk</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Tambah Produk</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.is_customizable}
                onChange={(e) =>
                  setForm({ ...form, is_customizable: e.target.checked })
                }
              />
              <Label>Customizable</Label>
            </div>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-medium">{product.type}</h2>
              <p className="text-sm">
                Custom: {product.is_customizable ? "Ya" : "Tidak"}
              </p>
              <Button
                variant="destructive"
                onClick={() => handleDelete(product.id)}
              >
                Hapus
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

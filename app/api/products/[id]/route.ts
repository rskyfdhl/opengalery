// FILE: app/api/products/[id]/route.ts
import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error menghapus produk:", error);
    return NextResponse.json(
      { statusText: "Produk Gagal Dihapus" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { statusText: "Produk Berhasil Dihapus" },
    { status: 200 }
  );
}

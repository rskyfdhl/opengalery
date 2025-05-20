//..app/api/products
import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase.from("products").insert(body).select(); // optional, jika ingin return data

  if (error) {
    console.error("Gagal menambahkan produk:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 201 });
}

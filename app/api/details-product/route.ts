import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

// Create product details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📦 Incoming body:", body);

    const { product_id, name, price, quantity, description, slug, image_url } =
      body;

    // Validate required fields
    if (!product_id || !name || !slug) {
      console.warn("⚠️ Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the slug is already in use
    const { data: existingSlug, error: slugCheckError } = await supabase
      .from("product_details")
      .select("id")
      .eq("slug", slug)
      .maybeSingle(); // gunakan maybeSingle untuk mencegah error kalau tidak ada hasil

    if (slugCheckError) {
      console.error("❌ Error checking slug:", slugCheckError.message);
      return NextResponse.json(
        { error: "Error checking slug" },
        { status: 500 }
      );
    }

    if (existingSlug) {
      console.warn("⚠️ Slug already exists");
      return NextResponse.json(
        { error: "Slug already in use" },
        { status: 400 }
      );
    }

    // Insert new product details
    const { data, error } = await supabase
      .from("product_details")
      .insert({
        product_id,
        name,
        price: price || 0,
        quantity: quantity || 0,
        description,
        slug,
        image_url,
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to create product details" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product details created successfully",
      data,
    });
  } catch (error: any) {
    console.error("❌ Unexpected error:", error.message || error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all product details
export async function GET() {
  try {
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
      return NextResponse.json(
        { error: "Failed to fetch product details" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Unexpected GET error:", error.message || error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

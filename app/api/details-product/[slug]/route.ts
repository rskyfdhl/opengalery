import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get product details by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabase
      .from("product_details")
      .select(
        `
        *,
        products(*)
      `
      )
      .eq("slug", slug)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch product details" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Product details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update product details
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    // First, check if the product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from("product_details")
      .select("id")
      .eq("slug", slug)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update the product details
    const { data, error } = await supabase
      .from("product_details")
      .update({
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        // Don't update the slug as it's used for routing
      })
      .eq("id", existingProduct.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update product details" },
        { status: 500 }
      );
    }

    // If the product type needs to be updated, handle that separately
    if (body.type) {
      const { error: productUpdateError } = await supabase
        .from("products")
        .update({
          type: body.type,
          is_customizable: body.is_customizable,
        })
        .eq("id", body.product_id);

      if (productUpdateError) {
        return NextResponse.json(
          { error: "Failed to update product type" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: "Product details updated successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete product details
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // First, check if the product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from("product_details")
      .select("id")
      .eq("slug", slug)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product details
    const { error } = await supabase
      .from("product_details")
      .delete()
      .eq("id", existingProduct.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete product details" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product details deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

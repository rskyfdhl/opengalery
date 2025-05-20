// Types for product details
export interface ProductDetail {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  slug: string;
  created_at: string;
  image_url: string;
}

export interface Product {
  id: number;
  type: string;
  is_customizable: boolean;
  created_at: string;
}

export interface ProductDetailWithProduct extends ProductDetail {
  products: Product;
}

export interface ProductDetailFormData {
  name: string;
  price: number;
  quantity: number;
  description: string;
  type: string;
  is_customizable: boolean;
  image: File | null;
}

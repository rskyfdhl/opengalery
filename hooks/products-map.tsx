import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

type NavItem = {
  title: string;
  url: string;
};

type CategoryWithTemplates = {
  title: string;
  icon: string;
  url: string;
  items: NavItem[];
};

export function useTemplateCategories(): {
  templatesNav: CategoryWithTemplates[];
  loading: boolean;
} {
  const [templatesNav, setTemplatesNav] = useState<CategoryWithTemplates[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("products").select(`
            id,
            type,
            product_details (
              name,
              slug
            )
          `);

      if (error) {
        console.error("Error fetching categories with templates", error);
        return;
      }

      const nav = (data || []).map((product) => ({
        title: product.type,
        icon: "FileStack", // default icon, bisa diganti per tipe
        url: "#",
        items: (product.product_details || []).map((detail) => ({
          title: detail.name,
          url: `/dashboard/products/${detail.slug}`,
        })),
      }));

      setTemplatesNav(nav);
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  return { templatesNav, loading };
}

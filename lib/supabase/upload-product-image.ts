// src/lib/supabase/uploadProductImage.ts
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase/client";

export async function uploadProductImage(
  file: File,
  type: string
): Promise<string> {
  const bucket =
    type === "undangan" ? "template-invites" : "template-photostrips";
  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) {
    throw new Error("Gagal mengunggah gambar: " + error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

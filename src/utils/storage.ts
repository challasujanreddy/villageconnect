import { supabase } from '@/integrations/supabase/client';

export const uploadVillageImage = async (file: File, villageId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `villages/${villageId}/${fileName}`;

    console.log("Uploading:", { filePath, size: file.size }); // Debug

    // Upload with error handling
    const { error: uploadError } = await supabase.storage
      .from('village-images')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('village-images')
      .getPublicUrl(filePath);

    return { url: publicUrl.publicUrl, error: null };
  } catch (error) {
    console.error("Upload failed:", error);
    return { url: null, error: error instanceof Error ? error : new Error("Upload failed") };
  }
};

export const getVillageImageUrl = (imageUrl: string | null): string => {
  const defaultImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
  
  if (!imageUrl) {
    console.log("No image URL provided, using default");
    return defaultImage;
  }
  
  console.log("Returning image URL:", imageUrl);
  return imageUrl;
};

export const updateVillageImagePath = async (oldUrl: string, villageId: string): Promise<string> => {
  try {
    const oldPath = new URL(oldUrl).pathname.split('village-images/')[1];
    const fileName = oldPath.split('/').pop();
    const newPath = `villages/${villageId}/${fileName}`;

    const { data: copied, error: copyError } = await supabase.storage
      .from('village-images')
      .copy(oldPath, newPath);

    if (copyError) throw copyError;

    const { data: publicData } = supabase.storage
      .from('village-images')
      .getPublicUrl(newPath);

    if (!publicData?.publicUrl) throw new Error("Failed to get public URL");

    await supabase.storage
      .from('village-images')
      .remove([oldPath]);

    return publicData.publicUrl;
  } catch (error) {
    console.error("Error updating image path:", error);
    throw error;
  }
};
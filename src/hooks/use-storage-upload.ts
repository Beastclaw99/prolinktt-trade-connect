
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface UseStorageUploadOptions {
  bucket: string;
  folder?: string; 
  maxFileSize?: number; // In bytes, default to 5MB
  allowedMimeTypes?: string[];
}

interface UploadResult {
  path: string;
  fileUrl: string;
}

export function useStorageUpload(options: UseStorageUploadOptions) {
  const { bucket, folder = "", maxFileSize = 5 * 1024 * 1024, allowedMimeTypes } = options;
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File, customPath?: string): Promise<UploadResult | null> => {
    // Validate file size
    if (file.size > maxFileSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxFileSize / (1024 * 1024)}MB`,
        variant: "destructive",
      });
      return null;
    }

    // Validate file type if specified
    if (allowedMimeTypes && allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: `Allowed file types: ${allowedMimeTypes.join(", ")}`,
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsUploading(true);
      
      // Generate a unique file name to prevent collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      // Create file path
      let filePath;
      if (customPath) {
        filePath = `${customPath}/${fileName}`;
      } else if (folder) {
        filePath = `${folder}/${fileName}`;
      } else {
        filePath = fileName;
      }
      
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
      
      if (error) {
        console.error("Upload error:", error);
        throw new Error(error.message);
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      return {
        path: data.path,
        fileUrl: urlData.publicUrl,
      };
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Delete failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading
  };
}

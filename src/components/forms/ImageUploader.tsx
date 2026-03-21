"use client";

import React, { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { getUploadUrl } from "@/actions/UploadAction";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    try {
      // 1. Get presigned URL and Public URL from server
      const { uploadUrl, publicUrl } = await getUploadUrl(file.name, file.type);

      // 2. Upload directly to S3/Supabase via PUT
      const res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!res.ok) {
         throw new Error(`Failed to upload file: ${res.statusText}`);
      }

      return publicUrl;
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    setUploadError(null);
    const uploadedUrls: string[] = [...value];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      }
      onChange(uploadedUrls);
    } catch {
      setUploadError("Some uploads failed. Please verify your bucket is 'Public' on Supabase.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isUploading) return;
    handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isUploading
            ? "border-gray-200 bg-gray-50"
            : "border-gray-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100/80"
        }`}
        onClick={() => {
          if (!isUploading) document.getElementById("file-upload")?.click();
        }}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={onInputChange}
          disabled={isUploading}
        />
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-500 w-10 h-10 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="text-gray-400 w-12 h-12 mb-3" />
            <p className="text-sm font-medium text-gray-700">Drag & Drop OR Click to Upload</p>
            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPEG, WEBP</p>
          </div>
        )}
      </div>

      {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}

      {/* Thumbnails */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
          {value.map((url, index) => (
            url && (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200">
                <Image
                  src={url}
                  alt={`Product pic ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1 right-1 bg-black/50 hover:bg-black/80 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

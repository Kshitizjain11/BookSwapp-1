"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Plus, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  images: File[]
  setImages: (images: File[]) => void
}

export function ImageUpload({ images, setImages }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImages((prevImages) => [...prevImages, ...acceptedFiles])
    },
    [setImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: true,
  })

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors",
          "border-gray-300 text-gray-500 hover:border-amber-500 hover:text-amber-600",
          isDragActive && "border-amber-500 bg-amber-50 ring-2 ring-amber-200",
          "dark:border-gray-700 dark:text-gray-400 dark:hover:border-amber-400 dark:hover:text-amber-500 dark:bg-gray-800 dark:hover:bg-gray-700",
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-8 h-8 mb-2" />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag 'n' drop some images here, or click to select files</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">Max 5MB per image. JPG, PNG, GIF.</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-32 object-cover rounded-md border border-gray-200 dark:border-gray-700"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div
            className="w-full h-32 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md cursor-pointer text-gray-400 hover:border-amber-500 hover:text-amber-600 dark:border-gray-700 dark:hover:border-amber-400 dark:hover:text-amber-500"
            {...getRootProps()}
          >
            <Plus className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  )
}

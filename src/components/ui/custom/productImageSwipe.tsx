"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export interface ProductGalleryProps {
  images: ProductImage[];
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ProductGallery({
  images,
  className,
  aspectRatio = "video",
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ProductGalleryProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useState(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(nextImage, autoPlayInterval);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center bg-muted rounded-lg h-96">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  if (!isRendered) return;

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Main Image Display */}
      <div className="relative group">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300",
            aspectRatioClasses[aspectRatio]
          )}
        >
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-6">
          <div className="flex gap-3 justify-start overflow-x-auto pb-2 w-full ">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105",
                  index === currentIndex
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                )}
                aria-label={`View ${image.alt}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dots Indicator (Alternative to thumbnails) */}
      {!showThumbnails && images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

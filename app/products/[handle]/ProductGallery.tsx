"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square rounded-sm flex items-center justify-center bg-[#131319] border border-white/8">
        <span className="text-white/10 text-xs">{title}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image — height follows the image's natural proportions, no cropping */}
      <div className="relative w-full rounded-sm overflow-hidden group">
        <Image
          key={images[activeIndex].url}
          src={images[activeIndex].url}
          alt={images[activeIndex].altText ?? title}
          width={0}
          height={0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="w-full h-auto block transition-opacity duration-300"
          priority={activeIndex === 0}
        />

        {/* Prev / next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — natural proportions, small fixed width */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative flex-shrink-0 w-20 sm:w-24 rounded-sm overflow-hidden border transition-all ${
                i === activeIndex
                  ? "border-white/60 ring-1 ring-white/20"
                  : "border-white/8 hover:border-white/30"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                width={0}
                height={0}
                sizes="25vw"
                className="w-full h-auto block"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

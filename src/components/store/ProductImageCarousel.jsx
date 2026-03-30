import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductImageCarousel({ product }) {
  const images = [product.image_url, product.image_url_2, product.image_url_3].filter(Boolean);
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="relative w-full">
      {/* Main image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[20px] bg-[#FDFDF2] shadow-sm">
        <img
          src={images[current]}
          alt={`${product.name} - foto ${current + 1}`}
          className="w-full h-full object-cover object-top transition-opacity duration-300"
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ backgroundColor: 'rgba(255,250,240,0.85)' }}
            >
              <ChevronLeft size={16} color="#7A5A5A" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ backgroundColor: 'rgba(255,250,240,0.85)' }}
            >
              <ChevronRight size={16} color="#7A5A5A" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? 18 : 6,
                  height: 6,
                  backgroundColor: i === current ? '#D4A5A5' : 'rgba(255,250,240,0.7)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex-1 aspect-square overflow-hidden rounded-[10px] transition-all"
              style={{
                border: i === current ? '2px solid #D4A5A5' : '2px solid transparent',
                opacity: i === current ? 1 : 0.6,
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
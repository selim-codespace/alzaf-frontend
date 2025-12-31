'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Banner } from '../domain/banner.types';
import Link from 'next/link';
import Image from 'next/image';

interface BannerCarouselProps {
  banners: Banner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic with pause on interaction
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(goToNext, 6000); // Slightly slower for better readability
    return () => clearInterval(interval);
  }, [banners.length, isPaused, goToNext]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div
      className="relative w-full h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Featured Promotions"
    >
      {/* Background Image with optimized loading */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={currentBanner.image}
          alt=""
          fill
          priority={currentIndex === 0} // Prioritize first image
          className="object-cover opacity-90"
          sizes="100vw"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center">
        <div className="max-w-3xl space-y-4 md:space-y-6 animate-fade-in translate-y-4 opacity-0" key={currentBanner.id}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            {currentBanner.title}
          </h2>
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-xl md:max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-none">
            {currentBanner.subtitle}
          </p>
          <p className="text-gray-300 text-lg max-w-xl">
            {currentBanner.description}
          </p>

          <div className="pt-4">
            <Link
              href={currentBanner.link}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg transition-transform hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95"
            >
              {currentBanner.buttonText}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {banners.length > 1 && (
        <>
          {/* Arrow Buttons - visible on hover */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={goToPrev}
              className="p-3 rounded-full glass-panel text-white hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={goToNext}
              className="p-3 rounded-full glass-panel text-white hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

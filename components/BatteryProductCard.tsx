"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BatteryProduct, COMPANY_INFO } from "@/data/rayoData";
import { PRODUCT_CARD_CONTENT } from "@/data/siteContent";

interface BatteryProductCardProps {
  product: BatteryProduct;
  featured?: boolean;
}

export default function BatteryProductCard({
  product,
  featured = false,
}: BatteryProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const whatsappInquiryUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    `Hello RAYO Batteries, I would like to inquire about the "${product.name}" (${product.voltage}, ${product.capacity}). Please share pricing and compatibility details.`
  )}`;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div
      id={product.id}
      className={`rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden ${
        featured
          ? "border-lime-500/50 bg-stone-900/90 text-white shadow-xl rayo-glow"
          : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs hover:shadow-lg"
      }`}
    >
      {/* Top Media Gallery */}
      <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden group">
        <Image
          src={product.images[activeImageIndex]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Tag Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500 text-stone-950 text-[11px] font-black uppercase tracking-wider shadow-md backdrop-blur-xs">
            <Zap className="w-3 h-3 fill-stone-950" />
            <span>{product.tag}</span>
          </span>
        </div>

        {/* Warranty Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 text-lime-400 border border-lime-500/30 text-[10px] font-bold backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>{product.warranty}</span>
          </span>
        </div>

        {/* Carousel Controls (if multiple images) */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label={PRODUCT_CARD_CONTENT.ariaPrevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label={PRODUCT_CARD_CONTENT.ariaNextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Thumbnail dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "w-5 bg-lime-500"
                      : "w-1.5 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`${PRODUCT_CARD_CONTENT.ariaGoToSlidePrefix} ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-lime-600 dark:text-lime-400 block mb-0.5">
              {product.tagline}
            </span>
            <h3 className="text-xl font-black tracking-tight">{product.name}</h3>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Pill Strip */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                {PRODUCT_CARD_CONTENT.specsLabels.voltage}
              </span>
              <strong className="text-stone-900 dark:text-white font-bold">
                {product.voltage}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                {PRODUCT_CARD_CONTENT.specsLabels.capacity}
              </span>
              <strong className="text-stone-900 dark:text-white font-bold">
                {product.capacity}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                {PRODUCT_CARD_CONTENT.specsLabels.chemistry}
              </span>
              <strong className="text-stone-900 dark:text-white font-bold">
                {product.cellChemistry}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                {PRODUCT_CARD_CONTENT.specsLabels.connector}
              </span>
              <strong className="text-stone-900 dark:text-white font-bold truncate block">
                {product.connectorType}
              </strong>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1.5">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              {PRODUCT_CARD_CONTENT.highlightsHeading}
            </span>
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-stone-700 dark:text-stone-300 leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Suitable Vehicles */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1.5">
              {PRODUCT_CARD_CONTENT.idealVehiclesHeading}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.idealForVehicles.map((v, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-300 text-[10px] font-semibold border border-orange-200 dark:border-orange-800/60"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 rayo-glow"
          >
            <MessageCircle className="w-4 h-4 fill-stone-950" />
            <span>{PRODUCT_CARD_CONTENT.inquireWhatsApp}</span>
          </a>

          <Link
            href={`/contact-us?model=${encodeURIComponent(product.name)}`}
            className="w-full sm:w-auto py-3 px-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl border border-stone-300 dark:border-stone-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{PRODUCT_CARD_CONTENT.specsAndQuote}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

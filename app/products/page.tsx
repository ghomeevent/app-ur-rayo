import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  MessageCircle,
  Phone,
  Info,
} from "lucide-react";
import { COMPANY_INFO, RAYO_PRODUCTS } from "@/data/rayoData";
import { SITE_METADATA, PRODUCTS_PAGE_CONTENT } from "@/data/siteContent";
import ProductsFilterClient from "@/components/ProductsFilterClient";
import BatterySpecsTable from "@/components/BatterySpecsTable";

export const metadata: Metadata = SITE_METADATA.products;

export default function ProductsPage() {
  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO / Urban Ride, I would like to inquire about bulk battery specifications and pricing."
  )}`;

  return (
    <div className="space-y-14 py-8 sm:py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-stone-800">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{PRODUCTS_PAGE_CONTENT.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {PRODUCTS_PAGE_CONTENT.hero.title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-medium leading-relaxed">
              {PRODUCTS_PAGE_CONTENT.hero.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 rayo-glow"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>{PRODUCTS_PAGE_CONTENT.hero.ctaWhatsApp}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-stone-900 hover:bg-stone-800 text-white border border-stone-800 font-bold text-xs sm:text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>{PRODUCTS_PAGE_CONTENT.hero.ctaCallPrefix} {COMPANY_INFO.formattedPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Products Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 dark:text-white tracking-tight">
            {PRODUCTS_PAGE_CONTENT.showcase.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
            {PRODUCTS_PAGE_CONTENT.showcase.description}
          </p>
        </div>

        <ProductsFilterClient
          products={RAYO_PRODUCTS}
          filterTabs={PRODUCTS_PAGE_CONTENT.showcase.filterTabs}
        />
      </section>

      {/* Technical Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BatterySpecsTable />
      </section>

      {/* Product Display Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-400">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-stone-900 dark:text-white font-bold block">
              {PRODUCTS_PAGE_CONTENT.displayNotice.title}
            </strong>
            <p>
              {PRODUCTS_PAGE_CONTENT.displayNotice.description}{" "}
              <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-lime-700 dark:text-lime-400 hover:underline">
                {COMPANY_INFO.formattedPhone}
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
              {PRODUCTS_PAGE_CONTENT.bulkBanner.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              {PRODUCTS_PAGE_CONTENT.bulkBanner.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              {PRODUCTS_PAGE_CONTENT.bulkBanner.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 rayo-glow"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950" />
              <span>{PRODUCTS_PAGE_CONTENT.bulkBanner.ctaWhatsApp}</span>
            </a>
            <Link
              href="/contact-us"
              className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm transition-colors border border-stone-700"
            >
              {PRODUCTS_PAGE_CONTENT.bulkBanner.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

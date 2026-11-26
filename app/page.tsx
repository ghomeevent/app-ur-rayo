import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  BatteryCharging,
  Layers,
  Cpu,
} from "lucide-react";
import { COMPANY_INFO, RAYO_PRODUCTS } from "@/data/rayoData";
import { SITE_METADATA, HOME_CONTENT } from "@/data/siteContent";
import BatteryProductCard from "@/components/BatteryProductCard";
import WhyRayoSection from "@/components/WhyRayoSection";
import UrbanRidePosterSection from "@/components/UrbanRidePosterSection";

export const metadata: Metadata = SITE_METADATA.home;

export default function HomePage() {
  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO Batteries, I would like to inquire about RAYO EV Batteries (availability, specifications, and pricing)."
  )}`;

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case "BatteryCharging":
        return <BatteryCharging className="w-4 h-4 text-lime-600 dark:text-lime-400 flex-shrink-0" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-lime-600 dark:text-lime-400 flex-shrink-0" />;
      case "Zap":
      default:
        return <Zap className="w-4 h-4 text-lime-600 dark:text-lime-400 flex-shrink-0" />;
    }
  };

  const getValuePropIcon = (icon: string) => {
    switch (icon) {
      case "BatteryCharging":
        return <BatteryCharging className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5 fill-current" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "ShieldCheck":
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-stone-200 dark:border-stone-800/80">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-lime-500/10 dark:bg-lime-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Brand Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-900 dark:text-lime-300 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                <span>{HOME_CONTENT.hero.tagline}</span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-5xl lg:text-5.5xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.12]">
                  {HOME_CONTENT.hero.titlePrefix}{" "}
                  <span className="bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
                    {HOME_CONTENT.hero.titleHighlight}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {HOME_CONTENT.hero.description}
              </p>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {HOME_CONTENT.hero.badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs"
                  >
                    {getBadgeIcon(b.icon)}
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Primary Call-To-Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-sm rounded-xl shadow-md transition-all active:scale-95 rayo-glow"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950" />
                  <span>{HOME_CONTENT.hero.ctaWhatsApp}</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-white font-bold text-sm rounded-xl border border-stone-300 dark:border-stone-800 transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                  <span>{HOME_CONTENT.hero.ctaCallPrefix} {COMPANY_INFO.formattedPhone}</span>
                </a>

                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-lime-700 dark:text-lime-400 hover:text-lime-800 font-bold text-sm transition-colors"
                >
                  <span>{HOME_CONTENT.hero.ctaExplore}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{HOME_CONTENT.hero.trustSubtext}</span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-lime-500/30 dark:border-stone-700 shadow-2xl bg-stone-950 rayo-glow">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="/images/products/rayo-60v-battery.jpg"
                    alt={RAYO_PRODUCTS[0]?.name || "RAYO Battery"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                </div>

                {/* Specs Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-stone-800 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-lime-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 fill-lime-400" />
                      {RAYO_PRODUCTS[0]?.name}
                    </span>
                    <span className="bg-lime-500/20 text-lime-300 font-bold px-2.5 py-0.5 rounded-full border border-lime-500/30 text-[10px]">
                      {HOME_CONTENT.hero.cardBadge}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-stone-800 text-stone-300">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{HOME_CONTENT.hero.cardConnectorLabel}</span>
                      <strong className="text-white">{HOME_CONTENT.hero.cardConnectorValue}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{HOME_CONTENT.hero.cardUseLabel}</span>
                      <strong className="text-white">{HOME_CONTENT.hero.cardUseValue}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOME_CONTENT.valueProps.map((vp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center">
                {getValuePropIcon(vp.icon)}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-sm">
                {vp.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {vp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BATTERY & CHARGER PRODUCT SHOWCASE */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-900 dark:text-lime-300 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{HOME_CONTENT.showcaseHeader.badge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
            {HOME_CONTENT.showcaseHeader.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            {HOME_CONTENT.showcaseHeader.description}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RAYO_PRODUCTS.slice(0, 3).map((prod) => (
            <BatteryProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Dedicated Fast Charger Spotlight */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950">
              <Image
                src="/images/products/rayo-fast-charger.jpg"
                alt="RAYO Multi-Voltage Fast Charger"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-lime-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                {HOME_CONTENT.chargerSpotlight.coolingFanBadge}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>{HOME_CONTENT.chargerSpotlight.badge}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                {HOME_CONTENT.chargerSpotlight.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {HOME_CONTENT.chargerSpotlight.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                {HOME_CONTENT.chargerSpotlight.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl bg-stone-900 border border-stone-800 ${
                      idx === 2 ? "col-span-2 sm:col-span-1" : ""
                    }`}
                  >
                    <span className="text-stone-400 block text-[10px]">{spec.label}</span>
                    <strong className={`${spec.color} font-bold`}>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
                    "Hello RAYO, I would like to inquire about the RAYO Multi-Voltage Charger."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2 rayo-glow"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950" />
                  <span>{HOME_CONTENT.chargerSpotlight.ctaWhatsApp}</span>
                </a>
                <Link
                  href="/products#rayo-smart-charger"
                  className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm transition-colors border border-stone-700"
                >
                  {HOME_CONTENT.chargerSpotlight.ctaDetails}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT RANGE SUMMARY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {HOME_CONTENT.rangeSummary.items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className={`block font-black text-xl sm:text-2xl ${item.highlightColor}`}>
                  {item.voltage}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY RAYO & ENGINEERING ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyRayoSection />
      </section>

      {/* 6. DEDICATED URBAN RIDE POSTER SECTION IN BOTTOM AREA */}
      <UrbanRidePosterSection />

      {/* 7. BOTTOM CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-lime-500/40 rayo-glow-lg">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-lime-400">
              {HOME_CONTENT.bottomCta.badge}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight">
              {HOME_CONTENT.bottomCta.title}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {HOME_CONTENT.bottomCta.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-sm rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>{HOME_CONTENT.bottomCta.ctaWhatsAppPrefix} {COMPANY_INFO.formattedPhone}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>{HOME_CONTENT.bottomCta.ctaCall}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

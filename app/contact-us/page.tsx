import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { SITE_METADATA, CONTACT_PAGE_CONTENT } from "@/data/siteContent";
import CompanyLocationsSection from "@/components/CompanyLocationsSection";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = SITE_METADATA.contact;

export default function ContactUsPage() {
  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO Batteries by Urban Ride, I would like to contact your sales and engineering desk."
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-900 dark:text-lime-300 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{CONTACT_PAGE_CONTENT.header.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          {CONTACT_PAGE_CONTENT.header.title}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          {CONTACT_PAGE_CONTENT.header.description}
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-7 sm:p-8 rounded-3xl border border-stone-800 space-y-6 shadow-md">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-lime-400 block mb-1">
                {CONTACT_PAGE_CONTENT.leftCard.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {CONTACT_PAGE_CONTENT.leftCard.title}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {CONTACT_PAGE_CONTENT.leftCard.division}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 border-t border-stone-800 pt-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">
                      {CONTACT_PAGE_CONTENT.leftCard.hyderabadTitle}
                    </strong>
                    <span className="text-stone-300 block">
                      H.No. 4-163, Road No. 7, RTC Colony, Chengicherla, Hyderabad, Telangana – 500092
                    </span>
                    <a
                      href="https://maps.app.goo.gl/uN7SUqCtd2dkZ9968"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-lime-400 hover:underline inline-flex items-center gap-1 mt-1 font-bold"
                    >
                      <span>{CONTACT_PAGE_CONTENT.leftCard.getDirectionsText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-stone-800">
                  <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">
                      {CONTACT_PAGE_CONTENT.leftCard.karimnagarTitle}
                    </strong>
                    <span className="text-stone-300 block">
                      Urban Ride Green Motors, Dairy Complex, Padmanagar, Ramnagar, Karimnagar, Telangana – 505001
                    </span>
                    <a
                      href="https://www.google.com/maps/place/Urban+Ride+Green+Motors/@18.4407447,79.105428,17z/data=!3m1!4b1!4m6!3m5!1s0x3bccdf3e36be2e15:0xd64dd3a1d86ca07e!8m2!3d18.4407447!4d79.105428!16s%2Fg%2F11nth474vw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-lime-400 hover:underline inline-flex items-center gap-1 mt-1 font-bold"
                    >
                      <span>{CONTACT_PAGE_CONTENT.leftCard.getDirectionsText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    {CONTACT_PAGE_CONTENT.leftCard.phoneTitle}
                  </strong>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-lime-300 block font-bold text-white text-base">
                    {COMPANY_INFO.formattedPhone}
                  </a>
                  <span className="text-[11px] text-stone-400 block">
                    {CONTACT_PAGE_CONTENT.leftCard.phoneSubtext}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    {CONTACT_PAGE_CONTENT.leftCard.emailTitle}
                  </strong>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-lime-300 text-stone-300">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    {CONTACT_PAGE_CONTENT.leftCard.hoursTitle}
                  </strong>
                  <span>{COMPANY_INFO.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>{CONTACT_PAGE_CONTENT.leftCard.ctaWhatsApp}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>{CONTACT_PAGE_CONTENT.leftCard.ctaCall}</span>
              </a>
            </div>
          </div>

          {/* Genuine Product Photo Card */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 p-4 space-y-3">
            <div className="relative h-44 w-full rounded-xl overflow-hidden">
              <Image
                src="/images/products/rayo-60v-battery.jpg"
                alt="RAYO Battery Metal Enclosure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-lime-400 block tracking-wider">
                {CONTACT_PAGE_CONTENT.photoCard.badge}
              </span>
              <p className="text-[11px] text-stone-400 leading-snug">
                {CONTACT_PAGE_CONTENT.photoCard.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-8 text-center text-stone-400">Loading inquiry form...</div>}>
            <ContactFormClient />
          </Suspense>
        </div>
      </div>

      {/* Facilities & Interactive Google Maps */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
        <CompanyLocationsSection />
      </div>
    </div>
  );
}

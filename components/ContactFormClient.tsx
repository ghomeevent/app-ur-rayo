"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { CONTACT_PAGE_CONTENT } from "@/data/siteContent";

export default function ContactFormClient() {
  const content = CONTACT_PAGE_CONTENT.form;
  const searchParams = useSearchParams();
  const initialModel = searchParams?.get("model") || searchParams?.get("product") || "";
  const initialVehicle = searchParams?.get("vehicle") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    vehicleType: initialVehicle || content.vehicleOptions[0],
    batteryModel: initialModel || content.batteryOptions[0],
    purpose: content.purposeOptions[0],
    quantity: content.quantityOptions[0].value,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const isPincodeValid =
    formData.pincode.trim().length === 6 && /^\d{6}$/.test(formData.pincode.trim());

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = content.validationErrors.nameRequired;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10 || !/^\d{10,}$/.test(cleanPhone)) {
      newErrors.phone = content.validationErrors.phoneInvalid;
    }

    if (!isPincodeValid) {
      newErrors.pincode = content.validationErrors.pincodeInvalid;
    }

    if (!formData.city.trim()) {
      newErrors.city = content.validationErrors.cityRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    let msg = `*⚡ New RAYO EV Battery Inquiry - Urban Ride Green Motors*\n`;
    if (formData.name) msg += `*Name:* ${formData.name}\n`;
    if (formData.phone) msg += `*Phone:* ${formData.phone}\n`;
    if (formData.pincode) msg += `*Pincode:* ${formData.pincode}\n`;
    if (formData.city) msg += `*City/State:* ${formData.city}\n`;
    if (formData.vehicleType) msg += `*Vehicle Type:* ${formData.vehicleType}\n`;
    if (formData.batteryModel) msg += `*Battery / Charger:* ${formData.batteryModel}\n`;
    if (formData.purpose) msg += `*Inquiry Type:* ${formData.purpose}\n`;
    if (formData.quantity) msg += `*Estimated Quantity:* ${formData.quantity}\n`;
    if (formData.message) msg += `*Notes:* ${formData.message}\n`;
    return msg.trim();
  };

  const whatsappInquiryUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.open(whatsappInquiryUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs transition-colors duration-200">
      {submitted ? (
        <div className="py-8 text-center space-y-4" role="status" aria-live="polite">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            {content.successTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
            {content.successDescription}
          </p>
          <div className="pt-2">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs rounded-xl shadow-md rayo-glow"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950" />
              <span>{content.openWhatsAppButton}</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-stone-500 dark:text-stone-400 hover:underline block mx-auto pt-4 cursor-pointer"
          >
            {content.resetButton}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
              {content.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="inquiry-name" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.nameLabel}
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                placeholder={content.namePlaceholder}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-stone-300 dark:border-stone-700 focus:ring-lime-500"
                } bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 outline-hidden`}
              />
              {errors.name && (
                <p id="name-error" className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="inquiry-phone" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.phoneLabel}
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                placeholder={content.phonePlaceholder}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-stone-300 dark:border-stone-700 focus:ring-lime-500"
                } bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 outline-hidden`}
              />
              {errors.phone && (
                <p id="phone-error" className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="inquiry-pincode" className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>{content.pincodeLabel}</span>
                {isPincodeValid && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{content.pincodeValidBadge}</span>
                  </span>
                )}
              </label>
              <input
                id="inquiry-pincode"
                name="pincode"
                type="text"
                required
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => {
                  setFormData({ ...formData, pincode: e.target.value });
                  if (errors.pincode) setErrors({ ...errors, pincode: "" });
                }}
                placeholder={content.pincodePlaceholder}
                aria-invalid={!!errors.pincode}
                aria-describedby={errors.pincode ? "pincode-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.pincode
                    ? "border-red-500 focus:ring-red-500"
                    : "border-stone-300 dark:border-stone-700 focus:ring-lime-500"
                } bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 outline-hidden`}
              />
              {errors.pincode && (
                <p id="pincode-error" className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.pincode}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="inquiry-city" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.cityLabel}
              </label>
              <input
                id="inquiry-city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: "" });
                }}
                placeholder={content.cityPlaceholder}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.city
                    ? "border-red-500 focus:ring-red-500"
                    : "border-stone-300 dark:border-stone-700 focus:ring-lime-500"
                } bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 outline-hidden`}
              />
              {errors.city && (
                <p id="city-error" className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.city}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="inquiry-vehicle" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.vehicleTypeLabel}
              </label>
              <select
                id="inquiry-vehicle"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 outline-hidden"
              >
                {content.vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="inquiry-battery" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.batteryModelLabel}
              </label>
              <select
                id="inquiry-battery"
                name="batteryModel"
                value={formData.batteryModel}
                onChange={(e) => setFormData({ ...formData, batteryModel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 outline-hidden"
              >
                {content.batteryOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="inquiry-purpose" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.purposeLabel}
              </label>
              <select
                id="inquiry-purpose"
                name="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 outline-hidden"
              >
                {content.purposeOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="inquiry-quantity" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {content.quantityLabel}
              </label>
              <select
                id="inquiry-quantity"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 outline-hidden"
              >
                {content.quantityOptions.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="inquiry-message" className="text-xs font-bold text-stone-700 dark:text-stone-300">
              {content.messageLabel}
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={content.messagePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 rayo-glow"
          >
            <MessageCircle className="w-4 h-4 fill-stone-950" />
            <span>{content.submitButton}</span>
          </button>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center leading-relaxed pt-1">
            {content.displayNotice}{" "}
            <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-stone-800 dark:text-stone-200 underline">
              {COMPANY_INFO.formattedPhone}
            </a>.
          </p>
        </form>
      )}
    </div>
  );
}

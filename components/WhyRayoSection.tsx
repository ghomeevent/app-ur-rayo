import React from "react";
import {
  ShieldCheck,
  Zap,
  BatteryCharging,
  Cpu,
  Layers,
  Thermometer,
  Award,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { WHY_RAYO_CONTENT } from "@/data/siteContent";

export default function WhyRayoSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-lime-400" />;
      case "Thermometer":
        return <Thermometer className="w-5 h-5 text-lime-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-lime-400" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-5 h-5 text-lime-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-lime-400" />;
      case "Award":
      default:
        return <Award className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <section className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl relative overflow-hidden">
      {/* Background radial energy aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{WHY_RAYO_CONTENT.badge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-white">
            {WHY_RAYO_CONTENT.title}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {WHY_RAYO_CONTENT.description}
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_RAYO_CONTENT.pillars.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800/90 space-y-3 hover:border-lime-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center">
                {getIcon(p.icon)}
              </div>
              <h3 className="font-bold text-base text-white">{p.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Certifications & Trust Badges */}
        <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            {WHY_RAYO_CONTENT.trustPills.map((pill, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-stone-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                {pill}
              </span>
            ))}
          </div>

          <div className="text-lime-400 font-bold">
            By Urban Ride Green Motors • {COMPANY_INFO.slogan}
          </div>
        </div>
      </div>
    </section>
  );
}

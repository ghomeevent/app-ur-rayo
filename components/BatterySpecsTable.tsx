"use client";

import React from "react";
import { Printer } from "lucide-react";
import { SPECS_TABLE_CONTENT } from "@/data/siteContent";

export default function BatterySpecsTable() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-lime-600 dark:text-lime-400 block">
            {SPECS_TABLE_CONTENT.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
            {SPECS_TABLE_CONTENT.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {SPECS_TABLE_CONTENT.description}
          </p>
        </div>

        {/* Print / Datasheet Action */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer"
            title={SPECS_TABLE_CONTENT.printButtonText}
          >
            <Printer className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>{SPECS_TABLE_CONTENT.printButtonText}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-bold uppercase text-[11px]">
              {SPECS_TABLE_CONTENT.columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 ${
                    col.key === "param"
                      ? ""
                      : col.key === "charger"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-lime-600 dark:text-lime-400"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-700 dark:text-stone-300">
            {SPECS_TABLE_CONTENT.rows.map((row, idx) => (
              <tr key={idx}>
                <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white">
                  {row.parameter}
                </td>
                <td className="py-3.5 px-4 font-semibold text-lime-600 dark:text-lime-400">
                  {row.rayo60}
                </td>
                <td className="py-3.5 px-4">{row.rayo48}</td>
                <td className="py-3.5 px-4">{row.rayo72}</td>
                <td className="py-3.5 px-4 text-emerald-500 font-semibold">
                  {row.charger}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { BatteryProduct } from "@/data/rayoData";
import { FilterTabOption } from "@/data/siteContent";
import BatteryProductCard from "@/components/BatteryProductCard";

interface ProductsFilterClientProps {
  products: BatteryProduct[];
  filterTabs: FilterTabOption[];
}

export default function ProductsFilterClient({
  products,
  filterTabs,
}: ProductsFilterClientProps) {
  const [filter, setFilter] = useState<"all" | "battery" | "charger">("all");

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex justify-center sm:justify-end">
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="flex items-center gap-1.5 p-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
        >
          {filterTabs.map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-lime-500 text-stone-950 font-black shadow-xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <BatteryProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

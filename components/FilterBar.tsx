"use client";

import { FilterState } from "../lib/types";
import { MODE_META, PRICING_OPTIONS, CATEGORIES, CATEGORY_META } from "../lib/constants";

interface Props {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  return (
    <div className="border-4 border-black bg-neo-white shadow-neo p-4 mb-6 flex flex-wrap gap-3 items-end">
      {/* Mode */}
      <div className="flex items-center gap-1">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">Mode</span>
        {(["Kerala Offline", "Pan-India Online", "Premier National Offline", "all"] as const).map((m) => (
          <button
            key={m}
            onClick={() => onChange({ mode: m === "all" ? "all" : m })}
            className={`border-2 border-black px-2 py-1 font-mono text-xs uppercase font-bold shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${
              filters.mode === m || (m === "all" && filters.mode === "all")
                ? "bg-neo-black text-neo-white"
                : "bg-neo-yellow hover:bg-neo-tangerine"
            }`}
          >
            {m === "all" ? "ALL" : MODE_META[m as "Kerala Offline" | "Pan-India Online" | "Premier National Offline"]?.label.slice(0, 8)}
          </button>
        ))}
      </div>

      {/* Pricing */}
      <div className="flex gap-1">
        {PRICING_OPTIONS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange({ pricing: p.id })}
            className={`border-2 border-black px-2 py-1 font-mono text-xs uppercase font-bold shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
              filters.pricing === p.id ? "bg-neo-black text-neo-white" : "bg-neo-mint hover:bg-neo-azure"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Cert */}
      <button
        onClick={() => onChange({ certificate: !filters.certificate })}
        className={`border-2 border-black px-2 py-1 font-mono text-xs uppercase font-bold shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
          filters.certificate ? "bg-neo-coral text-neo-white" : "bg-neo-lavender hover:bg-neo-coral"
        }`}
      >
        {filters.certificate ? "CERT INCLUDED" : "CERT ONLY"}
      </button>

      {/* Verified */}
      <button
        onClick={() => onChange({ verifiedOnly: !filters.verifiedOnly })}
        className={`border-2 border-black px-2 py-1 font-mono text-xs uppercase font-bold shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
          filters.verifiedOnly ? "bg-neo-black text-neo-white" : "bg-neo-tangerine hover:bg-neo-yellow"
        }`}
      >
        {filters.verifiedOnly ? "VERIFIED ONLY" : "VERIFIED"}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Search…"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className="border-2 border-black bg-neo-white px-3 py-1 font-mono text-xs shadow-neo focus:outline-none focus:shadow-neo-lg focus:ring-0 w-48"
      />

      {/* Category pills */}
      <div className="flex gap-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => {
              const next = filters.categories.includes(c)
                ? filters.categories.filter((x) => x !== c)
                : [...filters.categories, c];
              onChange({ categories: next });
            }}
            className={`border-2 border-black px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold shadow-neo active:shadow-none ${
              filters.categories.includes(c)
                ? `${CATEGORY_META[c].color} text-neo-black`
                : "bg-neo-white hover:bg-neo-mint"
            }`}
          >
            {CATEGORY_META[c].emoji} {c}
          </button>
        ))}
      </div>
    </div>
  );
}

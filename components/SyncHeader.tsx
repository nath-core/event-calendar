"use client";

import { useState, useMemo } from "react";
import { PlatformStats } from "../lib/types";

export default function SyncHeader({ stats, onSync }: { stats: PlatformStats; onSync: () => void }) {
  const [spinning, setSpinning] = useState(false);

  const handleSync = () => {
    setSpinning(true);
    onSync();
    setTimeout(() => setSpinning(false), 1500);
  };

  return (
    <div className="border-4 border-black bg-neo-white shadow-neo p-4 mb-6 flex flex-wrap items-center gap-6">
      <div className="flex-1 min-w-[240px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-neo-black text-neo-white font-mono text-[10px] font-extrabold px-1.5 py-0.5 uppercase">Last Synced</span>
          <span className="font-mono text-xs font-bold">{stats.lastSyncedAt}</span>
        </div>
        <div className="font-mono text-xs text-neo-black/70">⚡ Daily at 12:00 AM IST (Today @ 12:00 AM)</div>
      </div>

      <button
        onClick={handleSync}
        className="border-2 border-black bg-neo-black text-neo-white px-4 py-2 font-mono text-xs font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:translate-y-[-1px] active:shadow-none active:translate-y-[2px] transition-all flex items-center gap-2"
      >
        <span className={`${spinning ? "animate-spinSlow" : ""}`}>↻</span>
        FORCE SYNC
      </button>

      <div className="flex gap-2">
        <div className="border-2 border-black px-3 py-2 bg-neo-yellow text-neo-black font-mono text-xs font-extrabold shadow-neo">
          TOTAL: {stats.totalEvents}
        </div>
        <div className="border-2 border-black px-3 py-2 bg-neo-mint text-neo-black font-mono text-xs font-extrabold shadow-neo">
          FREE: {stats.freeEvents}
        </div>
        <div className="border-2 border-black px-3 py-2 bg-neo-azure text-neo-black font-mono text-xs font-extrabold shadow-neo">
          KERALA: {stats.keralaOfflineEvents}
        </div>
        <div className="border-2 border-black px-3 py-2 bg-neo-coral text-neo-black font-mono text-xs font-extrabold shadow-neo">
          VERIFIED CERTS: {stats.verifiedCertificates}
        </div>
      </div>
    </div>
  );
}

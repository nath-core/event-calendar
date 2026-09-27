"use client";

import { useState } from "react";
import { SourceType } from "../lib/types";
import { SOURCE_TYPES } from "../lib/constants";

export default function AddSourceDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState<SourceType>("WhatsApp Channel");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neo-black/80 flex items-end justify-end" onClick={onClose}>
      <div
        className="border-4 border-black bg-neo-white shadow-neo-xl w-full max-w-md h-[80vh] p-5 overflow-y-auto animate-drawerIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-black text-neo-black uppercase">INJECT SOURCE</h2>
          <button onClick={onClose} className="border-2 border-black bg-neo-black text-neo-white px-2 font-mono text-xs font-extrabold hover:bg-neo-coral">✕</button>
        </div>

        {submitted ? (
          <div className="bg-neo-mint border-2 border-black p-4 text-center">
            <h3 className="font-display text-xl font-black mb-2">SUBMITTED</h3>
            <p className="font-mono text-xs">Status: <span className="font-extrabold">PENDING SCRAPE VERIFICATION</span></p>
            <p className="font-mono text-[10px] text-neo-black/60 mt-2">Our parser will attempt regex extraction. You’ll be notified when it clears.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-3 font-mono text-xs"
          >
            <div>
              <label className="block font-extrabold uppercase mb-1">Source Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as SourceType)} className="w-full border-2 border-black bg-neo-white px-2 py-1 font-mono text-xs shadow-neo focus:outline-none focus:shadow-neo-lg">
                {SOURCE_TYPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-extrabold uppercase mb-1">Event URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full border-2 border-black bg-neo-white px-2 py-1 font-mono text-xs shadow-neo focus:outline-none focus:shadow-neo-lg" required />
            </div>
            <div>
              <label className="block font-extrabold uppercase mb-1">Event Title (if known)</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border-2 border-black bg-neo-white px-2 py-1 font-mono text-xs shadow-neo" />
            </div>
            <div>
              <label className="block font-extrabold uppercase mb-1">Raw Text / Brochure Paste</label>
              <textarea rows={4} value={raw} onChange={e => setRaw(e.target.value)} placeholder="Paste event details, flyer text, or WhatsApp message..." className="w-full border-2 border-black bg-neo-white px-2 py-1 font-mono text-xs shadow-neo focus:outline-none focus:shadow-neo-lg" />
            </div>
            <button type="submit" className="w-full border-2 border-black bg-neo-black text-neo-white py-2 font-mono text-xs font-extrabold uppercase shadow-neo hover:shadow-neo-lg active:shadow-none active:translate-y-[2px] transition-all">SUBMIT TO QUEUE →</button>
          </form>
        )}
      </div>
    </div>
  );
}

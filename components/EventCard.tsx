"use client";

import { useState } from "react";
import { Event, FilterState } from "../lib/types";
import { CATEGORY_META } from "../lib/constants";
import LinkedInModal from "./LinkedInModal";

interface Props {
  event: Event;
  selected?: boolean;
  onSelect: (e: Event) => void;
}

export default function EventCard({ event, selected, onSelect }: Props) {
  const [showLinkedIn, setShowLinkedIn] = useState(false);

  return (
    <>
      <article
        onClick={() => onSelect(event)}
        className={`border-4 border-black bg-neo-white p-4 shadow-neo cursor-pointer hover:shadow-neo-lg transition-all duration-75 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
          selected ? "ring-4 ring-neo-coral" : ""
        }`}
      >
        {/* Header row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${CATEGORY_META[event.category]?.color || "bg-neo-azure"} text-neo-black`}>
            {CATEGORY_META[event.category]?.emoji} {event.category}
          </span>
          <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${event.legitimacy === "verified" ? "bg-neo-mint text-neo-black" : event.legitimacy === "flagged" ? "bg-neo-coral text-neo-white" : "bg-neo-tangerine text-neo-black"}`}>
            {event.legitimacy === "verified" ? "🛡️ VERIFIED ORG" : event.legitimacy === "flagged" ? "⚠️ FLAGGED" : "⚠️ COMMUNITY SUBMITTED"}
          </span>
          <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${event.price === 0 ? "bg-neo-yellow text-neo-black" : "bg-neo-coral text-neo-white"}`}>
            {event.price === 0 ? "🟢 FREE" : `🏷️ ${event.priceLabel || "PAID"}`}
          </span>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-black text-neo-black uppercase mb-2 leading-tight tracking-tight">
          {event.title}
        </h3>

        <p className="font-mono text-xs text-neo-black/80 mb-3 leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-neo-black mb-3">
          <div className="border-2 border-black px-2 py-1 bg-neo-white">
            <span className="font-extrabold uppercase">Date</span>
            <br />
            {event.startDate}
          </div>
          <div className="border-2 border-black px-2 py-1 bg-neo-white">
            <span className="font-extrabold uppercase">Time</span>
            <br />
            {event.startTime} IST
          </div>
          <div className="border-2 border-black px-2 py-1 bg-neo-white">
            <span className="font-extrabold uppercase">Venue</span>
            <br />
            {event.venue}
          </div>
          <div className="border-2 border-black px-2 py-1 bg-neo-white">
            <span className="font-extrabold uppercase">Organizer</span>
            <br />
            {event.organizer}
          </div>
        </div>

        {/* Tags & Skills */}
        <div className="flex gap-1 flex-wrap mb-3">
          {event.tags.map((tag) => (
            <span key={tag} className="border border-black px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold bg-neo-white text-neo-black">{tag}</span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap mb-4">
          {event.skillsAcquired.map((s) => (
            <span key={s} className="border border-black px-1.5 py-0.5 text-[9px] font-mono font-bold bg-neo-azure/20 text-neo-black">+ {s}</span>
          ))}
        </div>

        {/* Certificate / Prize */}
        <div className="flex gap-2 mb-3 text-[10px] font-mono font-extrabold uppercase">
          {event.certificate.provided && (
            <span className="bg-neo-mint text-neo-black px-2 py-0.5 border-2 border-black">📜 CERT INCLUDED</span>
          )}
          {event.cashPrize && (
            <span className="bg-neo-tangerine text-neo-black px-2 py-0.5 border-2 border-black">🏆 {event.cashPrize}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-black bg-neo-black text-neo-white px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all inline-block"
          >
            REGISTER NOW →
          </a>
          <a
            href={event.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-black bg-neo-azure text-neo-black px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all inline-block"
          >
            📅 ADD TO CALENDAR
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); setShowLinkedIn(true); }}
            className="border-2 border-black bg-neo-coral text-neo-black px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all"
          >
            💼 BRAG ON LINKEDIN
          </button>
        </div>
      </article>

      <LinkedInModal
        event={event}
        open={showLinkedIn}
        onClose={() => setShowLinkedIn(false)}
      />
    </>
  );
}

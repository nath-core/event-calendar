"use client";

import { Event } from "../lib/types";

interface Props {
  event: Event;
  open: boolean;
  onClose: () => void;
}

export default function LinkedInModal({ event, open, onClose }: Props) {
  if (!open) return null;

  const postText = `Just registered for ${event.title} hosted by ${event.organizer}! 🚀\n\n${event.category.toUpperCase()} • ${event.mode}\n${event.startDate} at ${event.startTime} IST\n\nTopics / Skills I\'m diving into:\n${event.skillsAcquired.map((s) => `• ${s}`).join("\n")}\n\nGreat opportunity to upskill, connect with peers, and earn a verifiable certificate for LinkedIn.\n\n#BTechCSE #KeralaTech #${event.category.replace(" ", "")} #Hackathon #OpenSource #DeveloperCommunity #Upskilling #EngineeringLife\n\nRegister: ${event.registrationUrl}`;

  return (
    <div className="fixed inset-0 z-50 bg-neo-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="border-4 border-black bg-neo-white shadow-neo-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 border-2 border-black bg-neo-black text-neo-white px-2 py-0.5 font-mono text-xs font-extrabold hover:bg-neo-coral hover:text-neo-black transition-colors"
        >
          ✕
        </button>

        <h2 className="font-display text-2xl font-black text-neo-black uppercase mb-1 tracking-tight">
          BRAG ON LINKEDIN
        </h2>
        <p className="font-mono text-[10px] text-neo-black/60 mb-4 uppercase font-bold">Post generator for B.Tech CSE students</p>

        <div className="bg-neo-yellow/20 border-2 border-black p-3 mb-4">
          <textarea
            readOnly
            rows={10}
            value={postText}
            className="w-full bg-transparent font-mono text-xs text-neo-black resize-none focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(postText);
            alert("Copied to clipboard! Paste it into your LinkedIn post.");
          }}
          className="w-full border-2 border-black bg-neo-black text-neo-white px-4 py-2 font-mono text-xs font-extrabold uppercase shadow-neo hover:shadow-neo-lg active:shadow-none active:translate-y-[2px] transition-all"
        >
          📋 COPY TO CLIPBOARD
        </button>
      </div>
    </div>
  );
}

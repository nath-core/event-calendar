"use client";

import { useEffect, useState, useMemo } from "react";
import { Event, FilterState, SourceSubmission } from "../lib/types";
import { CATEGORY_META } from "../lib/constants";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import { SAMPLE_EVENTS } from "../lib/sampleEvents";
import FilterBar from "../components/FilterBar";
import EventCard from "../components/EventCard";
import LinkedInModal from "../components/LinkedInModal";
import AddSourceDrawer from "../components/AddSourceDrawer";
import NeoCalendar from "../components/NeoCalendar";
import SyncHeader from "../components/SyncHeader";

export default function Home() {
  // State
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [filters, setFilters] = useState<FilterState>({
    mode: "Kerala Offline",
    pricing: "free",
    certificate: false,
    verifiedOnly: false,
    categories: [],
    search: "",
    date: null,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [addSourceOpen, setAddSourceOpen] = useState(false);
  const [sourceSubmissionOpen, setSourceSubmissionOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    freeEvents: 0,
    keralaOfflineEvents: 0,
    verifiedCertificates: 0,
    lastSyncedAt: "Never",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Supabase client (may be null)
  const supabase = getSupabase();

  // Fetch events from Supabase or fallback to sample data
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        if (supabase && isSupabaseConfigured()) {
          // Try to fetch from Supabase
          const { data, error } = await supabase.from("events").select("*");
          if (error) throw error;
          if (data && data.length > 0) {
            // Transform DB rows to Event type
            const transformed = data.map((row) => ({
              ...row,
              certificate: JSON.parse(row.certificate || '{"provided":false}'),
              tags: row.tags ? JSON.parse(row.tags) : [],
              skillsAcquired: row.skillsAcquired
                ? JSON.parse(row.skillsAcquired)
                : [],
            }));
            setEvents(transformed as Event[]);
            updateStats(transformed as Event[]);
          } else {
            // No data in DB, use sample
            setEvents(SAMPLE_EVENTS);
            updateStats(SAMPLE_EVENTS);
          }
        } else {
          // Supabase not configured, use sample data
          setEvents(SAMPLE_EVENTS);
          updateStats(SAMPLE_EVENTS);
        }
      } catch (err) {
        console.error("[Home] fetch error:", err);
        // Fallback to sample data on any error
        setEvents(SAMPLE_EVENTS);
        updateStats(SAMPLE_EVENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();

    // Also set up a real-time subscription if Supabase is available
    if (supabase && isSupabaseConfigured()) {
      const subscription = supabase
        .channel("events-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "events" },
          () => {
            fetchEvents(); // Refetch on any change
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [supabase, isSupabaseConfigured]);

  // Update statistics based on current events
  const updateStats = (eventList: Event[]) => {
    const total = eventList.length;
    const free = eventList.filter((e) => e.price === 0).length;
    const kerala = eventList.filter(
      (e) => e.mode === "Kerala Offline"
    ).length;
    const verifiedCerts = eventList.filter(
      (e) => e.certificate.provided && e.legitimacy === "verified"
    ).length;

    // Determine last synced timestamp
    const latestSync = eventList
      .map((e) => e.syncedAt)
      .filter(Boolean)
      .sort()
      .pop() || "Never";

    setStats({
      total,
      free,
      kerala,
      verifiedCerts,
      lastSyncedAt:
        latestSync === "Never"
          ? "Never"
          : new Date(latestSync).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
            }),
    });
  };

  // Filter events based on current filter state
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Mode filter
      if (filters.mode !== "all" && event.mode !== filters.mode) return false;

      // Pricing filter
      if (filters.pricing === "free" && event.price > 0) return false;
      if (filters.pricing === "paid" && event.price === 0) return false;

      // Certificate filter
      if (filters.certificate && !event.certificate.provided) return false;

      // Verified only filter
      if (filters.verifiedOnly && event.legitimacy !== "verified") return false;

      // Category filter (if any selected)
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(event.category)
      )
        return false;

      // Search filter
      if (filters.search.trim()) {
        const searchable = [
          event.title,
          event.description,
          event.organizer,
          event.location,
          ...event.tags,
          ...event.skillsAcquired,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(filters.search.toLowerCase())) return false;
      }

      // Date filter (calendar drill-down)
      if (filters.date && event.startDate !== filters.date) return false;

      return true;
    });
  }, [events, filters]);

  // Handler for "Force Sync" button
  const handleSync = async () => {
    setIsLoading(true);
    try {
      if (supabase && isSupabaseConfigured()) {
        // Call the sync endpoint
        const { data, error } = await supabase.functions.invoke(
          "sync-events",
          {}
        );
        if (error) throw error;
        // Refetch after sync
        const { data: eventsData } = await supabase
          .from("events")
          .select("*");
        if (eventsData) {
          setEvents(
            eventsData.map((row) => ({
              ...row,
              certificate: JSON.parse(row.certificate || '{"provided":false}'),
              tags: row.tags ? JSON.parse(row.tags) : [],
              skillsAcquired: row.skillsAcquired
                ? JSON.parse(row.skillsAcquired)
                : [],
            }))
          );
        }
      } else {
        // Mock sync - just update timestamp
        setEvents(
          events.map((e) => ({
            ...e,
            syncedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
        );
      }
    } catch (err) {
      console.error("[Home] sync error:", err);
      // Even on error, update timestamp for demo
      setEvents(
        events.map((e) => ({
          ...e,
          syncedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Open source submission modal
  const handleAddSource = () => setAddSourceOpen(true);
  const handleSubmitSource = () => setSourceSubmissionOpen(true);

  return (
    <div className="min-h-screen bg-neo-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black text-neo-black uppercase tracking-tight">
          EventForge India
        </h1>
        <p className="font-mono text-[14px] text-neo-black/60 mt-1">
          Neo-Brutalist Indian Tech & College Event Aggregator for B.Tech CSE Students
        </p>
      </div>

      {/* Sync Header */}
      <SyncHeader stats={stats} onSync={handleSync} />

      {/* Filter Bar */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Calendar */}
        <div className="lg:col-span-1">
          <NeoCalendar
            events={filteredEvents}
            onDateSelect={(date) =>
              setFilters((prev) => ({ ...prev, date }))
            }
          />
        </div>

        {/* Center: Event List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <p className="text-center py-8 font-mono text-xs">
              Loading events...
            </p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-center py-8 font-mono text-xs">
              No events match your filters. Try adjusting the mode, pricing, or categories.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  selected={selectedEvent?.id === event.id}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Event Detail Pane */}
        <div className="lg:col-span-1">
          {selectedEvent ? (
            <div className="border-4 border-black bg-neo-white shadow-neo p-4 h-[80vh] overflow-y-auto">
              <div className="mb-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="border-2 border-black bg-neo-black text-neo-white px-2 py-0.5 font-mono text-xs font-extrabold uppercase hover:bg-neo-coral"
                >
                  ← BACK TO LIST
                </button>
              </div>

              <div className="space-y-3">
                {/* Category / Legitimacy / Price */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${CATEGORY_META[selectedEvent.category]?.color || "bg-neo-azure"} text-neo-black`}>
                    {CATEGORY_META[selectedEvent.category]?.emoji} {selectedEvent.category}
                  </span>
                  <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${selectedEvent.legitimacy === "verified" ? "bg-neo-mint text-neo-black" : selectedEvent.legitimacy === "flagged" ? "bg-neo-coral text-neo-white" : "bg-neo-tangerine text-neo-black"}`}>
                    {selectedEvent.legitimacy === "verified" ? "🛡️ VERIFIED ORG" : selectedEvent.legitimacy === "flagged" ? "⚠️ FLAGGED" : "⚠️ COMMUNITY SUBMITTED"}
                  </span>
                  <span className={`text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 border-2 border-black ${selectedEvent.price === 0 ? "bg-neo-yellow text-neo-black" : "bg-neo-coral text-neo-white"}`}>
                    {selectedEvent.price === 0 ? "🟢 FREE" : `🏷️ ${selectedEvent.priceLabel || "PAID"}`}
                  </span>
                </div>

                <h2 className="font-display text-xl font-black text-neo-black uppercase mb-2 tracking-tight">
                  {selectedEvent.title}
                </h2>

                <p className="font-mono text-[14px] text-neo-black/80 leading-relaxed mb-4">
                  {selectedEvent.description}
                </p>

                <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-neo-black mb-4">
                  <div className="border-2 border-black px-3 py-2 bg-neo-white">
                    <span className="font-extrabold uppercase">Date</span>
                    <br />
                    {selectedEvent.startDate}
                    {selectedEvent.endDate && (
                      <span className="block mt-1 text-[9px] text-neo-black/60">to {selectedEvent.endDate}</span>
                    )}
                  </div>
                  <div className="border-2 border-black px-3 py-2 bg-neo-white">
                    <span className="font-extrabold uppercase">Time (IST)</span>
                    <br />
                    {selectedEvent.startTime}
                    {selectedEvent.endTime && (
                      <span className="block mt-1 text-[9px] text-neo-black/60">– {selectedEvent.endTime}</span>
                    )}
                  </div>
                  <div className="border-2 border-black px-3 py-2 bg-neo-white">
                    <span className="font-extrabold uppercase">Venue / Platform</span>
                    <br />
                    {selectedEvent.venue}
                  </div>
                  <div className="border-2 border-black px-3 py-2 bg-neo-white">
                    <span className="font-extrabold uppercase">Organizer</span>
                    <br />
                    {selectedEvent.organizer}
                    {selectedEvent.organizerDomain && (
                      <span className="block mt-1 text-[9px] text-neo-black/60">({selectedEvent.organizerDomain})</span>
                    )}
                  </div>
                </div>

                {/* Tags and Skills */}
                <div className="mb-4">
                  <span className="font-mono text-[10px] font-extrabold uppercase mb-1 block">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.tags.map((tag) => (
                      <span key={tag} className="border border-black px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold bg-neo-white text-neo-black">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-mono text-[10px] font-extrabold uppercase mb-1 block">Skills You’ll Gain</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.skillsAcquired.map((skill) => (
                      <span key={skill} className="border border-black px-1.5 py-0.5 text-[9px] font-mono font-bold bg-neo-azure/20 text-neo-black">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate / Prize */}
                <div className="mb-4 flex gap-2">
                  {selectedEvent.certificate.provided && (
                    <span className="bg-neo-mint text-neo-black px-3 py-1 font-mono text-[10px] font-extrabold uppercase border-2 border-black">
                      📜 {selectedEvent.certificate.type?.toUpperCase() || "CERTIFICATE"} INCLUDED
                    </span>
                  )}
                  {selectedEvent.cashPrize && (
                    <span className="bg-neo-tangerine text-neo-black px-3 py-1 font-mono text-[10px] font-extrabold uppercase border-2 border-black">
                      🏆 {selectedEvent.cashPrize}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-black bg-neo-black text-neo-white px-4 py-2 font-mono text-[10px] font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all inline-block"
                  >
                    REGISTER NOW →
                  </a>
                  <a
                    href={selectedEvent.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-black bg-neo-azure text-neo-black px-4 py-2 font-mono text-[10px] font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all inline-block"
                  >
                    📅 ADD TO GOOGLE CALENDAR
                  </a>
                  <button
                    onClick={() => {
                      // LinkedIn modal would be handled by EventCard internally
                    }}
                    className="w-full border-2 border-black bg-neo-coral text-neo-black px-4 py-2 font-mono text-[10px] font-extrabold uppercase shadow-neo hover:shadow-neo-lg hover:-translate-y-[1px] active:shadow-none active:translate-y-[2px] transition-all"
                  >
                    💼 BRAG ON LINKEDIN
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-4 border-black bg-neo-white shadow-neo p-4 h-[80vh] flex items-center justify-center">
              <p className="text-center font-mono text-[14px] text-neo-black/60">
                Select an event from the list to see details here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals / Drawers */}
      <AddSourceDrawer open={addSourceOpen} onClose={() => setAddSourceOpen(false)} />
    </div>
  );
}

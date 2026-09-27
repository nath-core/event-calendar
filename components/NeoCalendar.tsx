"use client";

import { useState, useEffect } from "react";
import { Event } from "../lib/types";

interface Props {
  events: Event[];
  onDateSelect: (date: string) => void;
}

export default function NeoCalendar({ events, onDateSelect }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group events by date for quick lookup
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.startDate.split("T")[0]; // YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    // Reset selected date when month changes
    setSelectedDate(null);
  }, [currentDate.getFullYear(), currentDate.getMonth()]);

  const prevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  };
  const nextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  };
  const today = () => {
    setCurrentDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = lastDay.getDate();

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - startingDay + 1;
    const isPrev = day <= 0;
    const isNext = day > daysInMonth;
    const date = new Date(year, month, Math.max(1, Math.min(day, daysInMonth)));
    const dateString = date.toISOString().split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];
    return {
      day: isPrev || isNext ? "" : day,
      date: dateString,
      isToday: dateString === todayStr,
      isPrev,
      isNext,
      eventCount: eventsByDate[dateString] || 0,
      selected: dateString === selectedDate,
      idx: i,
    };
  });

  return (
    <div className="border-4 border-black bg-neo-white shadow-neo">
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="border-2 border-black px-2 py-0.5 font-mono text-xs font-extrabold uppercase shadow-neo hover:bg-neo-yellow active:shadow-none">
            ‹
          </button>
          <h2 className="font-display text-xl font-black text-neo-black uppercase">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button onClick={nextMonth} className="border-2 border-black px-2 py-0.5 font-mono text-xs font-extrabold uppercase shadow-neo hover:bg-neo-yellow active:shadow-none">
            ›
          </button>
        </div>
        <button onClick={today} className="border-2 border-black bg-neo-yellow text-neo-black px-3 py-1 font-mono text-xs font-extrabold uppercase shadow-neo hover:bg-neo-tangerine active:shadow-none">
          TODAY
        </button>
      </div>

      <div className="grid grid-cols-7">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((abbr) => (
          <div key={abbr} className="border-b-2 border-black px-2 py-2 text-center font-mono text-xs font-extrabold uppercase bg-neo-yellow/20">
            {abbr}
          </div>
        ))}
        {/* Days */}
        {days.map((day) => (
          <button
            key={day.date + "-day-" + day.idx}
            onClick={() => !day.isPrev && !day.isNext && onDateSelect(day.date)}
            className={`border-2 border-black px-2 py-2 text-center font-mono text-xs ${day.isToday ? "bg-neo-yellow" : "bg-neo-white"} ${
              day.isPrev || day.isNext ? "text-neo-black/40" : ""
            } ${
              day.eventCount > 0 && !day.isPrev && !day.isNext ? "font-extrabold" : ""
            } ${day.selected ? "bg-neo-coral text-neo-white" : ""} hover:bg-neo-mint/20 transition-colors`}
          >
            <div className="flex flex-col items-center gap-0.5">
              {day.day && <span className="font-mono">{day.day}</span>}
              {day.eventCount > 0 && (
                <span className="border border-black px-1 py-0.5 text-[9px] font-mono font-extrabold uppercase">
                  {day.eventCount}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
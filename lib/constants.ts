/**
 * EventForge India — Constants
 * Category metadata, location hubs, pricing options, and scraper targets.
 */

import { EventCategory, EventMode, SourceType } from './types';

export const CATEGORY_META: Record<
  EventCategory,
  { label: string; emoji: string; color: string; bg: string }
> = {
  CTF: { label: 'CTF & Cybersecurity', emoji: '🚩', color: 'bg-neo-tangerine', bg: 'bg-neo-tangerine/20' },
  Hackathon: { label: 'Hackathon', emoji: '🏆', color: 'bg-neo-yellow', bg: 'bg-neo-yellow/20' },
  FOSS: { label: 'Open Source / FOSS', emoji: '💻', color: 'bg-neo-mint', bg: 'bg-neo-mint/20' },
  Workshop: { label: 'Workshop & Masterclass', emoji: '🛠️', color: 'bg-neo-azure', bg: 'bg-neo-azure/20' },
  TechFest: { label: 'College Tech Fest', emoji: '🎪', color: 'bg-neo-coral', bg: 'bg-neo-coral/20' },
  Conference: { label: 'Conference & Summit', emoji: '🎙️', color: 'bg-neo-lavender', bg: 'bg-neo-lavender/20' },
  CodingContest: { label: 'Coding Contest', emoji: '🧩', color: 'bg-neo-azure', bg: 'bg-neo-azure/20' },
  HiringChallenge: { label: 'Hiring Challenge', emoji: '💼', color: 'bg-neo-mint', bg: 'bg-neo-mint/20' },
  Robotics: { label: 'Robotics & Hardware', emoji: '🤖', color: 'bg-neo-tangerine', bg: 'bg-neo-tangerine/20' },
};

export const MODE_META: Record<EventMode, { label: string; subHubs: string[] }> = {
  'Kerala Offline': {
    label: 'Kerala Offline',
    subHubs: ['Kochi / Ernakulam', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kottayam', 'Palakkad'],
  },
  'Pan-India Online': {
    label: 'Pan-India Online',
    subHubs: ['Virtual / Online', 'Any City'],
  },
  'Premier National Offline': {
    label: 'Premier National Offline',
    subHubs: ['Bangalore', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Mumbai'],
  },
};

export const MODES: EventMode[] = ['Kerala Offline', 'Pan-India Online', 'Premier National Offline'];

export const CATEGORIES: EventCategory[] = [
  'CTF',
  'Hackathon',
  'FOSS',
  'Workshop',
  'TechFest',
  'Conference',
  'CodingContest',
  'HiringChallenge',
  'Robotics',
];

export const PRICING_OPTIONS: { id: 'free' | 'paid' | 'all'; label: string }[] = [
  { id: 'free', label: '🟢 FREE ONLY' },
  { id: 'paid', label: '🏷️ PAID ONLY' },
  { id: 'all', label: 'ALL' },
];

export const SOURCE_TYPES: SourceType[] = [
  'WhatsApp Channel',
  'Telegram Channel',
  'Instagram Post',
  'College Fest URL',
  'Unstop / Devfolio URL',
];

// Domains that count toward automatic "Legit Verified" legitimacy scoring.
export const TRUSTED_DOMAINS = [
  '.edu',
  '.ac.in',
  '.ac.uk',
  'devfolio.co',
  'unstop.com',
  'dare2compete.com',
  'mlh.org',
  'ieee.org',
  'ieee.in',
  'acm.org',
  'ksum.org',
  'tinkerhub.org',
  'fosskerala.org',
  'python.org',
  'mozilla.org',
  'google.com',
  'aws.amazon.com',
  'github.com',
];

// Suspicious keyword patterns that flag an event as community-submitted / risky.
export const SUSPICIOUS_KEYWORDS = [
  'guaranteed internship certificate',
  'pay to win',
  'just pay',
  'guaranteed placement',
  '100% job guarantee',
  'certificate factory',
];

// Scraper targets (documented architecture).
export const SCRAPER_TARGETS = [
  {
    name: 'Unstop (formerly Dare2Compete)',
    url: 'https://unstop.com/hackathons',
    type: 'public_api' as const,
    keywords: ['hackathon', 'coding contest', 'quiz'],
  },
  {
    name: 'Devfolio',
    url: 'https://devfolio.co/hackathons',
    type: 'public_api' as const,
    keywords: ['hackathon', 'web3', 'ai'],
  },
  {
    name: 'IEEE Kerala Section',
    url: 'https://kerala.ieee.org',
    type: 'html_scrape' as const,
    keywords: ['paper presentation', 'workshop', 'conference'],
  },
  {
    name: 'TinkerHub Foundation',
    url: 'https://tinkerhub.org/events',
    type: 'html_scrape' as const,
    keywords: ['foss', 'python', 'workshop', 'meetup'],
  },
  {
    name: 'KSUM IEDC',
    url: 'https://ksum.org/iedc',
    type: 'html_scrape' as const,
    keywords: ['startup', 'summit', 'hackathon'],
  },
  {
    name: 'Google Custom Search (keyword pipeline)',
    url: 'https://www.googleapis.com/customsearch/v1',
    type: 'google_cse' as const,
    keywords: ['College Tech Fest 2026 Kerala', 'Offline Hackathon Kochi', 'CTF India 2026'],
  },
];
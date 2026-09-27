/**
 * EventForge India — Core TypeScript Interfaces
 * Full type contracts for Events, FilterState, and SourceSubmissions.
 */

export type EventCategory =
  | 'CTF'
  | 'Hackathon'
  | 'FOSS'
  | 'Workshop'
  | 'TechFest'
  | 'Conference'
  | 'CodingContest'
  | 'HiringChallenge'
  | 'Robotics';

export type EventMode = 'Kerala Offline' | 'Pan-India Online' | 'Premier National Offline';

export type PricingType = 'free' | 'paid' | 'all';

export type VerificationStatus = 'verified' | 'community' | 'flagged';

export type SourceType =
  | 'WhatsApp Channel'
  | 'Telegram Channel'
  | 'Instagram Post'
  | 'College Fest URL'
  | 'Unstop / Devfolio URL';

export type SubmissionStatus = 'pending' | 'scraping' | 'approved' | 'rejected';

export interface CertificateDetails {
  provided: boolean;
  type?: 'e-certificate' | 'hardcopy' | 'both';
  verifiable?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  mode: EventMode;
  location: string; // city / hub name or "Online"
  venue: string; // physical venue or platform link
  organizer: string;
  organizerDomain?: string; // e.g. cusat.ac.in — used for legitimacy scoring
  startDate: string; // ISO
  endDate?: string; // ISO
  startTime: string; // "10:00 AM" IST
  endTime?: string;
  price: number; // 0 = free
  priceLabel?: string; // e.g. "₹199 / Team"
  certificate: CertificateDetails;
  cashPrize?: string; // e.g. "₹50,000"
  tags: string[];
  skillsAcquired: string[];
  registrationUrl: string;
  googleCalendarUrl: string;
  icsUrl: string;
  legitimacy: VerificationStatus;
  legitimacyNote?: string;
  image?: string;
  capacity?: number;
  spotsLeft?: number;
  source: 'scraped' | 'community';
  sourceSubmissionId?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

export interface FilterState {
  mode: EventMode | 'all';
  pricing: PricingType;
  certificate: boolean;
  verifiedOnly: boolean;
  categories: EventCategory[];
  search: string;
  date: string | null; // selected ISO date for calendar drill-down
  locationHub?: string; // e.g. "Kochi"
}

export interface SourceSubmission {
  id: string;
  sourceType: SourceType;
  eventUrl: string;
  eventTitle: string;
  rawText: string;
  submittedBy: string;
  status: SubmissionStatus;
  parsedEvent?: Partial<Event>;
  createdAt: string;
  updatedAt: string;
}

export interface SyncResult {
  ok: boolean;
  eventsMerged: number;
  eventsFlagged: number;
  sourcesProcessed: number;
  syncedAt: string;
  nextSync: string;
  message: string;
}

export interface PlatformStats {
  totalEvents: number;
  freeEvents: number;
  keralaOfflineEvents: number;
  verifiedCertificates: number;
  lastSyncedAt: string;
}
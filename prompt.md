# Master Specification Prompt: Indian Tech & College Event Aggregator ("EventForge India")

> **How to use this file:**  
> Copy and paste the entire prompt below into your preferred AI coding assistant (Cursor, Claude 3.5 Sonnet, ChatGPT Plus, or Bolt.new/v0.dev) to generate the complete web application.

---

```text
Act as a Principal Full-Stack Engineer and UI/UX Designer specialized in Neo-Brutalism web design. Build a production-grade, highly engaging Event Discovery & Calendar Web Application named "EventForge India" tailored specifically for Indian B.Tech Computer Science and Engineering students looking to upskill, compete, network, and earn verifiable certificates for LinkedIn.

================================================================================
1. VISUAL DESIGN SYSTEM: NEO-BRUTALISM
================================================================================
Implement a strict, energetic Neo-Brutalist design language using Tailwind CSS:
- Palette:
  - Base: Pure white (#FFFFFF) with high-contrast pastel accents:
    - Canary Yellow: #FFE600
    - Mint / Neon Green: #86EFAC
    - Electric Azure: #60A5FA
    - Coral / Hot Pink: #F472B6
    - Lavender / Violet: #C084FC
    - Tangerine: #FB923C
  - Text & Outlines: Pure solid black (#000000) for all text, icons, and borders.
- Borders & Shadows:
  - Hard black borders everywhere: `border-2 border-black` or `border-3 border-black` / `border-4 border-black`.
  - Zero blur drop shadows: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` and on hover/focus `hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`.
  - Interactive tactile feedback: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-75`.
- Typography:
  - Headers: Heavy, impactful grotesque or display font (Space Grotesk, Clash Display, or Inter Black uppercase).
  - Body & Data Tags: Clean Monospace or Neo-Grotesque (JetBrains Mono / Space Mono / IBM Plex Mono).
- Badges & Pills:
  - Chip badges with solid 2px borders, vibrant background fills, and bold uppercase text.

================================================================================
2. COMPREHENSIVE EVENT CATEGORY & SCRAPING TAXONOMY
================================================================================
The platform must support and classify Indian tech events under these distinct categories:
1. 🚩 Capture The Flag (CTF) & Cybersecurity Contests
2. 🏆 Hackathons (College Hackathons, National Flagship like Smart India Hackathon (SIH), iQOO Hackathon, Flipkart GRiD, Tata Crucible Hackathon)
3. 💻 Open Source / FOSS Sprints & Meetups (Kochi Python, TinkerHub, FOSS Kerala, Mozilla India, DevClub)
4. 🛠️ Hands-on Workshops & Masterclasses (AI/ML, DevOps, Cloud Computing, Full-Stack, IoT, Embedded Systems, Web3)
5. 🎪 College Tech Fests & Inter-College Symposia (e.g., Excel MEC, Dhishna CUSAT, Tathva NIT Calicut, Dhyuthi GEC, Ragam NITC, Kurukshetra CEG, Shaastra IIT Madras)
6. 🎙️ Tech Conferences, Summits & Keynote Talk Shows (Google I/O Extended, AWS Community Day, Kerala Startup Mission IEDC Summits)
7. 📜 Paper Presentation & Project Expos (IEEE, CSI, ACM Student Chapter conferences)
8. 🧩 Competitive Programming & Algorithmic Contests (CodeChef / Codeforces college chapters, ICPC Qualifiers)
9. 💼 Tech Hiring Challenges & Internship Drives (Unstop / HackerEarth campus challenges)
10. 🤖 Robotics & Hardware Competitions (Robowars, Drone Racing, Line Follower challenges)

================================================================================
3. GRANULAR FILTERING & SEARCH SYSTEM
================================================================================
Provide a persistent, multi-faceted Neo-Brutalist filter bar:
1. Mode & Geography:
   - "Kerala Offline" (Sub-filters for key hubs: Kochi/Ernakulam, Thiruvananthapuram, Kozhikode, Thrissur, Kottayam, Palakkad; Top colleges: CET, MEC, CUSAT, GEC, NIT Calicut, TKM, Model Engineering College).
   - "Pan-India Online" (Virtual hackathons, webinars, remote CTFs).
   - "Premier National Offline" (Selected high-value hackathons & tech summits worth traveling for across India e.g., Bangalore, Delhi NCR, Hyderabad, Chennai, Mumbai).
2. Pricing:
   - "Free Only" (Default highlighted)
   - "Paid Only" (With exact registration fee in INR ₹)
   - "All"
3. Verification & Certificates:
   - "Certificate Provided" (E-Certificate / Hardcopy Certificate)
   - "Legitimacy Verified" (Badge showing official college/organization credentials to prevent fake or scam pay-to-win certificate factories).
4. Category Multi-Select: (CTF, Hackathon, FOSS, Workshop, Tech Fest, Conference, Coding Contest).
5. Search Bar: Instant fuzzy search across titles, organizers, tags, and college names.

================================================================================
4. CORE UI / UX MODULES
================================================================================

Module A: Calendar & List Toggle
- Monthly Calendar Grid:
  - Visual month selector (Prev / Next Month, "Today" button).
  - Each day cell has a counter badge and color-coded event indicator dots/pills.
  - Clicking any date filters the event view to that day with an animated card drawer or split-view pane.
- Timeline / List View: Chronological list grouped by "Today", "This Weekend", "Upcoming This Month", and "Later".

Module B: Top Sync Header
- "Last Synced" timestamp badge: e.g., `⚡ Synced: Daily at 12:00 AM IST (Today @ 12:00 AM)`
- "Trigger Manual Refresh" button with high-contrast rotating loader animation.
- Quick Stats Counter: Total Events Live, Free Events, Kerala Offline Events, Verified Certificates.

Module C: Event Cards
Each Neo-Brutalist event card must display:
- Category Pill + Legitimacy Badge (`🛡️ Verified Org` or `⚠️ Community Submitted`).
- Price Badge (`🟢 FREE` or `🏷️ ₹199 / Team`).
- Date, Time (IST), Venue/Platform (Google Meet, Zoom, College Auditorium/Lab).
- Organized By (College name, IEEE/IEDC cell, Community).
- Certificate details (`📜 Verifiable Certificate Included` / `🏆 Cash Prize: ₹50,000`).
- Action Buttons:
  1. "Register Now" (External redirect).
  2. "Add to Google Calendar" (Direct `.ics` / Google Calendar Web link).
  3. "Brag on LinkedIn" (Opens LinkedIn post assistant).

Module D: "Brag on LinkedIn" Post Generator
- Modal dialog with pre-written, highly engaging LinkedIn post templates tailored for B.Tech CSE students:
  - Injects event title, organizers, topics covered, and skills acquired.
  - Generates bullet points for key takeaways (e.g., "Deep dived into Web3 architecture, smart contract security, and hands-on CTF reverse engineering").
  - Formatted hashtags: `#BTechCSE #KeralaTech #Hackathon #OpenSource #DeveloperCommunity #Upskilling #EngineeringLife`.
  - One-click "Copy to Clipboard" button.

Module E: "Add / Ingest Custom Source" Drawer
- Form allowing users to submit new sources:
  - Source Type: WhatsApp Channel / Community, Telegram Channel, Instagram Post Link, College Fest Web URL, Unstop/Devfolio URL.
  - Direct Event URL & Event Title.
  - Raw Text / Brochure paste area for automated regex parsing.
  - Submits to Firebase / Supabase queue with a status badge (`Pending Scrape Verification`).

================================================================================
5. DATA ARCHITECTURE & AUTOMATED SCRAPER SPECIFICATION
================================================================================
Tech Stack:
- Framework: Next.js (App Router, TypeScript) + Tailwind CSS + Lucide React Icons.
- Database: Firebase Firestore (or Supabase / Postgres).
- Cron & Scrapers:
  - Scheduled Serverless Cron (triggering daily at 12:00 AM IST via Vercel Cron or GitHub Actions workflow: `cron: "30 18 * * *"` UTC).
  - Scraper targets:
    1. Unstop (formerly Dare2Compete) public API / RSS endpoints for engineering hackathons and quizzes.
    2. Devfolio public hackathon discovery feeds.
    3. IEEE Kerala Section, TinkerHub Foundation, and KSUM IEDC public event calendars.
    4. Google Custom Search / Puppeteer pipeline looking for keywords: "College Tech Fest 2026 Kerala", "Offline Hackathon Kochi", "CTF India 2026".
  - Legitimacy Algorithm:
    - Flags events as "Legit Verified" if hosted on known platforms (.edu/.ac.in domains, Devfolio, Unstop, MLH, official IEEE/ACM/IEDC domains) or verified college student branches.
    - Flags suspicious "pay ₹500 for guaranteed internship certificate" spam as unverified.

================================================================================
6. DELIVERABLES REQUIRED
================================================================================
1. Complete, executable Next.js project structure with all necessary components:
   - `types/event.ts` (Full TypeScript interfaces for Event, FilterState, SourceSubmission).
   - `components/NeoCalendar.tsx` (Interactive monthly calendar grid).
   - `components/EventCard.tsx` (Brutalist event card with certificate tags and status).
   - `components/FilterBar.tsx` (Mode, location, category, and fee filters).
   - `components/LinkedInModal.tsx` (Pre-formatted copyable LinkedIn post generator).
   - `components/AddSourceModal.tsx` (Community source submission modal).
   - `lib/sampleEvents.ts` (Rich, realistic mock dataset populated with real-world Kerala college events, national hackathons, and online CTFs for the current month).
   - `app/api/sync/route.ts` (Mocked or operational sync API endpoint that updates the 12:00 AM timestamp and merges new events).
2. Production Tailwind config with the custom Neo-Brutalist shadows and color tokens.
```
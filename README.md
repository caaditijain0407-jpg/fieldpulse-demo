# ⚡ FieldPulse — AI-Powered Field Intelligence Platform

> **Your field teams talk to customers every day. That intelligence is getting lost.**

FieldPulse captures unstructured field conversations, structures them with AI, and distributes actionable signals to the right people — by role, in real time.

🔗 **[Live Demo](DEMO_URL_HERE)** · 📄 **[Project Page](PROJECT_PAGE_URL_HERE)** · 👤 **[Built by Aditi Jain](https://aditijainprojects.com)**

---

## The Problem

Every organization with field teams has this problem:

| What happens today | What gets lost |
|---|---|
| Sales rep meets a client | Competitor pricing intel, upsell signals |
| RM visits a developer | Land acquisitions (months before public), cross-sell opportunities |
| Medical rep visits a doctor | Prescription trends, competitor product launches |
| Retail rep covers stores | Shelf-share data, stockout alerts, promo effectiveness |

This intelligence sits in **WhatsApp messages, personal notes, and people's heads**. Leadership has no visibility. When someone leaves, the knowledge walks out the door.

**CRMs don't solve this.** They track deals and contacts — not unstructured field intelligence.

---

## The Solution

```
Field Rep sends one message → AI extracts structured signals → Right people see it instantly
```

### 3-Layer Architecture

| Layer | What | Tech |
|---|---|---|
| **Capture** | WhatsApp bot, voice notes, web chat | WhatsApp Business API, Twilio/Gupshup, Speech-to-Text |
| **Processing** | Entity extraction, signal classification, fuzzy matching | GPT-4/Claude, LangChain, Vector DB |
| **Distribution** | Role-based dashboards, real-time alerts, feedback loops | React/Next.js, WebSockets, Push Notifications |

### Signal Types

| Type | Color | Examples |
|---|---|---|
| 🟢 **Cross-sell** | Green | LAP opportunity, new product interest, referral |
| 🟡 **Timing** | Amber | Deadline approaching, renewal window, pipeline urgency |
| 🔴 **Risk** | Red | Contact gap, slow sales, competitor threat, churn signal |
| 🟣 **Early Intel** | Purple | Pre-public intelligence, land acquisition, budget cycle |

---

## Interactive Demo

The guided demo walks through an **8-step story** in construction finance:

1. **Meet the Team** — 4 roles, the problem
2. **Field Note** — RM logs via WhatsApp-style bot (one-turn, zero friction)
3. **AI Parsing** — 6 entities extracted in under 2 seconds
4. **RM View** — Dashboard updates instantly
5. **Manager View** — Cross-role notification, RM attribution
6. **Executive View** — Competitive landscape auto-aggregated
7. **Risk Loop** — Credit team → RM alert in same day (vs 3 weeks)
8. **Early Intel** — The killer feature: 3-6 month head start

> **The demo uses construction finance as an example, but the pattern applies to any industry with field teams.**

---

## Tech Stack (Production)

### Frontend
- **React / Next.js** — SSR dashboards, role-based routing
- **TypeScript** — Type-safe architecture
- **Tailwind CSS** — Design system tokens
- **Recharts** — Pipeline funnels, health trends

### Backend
- **Node.js** (Express/Fastify) — API server, webhook handlers
- **PostgreSQL** — Profiles, signals, activity logs, audit trail
- **Redis** — Session cache, notification queue
- **Prisma** — Type-safe ORM

### AI & NLP
- **OpenAI / Anthropic API** — Field note parsing, signal classification
- **Whisper** — Voice-to-text (Hindi/Hinglish)
- **LangChain** — RAG pipeline for contextual matching
- **Pinecone / Weaviate** — Semantic search across signals

### Infrastructure
- **AWS / Azure** — ECS/AKS containers, auto-scaling
- **WhatsApp Business API** — Via Twilio or Gupshup
- **Auth0 / Clerk** — SSO, RBAC, MFA
- **Datadog** — Monitoring, alerting

### Integrations
WhatsApp · Salesforce · HubSpot · Power BI · Slack / Teams · Core Banking / LOS · Email · REST API

---

## Not Just One Industry

| Industry | Field Role | Key Signals |
|---|---|---|
| **Construction Finance** | Relationship Managers | Pre-RERA intel, LAP/LRD cross-sell, competitor rates |
| **Pharma / Medical Devices** | Medical Representatives | Prescription trends, formulary changes, KOL sentiment |
| **FMCG / Retail** | Sales Representatives | Stockouts, competitor pricing, new outlets, promo effectiveness |
| **Banking / Insurance** | Agents / RMs | Cross-sell triggers, churn signals, competitor offers |
| **Real Estate** | Brokers / Agents | Pricing trends, buyer sentiment, inventory movement |
| **Industrial / B2B** | Key Account Managers | RFQ signals, renewal windows, technical requirements |

---

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/fieldpulse-demo.git
cd fieldpulse-demo
npm install
npm start
```

Opens at `http://localhost:3000`

## Deploy to Netlify

```bash
npm run build
# Drag the 'build' folder to https://app.netlify.com/drop
# Or use Netlify CLI: netlify deploy --prod --dir=build
```

---

## Project Structure

```
fieldpulse-demo/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── App.js              # Full guided demo (single-file React)
│   └── index.js            # React entry point
├── index.html              # Project page (standalone, deploy separately)
├── netlify.toml            # Netlify build config
├── package.json
└── README.md
```

---

## Status

- ✅ Interactive 8-step guided demo
- ✅ 4 role-based views (RM, Manager, Executive, Risk)
- ✅ AI parsing simulation (entity extraction, signal classification)
- ✅ Cross-role notification system
- ✅ Bot with presets and free-text input
- ✅ Full project page with tech architecture and industry mapping
- 🔲 Production backend (API, database, auth)
- 🔲 WhatsApp Business API integration
- 🔲 Voice note support (Whisper)
- 🔲 Real AI processing pipeline

---

## About

Built by **[Aditi Jain](https://aditijainprojects.com)** — CA turned Product Builder.

This project demonstrates how AI can transform unstructured field intelligence into a structured competitive advantage. The demo is a working prototype; the architecture is production-ready.

**Interested in building this for your organization?** [Get in touch](https://aditijainprojects.com/#connect).


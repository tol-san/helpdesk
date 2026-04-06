# Implementation Plan

## Overview
A phased approach to build the AI-powered ticket management system. Each phase is designed to deliver incremental value and can be deployed independently.

---

## Phase 1: Project Setup (1-2 days)
**Scaffolding, database setup, Prisma schema, admin seed**

### 1.1 Project Structure & Build Tools
- [ ] Set up Express backend with TypeScript
- [ ] Set up React frontend with TypeScript 
- [ ] Set up mysql database

---

## Phase 2: Authentication (2 days)
**Login pages, session management, route protection**

### 2.1 Backend Authentication System
- [ ] Implement session-based authentication with `express-session`
- [ ] Create `POST /api/auth/login` endpoint (email/password)
- [ ] Create `POST /api/auth/logout` endpoint
- [ ] Create password hashing utility (bcrypt)
- [ ] Implement RBAC middleware (Admin vs Agent roles)
- [ ] Add protected route middleware
- [ ] Test auth endpoints with Postman/curl

### 2.2 Frontend Login Page
- [ ] Create login page component (email/password form)
- [ ] Add React Context for user session state
- [ ] Implement logout functionality
- [ ] Set up protected routes (redirect unauthenticated users to login)
- [ ] Add loading and error states for login form
- [ ] Test login/logout flow end-to-end

---

## Phase 3: User Management (1-2 days)
**Admin CRUD for agents, role-based access control**

### 3.1 Backend User Management APIs
- [ ] Create `POST /api/users` – admin creates new agent account
- [ ] Create `GET /api/users` – admin lists all agents
- [ ] Create `GET /api/users/:id` – fetch single user details
- [ ] Create `PATCH /api/users/:id` – admin updates agent info
- [ ] Create `DELETE /api/users/:id` – admin removes agent account
- [ ] Create `GET /api/me` – get current logged-in user
- [ ] Add role-based access checks on all endpoints (admin-only)
- [ ] Test user management endpoints

### 3.2 Frontend Admin User Management
- [ ] Build admin-only page: `/admin/users`
- [ ] Display list of all agents (email, name, created_date, actions)
- [ ] Create "Add New Agent" form (email, name, temporary password)
- [ ] Add "Delete Agent" button with confirmation modal
- [ ] Add success/error notifications
- [ ] Restrict page access to admin users only
- [ ] Test user creation and deletion flows

---

## Phase 4: Ticket CRUD (3 days)
**Core ticket operations, list/detail pages with filtering and sorting**

### 4.1 Backend Ticket CRUD APIs
- [ ] Create `POST /api/tickets` – create new ticket
- [ ] Create `GET /api/tickets` – list tickets with pagination
- [ ] Create `GET /api/tickets/:id` – fetch single ticket
- [ ] Create `PATCH /api/tickets/:id` – update ticket status/category
- [ ] Add query filters: `?status=open&category=technical`
- [ ] Add sorting: `?sort=created&order=desc`
- [ ] Add pagination: `?limit=20&offset=0`
- [ ] Test all CRUD endpoints and filters

### 4.2 Frontend Ticket List View
- [ ] Create ticket list page (`/tickets`)
- [ ] Display table: ID, subject, status, category, created_date, sender
- [ ] Add pagination controls (previous/next, limit selector)
- [ ] Add filter selectors (status, category)
- [ ] Add search input for subject/body
- [ ] Add sorting by date and status
- [ ] Add loading and error states
- [ ] Add empty state message

### 4.3 Frontend Ticket Detail View
- [ ] Create ticket detail page (`/tickets/:id`)
- [ ] Display full email (from, to, subject, body, received_date)
- [ ] Show ticket metadata (status, category, classification, summary)
- [ ] Add status dropdown (Open → Resolved → Closed)
- [ ] Add category dropdown (General, Technical, Refund)
- [ ] Add back button and share button (copy URL)
- [ ] Display loading and error states
- [ ] Test navigation between detail and list

---

## Phase 5: AI Features (3-4 days)
**Claude API integration for classification, summaries, suggested replies, knowledge base**

### 5.1 Claude API Integration
- [ ] Install Anthropic SDK (`@anthropic-ai/sdk`)
- [ ] Create Claude client wrapper with error handling and retries
- [ ] Set up prompt templates for each AI task
- [ ] Configure max tokens, temperature, and other parameters
- [ ] Add logging for API calls and token usage tracking

### 5.2 Ticket Classification Service
- [ ] Create `classifyTicket(ticketText)` function
- [ ] Prompt Claude to classify into: General Question, Technical Question, Refund Request
- [ ] Extract confidence score and reasoning from Claude
- [ ] Store classification and confidence in ticket record
- [ ] Handle API failures gracefully (fallback to "unclassified")

### 5.3 Ticket Summary Service
- [ ] Create `summarizeTicket(ticketText)` function
- [ ] Prompt Claude to generate 2-3 sentence agent-friendly summary
- [ ] Store summary in ticket record
- [ ] Test with sample tickets

### 5.4 Suggested Reply Service
- [ ] Create `generateSuggestedReply(ticketText, category)` function
- [ ] Create knowledge base prompt with FAQ/common answers
- [ ] Prompt Claude to draft personalized response
- [ ] Extract tone, confidence, and reply text
- [ ] Store suggested reply in ticket record
- [ ] Only store if confidence score > 0.7

### 5.5 Background Job Queue (BullMQ + Redis)
- [ ] Set up Redis connection (local or cloud)
- [ ] Initialize BullMQ with job queues
- [ ] Create worker for classification job
- [ ] Create worker for summary job
- [ ] Create worker for suggested reply job
- [ ] Trigger all three jobs when new ticket created
- [ ] Add error handling and retry logic (3 retries max)
- [ ] Monitor job success/failure

---

## Phase 6: Email Integration (2-3 days)
**Inbound webhook to create tickets, outbound replies, threading**

### 6.1 Inbound Email Webhook
- [ ] Set up webhook endpoint `POST /api/webhooks/email`
- [ ] Configure SendGrid/Mailgun to send inbound emails to this endpoint
- [ ] Parse email: sender, recipient, subject, body, timestamp
- [ ] Create ticket with status=Open and parsed email data
- [ ] Queue AI classification/summary/reply jobs
- [ ] Return 200 OK to confirm receipt
- [ ] Add request validation and security checks
- [ ] Log all webhook calls for debugging

### 6.2 Outbound Email Sending
- [ ] Create `sendEmail(to, subject, body)` function using SendGrid/Mailgun
- [ ] Add email templates for replies and notifications
- [ ] Store sent emails in ticket history
- [ ] Handle delivery errors and retries
- [ ] Test sending emails end-to-end

### 6.3 Email Threading (Optional for MVP)
- [ ] Extract In-Reply-To and Message-ID headers
- [ ] Group related emails into single ticket thread
- [ ] Display conversation history in ticket detail view
- [ ] Handle multiple-recipient emails

---

## Phase 7: Dashboard (2-3 days)
**Stats overview, category breakdown, quick filters**

### 7.1 Dashboard Backend APIs
- [ ] Create `GET /api/dashboard/stats` endpoint
  - Total tickets created today/week/month
  - Tickets by status (Open, Resolved, Closed)
  - Tickets by category (General, Technical, Refund)
  - Average resolution time
- [ ] Create `GET /api/dashboard/category-breakdown` endpoint
- [ ] Create `GET /api/dashboard/recent-tickets` endpoint (last 10 tickets)
- [ ] Add date range filtering support

### 7.2 Dashboard Frontend Page
- [ ] Create dashboard page (`/dashboard` or `/`)
- [ ] Display key metrics: Open tickets, Resolved today, CSAT score placeholder
- [ ] Add chart: ticket count by category (pie or bar chart)
- [ ] Add chart: ticket count by status (bar chart)
- [ ] Add quick filter buttons (show Open, show Resolved, show all)
- [ ] Display recent tickets list
- [ ] Make responsive and visually appealing with Tailwind
- [ ] Test with sample data

---

## Phase 8: Polish & Deployment (2-3 days)
**Input validation, error handling, Docker deployment**

### 8.1 Validation & Error Handling
- [ ] Add input validation on all API endpoints (email format, required fields)
- [ ] Create centralized error handling middleware in Express
- [ ] Add user-friendly error messages for common cases
- [ ] Add global error boundary in React
- [ ] Add toast notifications for errors and success messages
- [ ] Test error flows (missing required fields, API errors, network issues)

### 8.2 UI/UX Polish
- [ ] Add loading spinners for async operations
- [ ] Add skeleton screens for data loading
- [ ] Verify mobile responsiveness across all pages
- [ ] Add keyboard navigation (Tab, Enter, Escape)
- [ ] Add proper focus management
- [ ] Verify contrast and accessibility (WCAG AA)
- [ ] Fix any visual/layout bugs

### 8.3 Docker & Deployment
- [ ] Create Dockerfile for backend (Node.js + Express)
- [ ] Create Dockerfile for frontend (React build + serve)
- [ ] Create docker-compose.yml for local development
- [ ] Set up environment variables for production
- [ ] Choose cloud provider (AWS, Railway, Fly.io, Vercel)
- [ ] Deploy backend to cloud
- [ ] Deploy frontend to cloud
- [ ] Test end-to-end in production

### 8.4 Operations & Documentation
- [ ] Write deployment runbook
- [ ] Document all environment variables
- [ ] Document API endpoints with examples
- [ ] Create admin guide for user creation and ticket management
- [ ] Set up basic monitoring (uptime checks, error logs)
- [ ] Document how to update knowledge base/prompts

---

## Estimated Timeline
- **Phase 1:** 1-2 days
- **Phase 2:** 2 days
- **Phase 3:** 1-2 days
- **Phase 4:** 3 days
- **Phase 5:** 3-4 days
- **Phase 6:** 2-3 days
- **Phase 7:** 2-3 days
- **Phase 8:** 2-3 days

**Total: ~18-22 days** for a fully functional MVP (3.5-4.5 weeks with full-time work)

---

## Key Decisions Before Starting

1. **Email Service:** SendGrid vs. Mailgun – get API keys and webhook URL
2. **Cloud Provider:** AWS, Railway, Fly.io, or Vercel – create account
3. **Database Hosting:** Managed MySQL (PlanetScale, AWS RDS) or self-hosted
4. **Redis Hosting:** Local vs. cloud (Upstash, AWS ElastiCache)
5. **Claude API Key:** Get API key and set up cost limits
6. **Knowledge Base format:** Hardcoded FAQ, markdown files, or database entries

## Testing Strategy
- Unit tests for auth, classification logic, email parsing
- Integration tests for API endpoints
- E2E tests for critical flows (signup → email → ticket → reply)
- Manual testing for UI before each phase deployment

# Eltropy AI Voice Agents: Complete Capabilities & Performance Reference
**Last Updated:** September 1, 2026  
**Used In:** Daily LTP Blog Generation System

This document serves as the authoritative reference for Eltropy's AI voice agent capabilities, features, implementation, and performance metrics. All daily blog posts are informed by these specifications.

---

## 🎯 Core Capabilities

### Informational Inquiries (Read-Only)
Eltropy voice agents can answer a comprehensive range of common questions:
- **Routing numbers** for transfers and payments
- **Branch locations and hours** including holiday schedules
- **Holiday schedules** for specific dates
- **Product and service offerings** (loan types, IRA options, checking accounts, savings products)
- **General website information** (FAQs, policies, procedures)
- **Account-related questions** (without access requiring authentication)

### Transactional Capabilities (Secure Transactions)
When integrated with core banking systems, agents can execute secure transactions:
- **Account balance inquiries** with authentication
- **Internal transfers** between member accounts
- **Loan payments** with proper authorization
- **Loan payoff amounts** and amortization details
- **CD maturity dates** and renewal information
- **Check transaction details** and history
- **Fund transfers** with multi-factor authentication
- **Payment scheduling** and setup

### Call Deflection & Containment
- **Primary goal:** Automate simple/moderate conversations
- **Result:** Significant reduction in live agent volume
- **Benefit:** Frees human staff for complex and empathetic interactions
- **Typical deflection rate:** 25-75% of incoming calls

### Agent Handoff with Context
- **Seamless transfer** to live agents when needed
- **Full conversation context** passed along automatically
- **Member doesn't repeat** information already provided
- **Agent has complete** call transcript for reference
- **Skill-based routing** to appropriate department/specialist

### Multilingual Support
- **Available languages:** English, Spanish (expandable to additional languages)
- **Language detection:** Automatic detection of caller's preferred language
- **Personalized experience:** Responds in member's preferred language
- **Expansion capability:** Can support 100+ languages with additional training

### Customization & Personalization
- **Brand voice:** Personality customizable to align with credit union brand
- **Tone and style:** Specific phrases, greeting styles, closing styles
- **Member database integration:** Personalized greetings using member name/info
- **Custom workflows:** Tailor interaction flows to credit union processes

---

## 🔧 Technical Features

### Generative AI Engine
**Next-generation beyond legacy intent-based systems**
- **Learning capability:** Learns from vast amounts of data without pre-scripting
- **Knowledge sources:** Websites, PDFs, Excel files, internal documents, policies, procedures
- **No scripting needed:** Generates natural conversational responses dynamically
- **Continuous improvement:** Learns from interactions over time
- **Context awareness:** Understands nuance and context in member requests

### Deep Core System Integrations
**Direct API connectivity with major banking platforms**
- **Symitar** - Largest credit union core processor
- **Fiserv Portico** - Enterprise banking system
- **CU Answers** - Shared branching platform
- **Keystone Correlation** - Legacy system support
- **Jack Henry & Associates** - May extend timelines, fully supported
- **Real-time access:** Live member data for authentication and transactions
- **Bi-directional:** Both query and update capabilities

### Multi-Layer Authentication
**Comprehensive security for transactional requests**
- **PIN code verification** - 4-6 digit PIN
- **Last four SSN** - Social Security Number partial
- **Member ID** - Internal member identifier
- **One-time passcodes** - SMS/email delivered codes
- **Voice biometrics** - Optional (note: deepfake risks being addressed)
- **Multi-step verification** - Combined authentication methods

### Contextual AI Routing & Skill-Based Routing
- **Intent understanding:** AI determines caller's actual need
- **Intelligent distribution:** Routes to appropriate department
- **Skill matching:** Connects to agent with specific expertise
- **Examples:** HR department, collections, fraud, lending, member services
- **Reduces misdirected calls:** Improves first-contact resolution

### Text-to-Speech Technology
- **Dynamic generation:** Responses generated in real-time
- **Natural voices:** Human-like quality (not robotic)
- **No pre-recording needed:** Eliminates outdated pre-recorded messages
- **Personalization:** Voice tone matches brand personality
- **Multiple voice options:** Can vary voice based on interaction type

### AI & Quality Monitoring (Conversational Intelligence)
**Advanced analytics on all interactions across channels**
- **Topical analysis:** What members are calling about
- **Sentiment analysis:** Member satisfaction and emotion tracking
- **Agent scoring:** Performance metrics for live agents
- **PII violation detection:** Identifies when personal info is shared
- **Call drivers:** Why members are calling (trending topics)
- **Optimal staffing:** When to have staff available
- **Individual performance:** Agent-level metrics and coaching opportunities

### Omnichannel Integration
**Unified communication platform across all channels**
- **Voice interactions:** Primary AI voice agent calls
- **Text/SMS transitions:** Send links via text during voice call
- **Video capability:** Can transition to video with agent
- **Chat support:** Seamless shift to chat channel if preferred
- **Appointment linking:** Member can book appointments via text link sent during call
- **Loan applications:** Quick-apply links for loan products

### Self-Service Management
**Client empowerment after implementation**
- **Knowledge base updates:** Clients can modify AI knowledge/training
- **Settings modification:** Adjust routing rules, authentication methods
- **Holiday schedules:** Update holiday closure info without vendor help
- **FAQ updates:** Modify answers to common questions
- **Workflow changes:** Adjust how agent handles specific scenarios
- **No vendor dependency:** Credit union maintains direct control

---

## 📊 Proven Performance Metrics

### Containment Rates (Call Resolution)
- **Initial performance:** 40-60% "out-of-the-box" containment
- **With optimization:** 70-80% containment achievable
- **Benchmark 1:** 88% containment on 11.8 million consumer questions
- **Benchmark 2:** 53% containment on ALL inbound calls, 92% on questions asked
- **Overall range:** Can deflect 25-75% of calls from live agents
- **Improvement trajectory:** Typically improves 2-5% monthly with training

### Call Volume & Duration
- **Monthly capacity:** 20,000-50,000 calls per month per deployment
- **Annual capacity:** Up to 1,000,000+ minutes annually
- **Average interaction:** ~1.5 minutes per call
- **Scalability:** Can handle massive volume spikes (core migrations, crises)
- **Simultaneous calls:** Unlimited concurrent capacity

### Accuracy & Reliability
- **Accuracy rate:** 98% on member requests
- **Uptime:** Industry-standard 99.9%+ availability
- **Error recovery:** Graceful fallback to live agent if unsure
- **Compliance accuracy:** Regulatory requirement adherence
- **Data accuracy:** Real-time access to member account data

### Adoption & Usage
- **Standard adoption rate:** 52-60% of members use AI agent when available
- **Peak usage times:** Typically off-hours and weekend calls
- **User satisfaction:** 4.7/5.0 average rating on digital interactions
- **Repeat usage:** 70%+ of members who use once, use again
- **Demographic spread:** Across all age groups, income levels

---

## 💰 Financial Impact & ROI

### Proven Return on Investment
- **Demonstrated ROI:** 497% with payback period under 90 days
- **Cost per interaction:** 86% reduction vs. live agent handling
- **Annual savings range:** $150,000 to $800,000+ (size dependent)
- **Payback period:** As short as 6 months for larger institutions
- **Ongoing savings:** Compound savings increase as optimization improves

### Pricing Structure
**Minute-based pricing model (varies by institution size)**
- **Small CU option:** 12,000 minutes/year
- **Medium CU option:** 32,200 minutes/year
- **Medium-Large option:** 42,500 minutes/year (off-hours focused)
- **Large CU option:** 70,000 minutes/year
- **Enterprise option:** 112,000 minutes/year
- **Maximum option:** 135,000 minutes/year

### Contract Flexibility
- **Implementation discount:** 25-50% for longer-term contracts
- **Annual discount:** 10-20% for multi-year agreements
- **Scalability:** Can increase minutes as usage grows
- **Predictable costs:** Fixed monthly fee structure

### Cost Breakdown Components
- **Implementation fee** (may be discounted)
- **Monthly platform fee** (per minutes included)
- **Overages** (if exceed monthly minutes)
- **Optional enhancements** (outbound capability, advanced features)
- **No per-call charges** (flat rate simplifies budgeting)

### Detailed Cost Savings Calculation
**Example: 5,000-member credit union**
- **Current live agent cost:** ~$25 per interaction (loaded cost)
- **AI agent cost:** ~$0.50 per interaction (all-in)
- **Monthly interactions:** 10,000 inbound calls
- **AI deflection:** 65% = 6,500 deflected calls
- **Monthly savings:** 6,500 × $24.50 = $159,250
- **Annual savings:** $1,911,000
- **Implementation cost:** ~$50,000
- **Year 1 net savings:** $1,861,000
- **ROI:** 3,622%

---

## 🚀 Implementation Process

### Phase 1: Kickoff & Discovery (1-2 weeks)
**Objective:** Understand needs and establish foundation

- Credit union's specific challenges
- Current call flow and volume
- Desired outcomes and metrics
- Existing infrastructure review
- Stakeholder interviews
- Success criteria definition

**Deliverable:** Project roadmap and timeline

---

### Phase 2: Setup & Configuration (4-8 weeks)

#### Sub-Phase 2.1: Bot Building (1-2 weeks)
- Construct base AI agent
- Leverage existing bot data if available
- Migrate historical interactions if applicable
- Set up learning infrastructure

#### Sub-Phase 2.2: Knowledge Base Integration (2-3 weeks)
- Gather and organize training data
- Website content integration
- Policy and procedure documentation
- FAQ compilation
- Guardrail establishment (approved sources only)

#### Sub-Phase 2.3: Core System Connectivity (2-4 weeks) ⚠️ CRITICAL PATH
- API integration with core banking system
- Security and encryption setup
- Authentication mechanism configuration
- Real-time data access testing
- Transaction processing integration
- This is the longest phase and critical for transactional capability

#### Sub-Phase 2.4: Intent & Authentication Setup (1 week)
- Define specific intents (call types) agent will handle
- Establish authentication requirements
- Set escalation rules
- Configure hold music and transfer processes

**Deliverable:** Fully configured, ready-to-test system

---

### Phase 3: Testing Phase (4-8 weeks) ⚠️ EXTENSIVE

#### Sub-Phase 3.1: Internal Testing (1 week)
- Provider validates system internally
- Quality assurance checks
- Bug identification and fixes

#### Sub-Phase 3.2: Client-Led Testing (4-6 weeks) - CLIENT CRITICAL
- Client receives dedicated test number
- Detailed test tracking sheet provided
- Clients call the agent, test scenarios
- Feedback collection on:
  - Accuracy of responses
  - Appropriate tone/verbiage
  - Relevance to credit union
  - Overall user experience
  - Edge case handling
  
**Holiday Considerations:** Can extend significantly if holidays involved (Dec/Jan, Thanksgiving, etc.)

#### Sub-Phase 3.3: Iterative Adjustments (2-3 weeks)
- Review client feedback
- Adjust responses and logic
- Retrain on mishandled scenarios
- Validate improvements
- Additional testing rounds as needed

**Deliverable:** Thoroughly tested, client-approved system

---

### Phase 4: Go-Live (1 day)
- **Deployment time:** 15-20 minutes
- **Production activation:** Switch from test to live
- **Member access:** Agent available to members
- **Monitoring:** Initial support team standing by
- **Communication:** Member notification (web, email, branch)

**Deliverable:** Live system serving members

---

### Phase 5: Post-Go-Live Support (2+ weeks minimum)
- **Success Assurance Period:** Intensive support following launch
- **Onboarding Manager:** Dedicated support for critical issues
- **Monitoring:** 24/7 watching for problems
- **Quick fixes:** Rapid response to issues
- **Member feedback:** Gathering real-world usage insights
- **Transition:** Handoff to ongoing AI Optimization Specialist

**Post-Launch:** Continuous optimization to achieve higher containment rates

---

## 📅 Implementation Timeline Summary

| Complexity Level | Duration | Best For |
|------------------|----------|----------|
| **Straightforward** | 4-6 weeks | Simple integrations, limited intent, after-hours only |
| **Standard** | 8-12 weeks | Full 24/7 deployment, multiple intents, comprehensive testing |
| **Complex** | 12+ weeks | Legacy system integration, third-party processors, large institutions |

### Timeline Flexibility Factors
- **Phased go-live:** Often start with unauthenticated calls, then add transactional
- **After-hours first:** Deploy night/weekend before full 24/7
- **Buffer week:** Plan for end-user training before go-live
- **Third-party delays:** Jack Henry involvement can add 2-4 weeks

---

## 💼 Use Cases & Applications

### Primary Use Case: Customer Service Automation
Automate responses to high-volume, routine inquiries:
- Account balance inquiries
- Transaction history requests
- Loan details and payment info
- Branch hours and locations
- Routing numbers
- Product information (CD rates, loan types, savings options)

### Use Case: IVR System Replacement
Replace traditional menu-driven IVR with natural conversation:
- "Press 1 for account balance" → "Just ask for your balance"
- Natural language understanding vs. menu selection
- Higher member satisfaction
- Better first-contact resolution
- Reduced call time

### Use Case: 24/7 Member Support
Provide round-the-clock support outside business hours:
- Members can call anytime and get immediate help
- No waiting for business hours
- Reduces member frustration
- Competitive advantage vs. local banks

### Use Case: Call Routing & Redirection
Intelligently direct calls to appropriate department:
- Understand caller's intent
- Route to correct department
- Reduce misdirected calls
- Improve first-contact resolution
- Optimize staff utilization

### Use Case: Outbound Communication (UNIQUE ELTROPY CAPABILITY)
Use voice agents for proactive member outreach:
- **Payment reminders:** "Your loan payment is due in 3 days"
- **Feedback collection:** "How was your recent visit?"
- **Promotional updates:** "New CD rates available"
- **Account notifications:** "Unusual activity on your account"
- **Service recovery:** "We noticed an issue with your loan application"
- **Member engagement:** "You're pre-approved for a credit increase"

### Use Case: Loan Servicing
Specialized handling of loan-related inquiries:
- Payoff amount quotes
- Payment status and history
- Deferment/forbearance options
- Refinance eligibility
- Prepayment penalty information
- Loan modification options

### Use Case: Card Services
Support for credit/debit card members:
- Fraud reporting and replacement cards
- PIN reset assistance
- Transaction disputes
- Activation of new cards
- Balance transfers
- Rewards program information

### Use Case: Appointment Management
Booking and scheduling capability:
- "Would you like to book an appointment?"
- Send text link for calendar selection
- Member picks preferred time/branch
- Confirmation sent to both member and staff
- Reduces missed appointments

### Use Case: Internal Knowledge Base
Support for credit union staff:
- Policy and procedure questions
- Compliance requirement lookups
- Product information for staff training
- Regulatory guidance
- Best practices reference

---

## 🏆 Competitive Advantages

### Accuracy & Performance
- **98% accuracy** on member requests (vs. competitor claims)
- **88% containment** demonstrated on 11.8M real questions
- **1.5 min average** interaction time (efficient)
- **3x capacity** multiplier for staff

### Implementation
- **4-12 week timeline** faster than enterprise solutions
- **Straightforward implementations** 4-6 weeks
- **Client-driven testing** ensures buy-in and quality
- **Self-service management** reduces vendor dependency

### Integration Capability
- **Deep core system integration** (Symitar, Fiserv, CU Answers)
- **Transactional capability** not just informational
- **Omnichannel** (voice + text + video + chat)
- **Seamless escalation** with context passing

### Bidirectional Capability
- **Inbound voice agents** handle member calls
- **Outbound voice agents** proactively reach members
- **Unique advantage:** Most competitors only do inbound
- **Revenue potential:** Loan offers, renewal reminders, upsells

### Financial Impact
- **497% ROI proven** with <90 day payback
- **$150K-$800K+ annual savings** depending on size
- **86% cost reduction** per interaction
- **Predictable pricing** flat fee vs. per-minute

### Regulatory Alignment
- **SR 11-7 compliant** (model risk management)
- **GLBA compliant** (financial privacy)
- **CFPB aligned** (fair lending, consumer protection)
- **TCPA compliant** (outbound calling)
- **Complete audit trails** for regulator review

---

## 📈 Success Metrics to Track

### Operational Metrics
- **Containment rate:** % of calls resolved without live agent
- **Call volume:** Total calls handled per month
- **Deflection:** Reduction in live agent call volume
- **Interaction time:** Average duration per call
- **Accuracy rate:** % of correct responses

### Business Metrics
- **Cost savings:** Direct reduction in labor costs
- **ROI:** Return on investment timeline
- **Payback period:** When investment is recouped
- **Staff productivity:** Calls per agent increase
- **Staff retention:** Reduced burnout-related turnover

### Member Metrics
- **Satisfaction:** Survey scores on AI interactions
- **Adoption:** % of members using AI agent
- **Repeat usage:** Do members use it more than once?
- **NPS:** Net Promoter Score on AI interactions
- **Availability:** 24/7 support value to members

### Quality Metrics
- **First-contact resolution:** % resolved without escalation
- **Escalation quality:** Are handoffs to agents clean?
- **Member feedback:** Sentiment from satisfaction surveys
- **Error rate:** Frequency of incorrect responses
- **Recovery rate:** How quickly errors are corrected

---

## 🎓 Key Learnings & Best Practices

### Testing is Critical
- Allocate 4-6 weeks minimum for comprehensive testing
- Budget extra time around holidays
- Client testing ensures adoption and quality
- Iterative refinement significantly improves performance

### Core Integration Takes Time
- 2-4 weeks for core system connectivity is normal
- Third-party processors (Jack Henry) extend timelines
- Critical for transactional capability
- Plan accordingly in project timeline

### Phased Deployment Works Well
- Start with unauthenticated calls (info-only)
- Add transactional capability once tested
- Deploy after-hours first, then expand to 24/7
- Reduces risk and allows optimization

### Optimization is Ongoing
- Post-go-live AI specialist improves containment rates
- Continuous training on missed scenarios
- Monthly performance reviews identify improvements
- Target 70-80% containment over time

### Self-Service Management Reduces Costs
- Clients updating their own knowledge base
- No vendor dependency for routine updates
- Holiday schedules, rate changes, new products
- Faster turnaround for changes

---

## 📞 Contact & Support

For questions about Eltropy AI voice agent capabilities:
- **Implementation questions:** Ask about timeline and phases
- **Financial questions:** Discuss ROI and pricing models
- **Technical questions:** Review core system integrations
- **Use case questions:** Explore specific member service improvements

---

**Document Status:** Final  
**Next Update:** When new capabilities or case studies available  
**Used By:** Daily LTP Blog Generation System (updated daily at 10 AM IST)

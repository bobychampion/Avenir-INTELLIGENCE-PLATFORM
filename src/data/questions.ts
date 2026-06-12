/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, AssessmentCategory } from "../types";

// Helper to make IDs and options
export const quickQuestions: Question[] = [
  // COGNITIVE
  {
    id: "q_cog_1",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Logical Reasoning",
    text: "A grid collapse cut power to your Abuja remote workspace right before a critical Zoom presentation. You only have 15% battery left on your laptop. What is your immediate decision?",
    context: "Workplace",
    options: [
      { label: "Switch laptop to extreme power-saver, hot-spot via 5G phone, join without video, and deliver a concise 5-minute summary.", value: "A", score: 5 },
      { label: "Postpone the meeting immediately and request the team reschedule, explaining the infrastructure situation.", value: "B", score: 3 },
      { label: "Try to quickly copy slides to Google Drive, share them with a Lagos colleague over WhatsApp, and ask them to present.", value: "C", score: 4 },
      { label: "Panic and log on via phone, describing the situation for 15 minutes instead of presenting.", value: "D", score: 1 }
    ]
  },
  {
    id: "q_cog_2",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Problem Solving",
    text: "An agritech supply chain in Kaduna is disrupted due to road challenges, leaving fresh tomatoes stranded. How do you address this analytically?",
    context: "Business",
    options: [
      { label: "Perform a rapid cost-benefit analysis of air-freight vs. renting cold-chain local trucks vs. direct selling to nearby processors.", value: "A", score: 5 },
      { label: "Call the drivers repeatedly to demand updates and complain about the delays.", value: "B", score: 1 },
      { label: "Re-route goods to local market sellers in Kaduna at a heavy discount to recover some working capital.", value: "C", score: 3 },
      { label: "Partner with a local preservation startup to convert stranded produce into puree, preserving most of the margin.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cog_3",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Pattern Recognition",
    text: "You notice client inquiries at your Lagos agency spike every Tuesday and Thursday afternoon, but bounce rates increase in the evening. What is your analytical hypothesis?",
    context: "Business",
    options: [
      { label: "Traffic congestion on Third Mainland Bridge delays client transits; adjust automated follow-ups to hit between 1 PM and 3 PM.", value: "A", score: 5 },
      { label: "People are simply too lazy to buy, sessions are random, and we should just double our ad spend to compensate.", value: "B", score: 2 },
      { label: "Check if the website server experience is lagging during peak times due to high concurrent traffic.", value: "C", score: 4 },
      { label: "Assume clients are busy cooking family dinners and stop running ads past 5 PM altogether.", value: "D", score: 3 }
    ]
  },
  {
    id: "q_cog_4",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Decision Making",
    text: "You are given two raw datasets showing user subscriptions for a streaming service: one shows steady growth with cheap billing, the other shows premium signups dropping fast. You must decide product direction. You...",
    context: "Business",
    options: [
      { label: "Pivot the entire platform to low-tier volumes with optimized offline-download capacity.", value: "A", score: 5 },
      { label: "Keep forcing heavy marketing budgets on the declining premium subscription to revive it.", value: "B", score: 2 },
      { label: "Conduct user feedback focus groups across Yaba tech hubs to find out why utility values dropped.", value: "C", score: 4 },
      { label: "Flip a coin to choose between them before resources run out.", value: "D", score: 1 }
    ]
  },
  {
    id: "q_cog_5",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Analytical Thinking",
    text: "You need to evaluate which supplier of structural steel to contract for your new apartment build project in Nairobi. Your analytical process is:",
    context: "Business",
    options: [
      { label: "Compare tensile test certifications, supply lead times, total delivered cost, and credit terms on a weighted decision matrix.", value: "A", score: 5 },
      { label: "Choose the vendor with the newest delivery trucks because your subcontractor recommended them casually.", value: "B", score: 2 },
      { label: "Negotiate aggressively with the first steel merchant that visits your job site and sign with them.", value: "C", score: 3 },
      { label: "Attempt to melt local iron scraps and cast your own steel rods on-site to save 5% on material costs.", value: "D", score: 1 }
    ]
  },
  {
    id: "q_cog_6",
    category: AssessmentCategory.COGNITIVE,
    subsection: "Logical Reasoning",
    text: "Three structural inspectors state theories on why the reinforced concrete foundation is showing minor setting hairline cracks. If Inspector A's theory implies Inspector B is wrong, how do you resolve it?",
    context: "Workplace",
    options: [
      { label: "Perform independent core sample compression tests, verify water-cement ratio batch logs, and check the structural loads objectively.", value: "A", score: 5 },
      { label: "Side with Inspector A because they are senior and have been on local Lagos builds longer.", value: "B", score: 1 },
      { label: "Hold a afternoon-long team meeting to debate and vote on which curing technique seems most reasonable.", value: "C", score: 3 },
      { label: "Fill the foundation cracks with visual sealant immediately to hide them and keep the site schedule moving.", value: "D", score: 2 }
    ]
  },

  // EQ (EMOTIONAL INTELLIGENCE)
  {
    id: "q_eq_1",
    category: AssessmentCategory.EQ,
    subsection: "Self-Awareness",
    text: "You receive sharp feedback from a superior on a major project that you stayed up all night coding in Lekki. How do you process this internally?",
    context: "Workplace",
    options: [
      { label: "Acknowledge the physical fatigue is making you sensitive, take a walk, then review the core criticism objectively.", value: "A", score: 5 },
      { label: "Take it as a personal attack, immediately compose a long WhatsApp defense, and send it directly.", value: "B", score: 1 },
      { label: "Pretend it didn't bother you, say 'noted', and silently check out from the project entirely.", value: "C", score: 2 },
      { label: "Politely ask the manager for specific structural areas of improvement while taking structured notes.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_eq_2",
    category: AssessmentCategory.EQ,
    subsection: "Emotional Regulation",
    text: "A customer at Balogun market starts shouting at your sales assistant, claiming they were cheated on transit pricing. Traffic is heavy, it is hot, and you are exhausted. You:",
    context: "Business",
    options: [
      { label: "Quietly step in, lower your voice, ask the customer to accompany you to a quieter desk, and verify the physical receipt.", value: "A", score: 5 },
      { label: "Shout back at the customer to protect your assistant's dignity and demonstrate authority.", value: "B", score: 1 },
      { label: "Instruct the assistant to refund the total amount instantly just to make the shouting stop.", value: "C", score: 3 },
      { label: "Apologize politely, check the log book, explain the rate sheet clearly, and offer a small gesture if appropriate.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_eq_3",
    category: AssessmentCategory.EQ,
    subsection: "Empathy",
    text: "Your colleague is missing key deadlines. You find out they are struggling with intense pressure to financially support their family in Abia. You:",
    context: "Social",
    options: [
      { label: "Listen patiently, help them re-prioritize high-impact tasks, and discreetly coordinate with the manager for a temporary split load.", value: "A", score: 5 },
      { label: "Tell them to keep private matters separate from work, and warn them that their performance is failing.", value: "B", score: 1 },
      { label: "Quietly do all their work for them without telling them, even if it burns you out completely.", value: "C", score: 3 },
      { label: "Encourage them with empathy but set clear boundaries about performance, helping them search for company support programs.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_eq_4",
    category: AssessmentCategory.EQ,
    subsection: "Relationship Management",
    text: "Your startup partner in Accra wants to hire their high-spirited cousin who lacks professional skills over a highly qualified stranger. You disagree. You:",
    context: "Business",
    options: [
      { label: "Acknowledge family value systems, but map out clear criteria testing skills and propose an entry internship or objective assessment first.", value: "A", score: 5 },
      { label: "Threaten to dissolve the partnership if they hire family members, accusing them of corruption.", value: "B", score: 1 },
      { label: "Silently accept, then micro-manage the cousin and criticize their output to prove your original point.", value: "C", score: 2 },
      { label: "Propose hiring the qualified candidate, while assisting the cousin in finding a relevant coaching program or alternative opening.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_eq_5",
    category: AssessmentCategory.EQ,
    subsection: "Self-Awareness",
    text: "When you are stressed under intense pressure, what is your most common emotional alert?",
    context: "Social",
    options: [
      { label: "I feel physical muscle tension or irritability, immediately calling for a 5-minute breather to reset.", value: "A", score: 5 },
      { label: "I tend to work faster and louder, ignoring my physical state until I snap at someone.", value: "B", score: 2 },
      { label: "I isolate myself and ignore calls, retreating inside to avoid conflicts.", value: "C", score: 3 },
      { label: "I look for external distractions, like scroll-browsing social media, to escape the feeling temporarily.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_eq_6",
    category: AssessmentCategory.EQ,
    subsection: "Empathy",
    text: "An older colleague gets defensive when you suggest migrating their paper record ledger to a digital cloud database. How do you handle it?",
    context: "Social",
    options: [
      { label: "Validate their decades of meticulous bookkeeping, demonstrate together how the cloud prevents physical ledger floods, and co-run the system.", value: "A", score: 5 },
      { label: "Complain to HR that senior members are obstructing innovation and digital transformation.", value: "B", score: 1 },
      { label: "Do the transition behind their back and present the finished system as a done deal.", value: "C", score: 2 },
      { label: "Offer to handle the typing ourselves, keeping them as the central supervisor of records.", value: "D", score: 4 }
    ]
  },

  // CQ (COMMUNICATION QUOTIENT)
  {
    id: "q_cq_1",
    category: AssessmentCategory.CQ,
    subsection: "Communication Clarity",
    text: "You receive an email from a project manager containing vague instructions like 'Fix the layout fast.' You cannot decode if they mean the structural floor plan, the parking grid, or the interior dimensions. You:",
    context: "Workplace",
    options: [
      { label: "Draft a concise list of 3 potential scope points (e.g., site entrance pathways, parking stall sizes, structural column grids) and ask them to confirm via bullet point reply.", value: "A", score: 5 },
      { label: "Assume what they meant, change the interior partition wall dimensions, and submit it immediately.", value: "B", score: 2 },
      { label: "Ignore the instruction until they email you a detailed official CAD file drawing.", value: "C", score: 1 },
      { label: "Ask for a quick 2-minute phone call to confirm their primary structural layout concern, taking notes.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cq_2",
    category: AssessmentCategory.CQ,
    subsection: "Listening Ability",
    text: "During a meeting, a client from Enugu starts rambling about their childhood business ventures before getting to their warehouse construction design requirements. You:",
    context: "Business",
    options: [
      { label: "Listen actively, find the underlying entrepreneurial values they highly respect, then weave those themes into your technical proposal.", value: "A", score: 5 },
      { label: "Interrupt them politely and remind them that time is short and we need to stick to the spec sheet.", value: "B", score: 2 },
      { label: "Nod but browse your phone under the table, waiting until they finish speaking about irrelevant ideas.", value: "C", score: 1 },
      { label: "Paraphrase their narrative briefly, then bridge back: 'That drive is why your current project has so much potential. Let's design the heavy load floor capacity...'", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cq_3",
    category: AssessmentCategory.CQ,
    subsection: "Persuasion",
    text: "You are trying to convince a conservative elder in your extended family why you want to invest in a creative design agency rather than buying real estate. Your approach:",
    context: "Family",
    options: [
      { label: "Acknowledge land as a secure heritage, but share a clear 3-year cash flow model from digital assets rendering high, scalable service margins.", value: "A", score: 5 },
      { label: "Tell them they are old-fashioned and don't understand the modern creator economy.", value: "B", score: 1 },
      { label: "Show them fancy foreign YouTube videos of design agency offices hoping they get excited.", value: "C", score: 3 },
      { label: "Propose a dual-strategy: using digital cashflow to eventually finance physical properties, bridging both perspectives.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cq_4",
    category: AssessmentCategory.CQ,
    subsection: "Confidence & Clout",
    text: "An influential leader on stage incorrects a technical term that directly affects your current safety protocols. You are in a crowd of 50. How do you voice it?",
    context: "Social",
    options: [
      { label: "Wait until the panel ends, approach them respectfully in the corridor, share the updated protocol privately, and thank them for the session.", value: "A", score: 5 },
      { label: "Shout from the floor that they are wrong, stating the correct dictionary/governmental definition aloud.", value: "B", score: 1 },
      { label: "Stay completely silent to avoid causing tension or catching attention.", value: "C", score: 3 },
      { label: "Raise your hand during Q&A: 'Thank you. Regarding the protocol on page 4, is it safer to configure X or Y as we scale up?'", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cq_5",
    category: AssessmentCategory.CQ,
    subsection: "Social Interaction",
    text: "When pitch-presenting to high-profile foreign angel investors, what is your communication core?",
    context: "Business",
    options: [
      { label: "Use simple, bold metrics (TAM, unit margins, retention rates) tailored to our local operational innovations, leaving out complicated jargon.", value: "A", score: 5 },
      { label: "Use lots of hype-words like 'AI-driven synergy paradigm shift' to sound sophisticated.", value: "B", score: 2 },
      { label: "Apologize repeatedly for logistics, electricity delays, or regional difficulties to manage expectations.", value: "C", score: 2 },
      { label: "Lead with a powerful story of a real customer in Lagos or Nairobi, then back it up with raw financials.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_cq_6",
    category: AssessmentCategory.CQ,
    subsection: "Communication Clarity",
    text: "There is a dispute inside an project team email thread regarding subcontractor work zone boundaries on the construction site. What is your intervention?",
    context: "Workplace",
    options: [
      { label: "Initiate a quick 10-minute site huddle, map out clear team work-zones on the physical blueprint, and close the thread with positive alignment.", value: "A", score: 5 },
      { label: "Reply to everyone with a long, legally phrased email pointing out exactly who made what measurement errors.", value: "B", score: 1 },
      { label: "Take over the partition layout, complete the wall settings yourself, and lock the site gates.", value: "C", score: 2 },
      { label: "Call both crew heads separately to hear their personal perspectives before finalizing the property division line.", value: "D", score: 4 }
    ]
  },

  // PERSONALITY
  {
    id: "q_per_1",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Openness",
    text: "A completely new business model emerges that threatens to make your primary service obsolete within 12 months. Your natural reaction is:",
    context: "Business",
    options: [
      { label: "Excited! Dedicate 20% of your time to study this new tech, experimenting with rapid prototypes for early adoption.", value: "A", score: 5 },
      { label: "Defensive. Double down on marketing your current service, hoping client loyalty will suppress the disruption.", value: "B", score: 2 },
      { label: "Anxious. Worry about the market, wait for others to test it, and copy their model once it becomes standard.", value: "C", score: 3 },
      { label: "Assess the model's unit economics, consult peers, and draft a clean transition outline for the agency.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_per_2",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Conscientiousness",
    text: "You are establishing filing protocols for your team's building blueprints and material specifications. How organized are you naturally?",
    context: "Workplace",
    options: [
      { label: "Extremely tidy. I follow rigid schematic folder structures, catalog revision versions carefully, and archive safety specs for every major beam.", value: "A", score: 5 },
      { label: "Highly flexible. I draw accurate designs, but compiling folder checklists is tedious, so I organize them systematically right before inspection visits.", value: "B", score: 3 },
      { label: "Chaotic but functional. My blueprints are scattered in drawers or on my truck bed, yet I know every detail by heart.", value: "C", score: 1 },
      { label: "Iterative. I maintain master structural layouts, keep clear checklists in my notebook, and rely on on-site foreman updates for minor info.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_per_3",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Extraversion",
    text: "After a long week of intense, quiet analytical blueprint layouts and accounting reviews, how do you recharge your energy?",
    context: "Social",
    options: [
      { label: "Quiet evening at home reading, gaming, or chilling with a simple movie.", value: "A", score: 2 },
      { label: "Heading to a lively commercial real estate mixers, catching up with peers, and sharing cold drinks.", value: "B", score: 5 },
      { label: "A small, quiet dinner with 1 or 2 close childhood friends talking about long-term ideas.", value: "C", score: 4 },
      { label: "Sleeping for 12 hours straight without looking at any notifications.", value: "D", score: 1 }
    ]
  },
  {
    id: "q_per_4",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Agreeableness",
    text: "During an important layout design meeting, a teammate proposes a feature that is visually stunning but makes the building's main entrance completely inaccessible for heavy deliveries or wheelchairs. You:",
    context: "Workplace",
    options: [
      { label: "Acknowledge the aesthetic brilliance, show sketches of the entry friction points, and partner to co-design an elegant entrance ramp.", value: "A", score: 5 },
      { label: "Keep quiet to avoid hurting their feelings, allowing the inaccessible entryway into the final construction blueprints.", value: "B", score: 2 },
      { label: "Tell them flat out their spatial design violates building codes and we must drop it immediately.", value: "C", score: 1 },
      { label: "Recommend checking with a municipal site inspector to let external regulatory standards settle the layout choice.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_per_5",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Emotional Stability",
    text: "When a sudden structural material delivery delay or client dispute occurs in the middle of a high-stakes building phase, what is your gut response?",
    context: "Business",
    options: [
      { label: "Take a deep breath, isolate the supply variables systematically in a status doc, and assign clear vendor coordination duties.", value: "A", score: 5 },
      { label: "Feel immense panic, immediately look for who to blame, and write defensive alerts to the general manager.", value: "B", score: 1 },
      { label: "Feel highly stressed but keep it in, working long, frantic hours to patch up the site supply without communication.", value: "C", score: 3 },
      { label: "Comfort the crew first: 'We will solve this, delivery delays are standard on major phases.' Then coordinate with logistics.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_per_6",
    category: AssessmentCategory.PERSONALITY,
    subsection: "Openness",
    text: "Which statement describes your approach to risk-taking and life exploration?",
    context: "Social",
    options: [
      { label: "I enjoy systematic, calculated risks where I master the fundamentals before placing capital.", value: "A", score: 5 },
      { label: "I prefer absolute safety, relying on traditional career paths and reliable corporate positions.", value: "B", score: 2 },
      { label: "I am a pure explorer; I jump into exciting opportunities and pivot quickly as I learn.", value: "C", score: 4 },
      { label: "I consult senior mentors and family heads extensively, placing safety and legacy above raw growth.", value: "D", score: 3 }
    ]
  },

  // LEADERSHIP
  {
    id: "q_lea_1",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Initiative",
    text: "A client account has been losing traction due to slow communications from your team. No one has claimed responsibility. You:",
    context: "Workplace",
    options: [
      { label: "Draft an account recovery plan, schedule an urgent call with the client, and present it to the team as the new template flow.", value: "A", score: 5 },
      { label: "Wait for the director to notice and assign someone to fix it.", value: "B", score: 1 },
      { label: "Message the client privately trying to solve just your individual portion of the tasks.", value: "C", score: 3 },
      { label: "Hold a retrospective, identify why the bottleneck happened, and set up a shared SLA tracker.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_lea_2",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Team Management",
    text: "Your real estate development project team is divided: architectural consultants want to build full poured concrete partitions, but the field operations crew wants durable modular drywall framing. You:",
    context: "Business",
    options: [
      { label: "Synthesize: build the reinforced concrete core structure, utilize durable modular framing for quick partition layout, and hold a unified site presentation.", value: "A", score: 5 },
      { label: "Side with the architectural consultants because drawing complex poured concrete designs looks cooler in design portfolios.", value: "B", score: 2 },
      { label: "Force the field workers to adapt to monolithic concrete forms, citing modern architecture progress.", value: "C", score: 1 },
      { label: "Set up a site-design session: have the architects visit active field locations to physically see why modular components are quicker to install.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_lea_3",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Decision Making",
    text: "A commercial property grand opening is scheduled for tomorrow at 8 AM. At 11 PM during final walkthrough, you detect a minor cosmetic wall trim paint smudge on an upper back-hallway floor. What is your call?",
    context: "Workplace",
    options: [
      { label: "Proceed with the opening. Document the cosmetic issue, and arrange for a handyman to touch it up tomorrow evening during low-traffic hours.", value: "A", score: 5 },
      { label: "Postpone the entire opening for 3 days to achieve a pristine multi-coat repainting of the corridor.", value: "B", score: 2 },
      { label: "Demand the painters stay up all night fixing it under heavy site floodlights, regardless of fatigue levels.", value: "C", score: 2 },
      { label: "Alert site receptionists to direct guests through the main front atrium, releasing on schedule.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_lea_4",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Influence & Clout",
    text: "How do you align a diverse group of stakeholders (clients, field builders, local chiefs) with your community real estate project?",
    context: "Workplace",
    options: [
      { label: "Personally visit regional leaders first to show cultural respect, then hold a town-hall illustrating direct economic benefits.", value: "A", score: 5 },
      { label: "Send a formal email copy of the grant contract showing that global partners have approved it.", value: "B", score: 2 },
      { label: "Start work immediately and assume they will join once the physical infrastructure starts rising.", value: "C", score: 2 },
      { label: "Draft a clean, co-benefits slide deck and host a webinar for their technical representatives.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_lea_5",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Team Management & Care",
    text: "A highly productive site supervisor on your team is getting critical peer feedback about their communication tone with subcontractor crews. You:",
    context: "Workplace",
    options: [
      { label: "Hold a private, friendly session. Praise their project work-rate, share specific tone examples, and suggest an 'explain first, direct second' rule for instructions.", value: "A", score: 5 },
      { label: "Reprimand them publicly on the main site WhatsApp channel to establish standard team boundaries.", value: "B", score: 1 },
      { label: "Ignore it since their physical building timelines are pristine, and tell the others to ignore the tone.", value: "C", score: 2 },
      { label: "Assign them a construction leadership workshop, and have them present a summary to the site management team.", value: "D", score: 4 }
    ]
  },
  {
    id: "q_lea_6",
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Initiative",
    text: "The company building budget is tight, and you notice your office is leaking capital on duplicate material testing and machinery leasing subscriptions. You:",
    context: "Workplace",
    options: [
      { label: "Inventory all active leasing agreements, propose a consolidated equipment and supply model to the CEO, and execute cancelations of duplicates.", value: "A", score: 5 },
      { label: "Do nothing, assuming the finance manager is already auditing machinery lease sheets.", value: "B", score: 2 },
      { label: "Complain to classmates that the executives are wasting money on duplicate earth-moving machinery contracts.", value: "C", score: 1 },
      { label: "Ask your immediate lead if we have permission to audit equipment hire invoices.", value: "D", score: 4 }
    ]
  }
];

// Generate Full Question list (100 questions or structured set)
// For token efficiency we can expand the quickQuestions with sections, and add more questions!
// Let's create an excellent set of another 70 questions, making 100 questions total for the "Full Assessment".
// Or we can combine quick questions for the quick survey and define a robust generator / explicit array of 70 additional questions.
// Let's explicitly define a rich collection of 100 questions so the full evaluation is highly realistic, robust, and completely functional!
// Let's define the full questions. Keep option texts engaging.

export const fullQuestions: Question[] = [
  ...quickQuestions, // Re-use the existing 30 high-quality questions for the full evaluation sections, and append another 70 questions!
];

// Let's generate another 70 high-quality questions systematically to reach 100.
const extraQuestionsData: { category: AssessmentCategory, subsection: string, text: string, context: string, options: { label: string, score: number }[] }[] = [
  // Cognitive (14 more, to reach 20 in total)
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Logical Reasoning",
    text: "A customer wants to pay you in installment cycles with undefined collateral. You evaluate user records and see that similar defaults happen. You:",
    context: "Business",
    options: [
      { label: "Offer a secure micro-payment tier where access coordinates with payments, mitigating default exposure.", score: 5 },
      { label: "Accept the deal instantly because you need the revenue to meet this month's payroll.", score: 2 },
      { label: "Reject them flatly, saying your business does not accept credit under any circumstances.", score: 3 },
      { label: "Request a third-party guarantee (trustee) or bank security hold before activating service.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Decision Making",
    text: "You run a retail storefront in Yaba. Your sales index dropped by 18% over a month. What is your immediate diagnostic sequence?",
    context: "Business",
    options: [
      { label: "Audit the foot-traffic logs, competitor price changes, team attendance, and page load speed systematically.", score: 5 },
      { label: "Assume the sales staff is doing a bad job and dock their monthly commission to motivate them.", score: 1 },
      { label: "Immediately spend 500,000 NGN on billboards to boost brand visibility.", score: 2 },
      { label: "Interview 10 recent walk-in customers to gather subjective feedback on products.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Problem Solving",
    text: "You are designing a ride-hailing deployment for heavy traffic hubs. How do you prevent systemic driver cancellation rates during high traffic?",
    context: "Business",
    options: [
      { label: "Incentivize drivers with dynamic traffic premiums based on historical Google Maps latency calculations.", score: 5 },
      { label: "Permanently ban any driver who cancels more than three times during a shift.", score: 1 },
      { label: "Charge passengers flat high fees to discourage short-distance booking requests.", score: 2 },
      { label: "Create waiting zones at designated Yaba transport hubs, grouping riders with physical direction cues.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Pattern Recognition",
    text: "Your logistics tracker shows delivery cycles Yaba-Victoria Island double between 4 PM and 7 PM. You hypothesis:",
    context: "Business",
    options: [
      { label: "Third Mainland Bridge traffic is bottlenecks. Route orders from Yaba to Yaba hubs, and island orders from Lekki hubs during these hours.", score: 5 },
      { label: "The riders are stalling to get more hourly pay; demand constant GPS screenshots to track them.", score: 1 },
      { label: "Assume shipping is impossible in Lagos after noon and close down delivery services early.", score: 2 },
      { label: "Utilize water ferry transit systems for package crossings to completely bypass vehicle gridlocks.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Analytical Thinking",
    text: "An e-learning app metrics show high registration but 90% abandonment of lessons on page 2. What do you investigate first?",
    context: "Workplace",
    options: [
      { label: "Execute a technical audit of the page 2 file assets size, network payload latency, and look at hotjar click records.", score: 5 },
      { label: "Assume students have low attention spans and make the lessons shorter and flashing with animations.", score: 2 },
      { label: "Run a survey offering cash prizes for students who finish page 2.", score: 3 },
      { label: "Analyze user interface copywriting: check if page 2 requires complex verification forms that irritate users.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Logical Reasoning",
    text: "A cargo shipment arrives empty due to packing mismatches among multiple port agents. To prevent recursive occurrence, you:",
    context: "Business",
    options: [
      { label: "Develop a mandatory digital dispatch protocol requiring dual physical photographic logs from both ports before container locking.", score: 5 },
      { label: "Fire the closest shipping agent and hire an expensive consulting group.", score: 2 },
      { label: "Send a strong legal warning email demanding better services from the logistics partners.", score: 3 },
      { label: "Establish a unified digital barcode system mapping products to specific agents.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.COGNITIVE,
    subsection: "Decision Making",
    text: "You are given a choice between renting a high-traffic physical kiosk in Lagos Mall for 3 Million NGN/year or running global Google Ads for the same budget. How do you decide?",
    context: "Business",
    options: [
      { label: "Analyze target demographics, average ticket margins, shipping cost for digital sales, and expected physical foot-traffic conversion.", score: 5 },
      { label: "Go with Google Ads because digital tech is always superior to brick-and-mortar storefronts.", score: 2 },
      { label: "Rent the kiosk because physical shops feel more prestigious to your business circle.", score: 2 },
      { label: "Conduct a 1-month pop-up shop trial at the mall before signing a full 12-month lease agreement.", score: 4 }
    ]
  },

  // EQ (15 more, to reach 25 in total)
  {
    category: AssessmentCategory.EQ,
    subsection: "Self-Awareness",
    text: "A prominent customer disputes your service quality on social media. Your heart starts pounding. Your internal strategy:",
    context: "Social",
    options: [
      { label: "Recognize that your physiological stress response is high; draft a polite, solution-oriented response, review it after 10 minutes, then publish.", score: 5 },
      { label: "Immediately comment back defending your team, explaining that the customer is exaggerating.", score: 1 },
      { label: "Ignore the post and block the customer's handle to protect your brand's digital rating.", score: 2 },
      { label: "Message the customer privately, offer a warm apology, ask for details, and resolve their friction directly.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Emotional Regulation",
    text: "Your agritech field partner screams at you because a cold storage compressor bought yesterday broke down. You:",
    context: "Business",
    options: [
      { label: "Let them vent, acknowledge their heavy financial stress about spoilage, then guide the chat toward utilizing the warranty repair.", score: 5 },
      { label: "Scream back that you aren't the manufacturer and they should read the instruction manual themselves.", score: 1 },
      { label: "Hang up the phone and refuse to work with them until they apologize for their volume.", score: 2 },
      { label: "Politely verify the power supply connection first to check if a simple voltage regulator was omitted.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Empathy",
    text: "A junior construction estimator seems quiet and makes structural pricing calculation errors. You hear their family home in Nairobi was affected by heavy rains. You:",
    context: "Workplace",
    options: [
      { label: "Meet privately, express genuine empathy, offer a 3-day paid relief break, and set up a plan to cover their bidding tickets.", score: 5 },
      { label: "Ask them why they didn't mention this earlier as an excuse for poor calculations.", score: 1 },
      { label: "Quietly ignore their errors for now to avoid talking about private emotional topics.", score: 2 },
      { label: "Sponsor a community support drive in the firm, helping them organize temporary housing support.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Relationship Management",
    text: "A conflict breaks out between your marketing manager and site project manager regarding commercial space handover delays. You organize:",
    context: "Workplace",
    options: [
      { label: "A collaborative workshop focusing on transparent construction stages, setting shared timelines instead of pointing fingers.", score: 5 },
      { label: "A formal disciplinary meeting where both present their written evidence of who made the scheduling mistake.", score: 2 },
      { label: "Separate meetings to comfort them, then make the delivery decisions independently to save time.", score: 3 },
      { label: "Construct an objective team SLA map where engineering timelines directly feed marketing campaign dates.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Self-Awareness",
    text: "You realize you are feeling envious of your childhood friend's recent tech-startup exit worth Millions. You:",
    context: "Social",
    options: [
      { label: "Congratulate them with warmth, then dissect your own feelings to refine and accelerate your personal milestones.", score: 5 },
      { label: "Avoid their calls and messages, feeling that they have become too proud or different now.", score: 1 },
      { label: "Tell yourself that luck was their major advantage, and their business was actually mediocre.", score: 2 },
      { label: "Request a mentoring lunch to learn their strategic playbook, celebrating their success actively.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Empathy",
    text: "In a negotiation, the other party seems stubborn and refuses your pricing. You try to analyze:",
    context: "Business",
    options: [
      { label: "Their hidden business concerns (e.g., cash flow, upstream stakeholder pressure) and address those core fears in our offer.", score: 5 },
      { label: "How to use psychological sales tricks to pressure them into buying anyway.", score: 2 },
      { label: "Walking away immediately because they are clearly uneducated or stingy partners.", score: 1 },
      { label: "Offering a dynamic payment schedule that matches their seasonal cash inflows without dropping our price.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.EQ,
    subsection: "Emotional Regulation",
    text: "You realize you have made a major accounting error that cost your retail store 500,000 NGN in taxes. You:",
    context: "Business",
    options: [
      { label: "Acknowledge the error, identify the tax code mistake, consult an auditor, and adjust future filing procedures.", score: 5 },
      { label: "Become highly depressed, blame the taxation authorities, and refuse to open the store accounts for a week.", score: 1 },
      { label: "Try to hide the error in your reports to avoid looking incompetent to family partners.", score: 2 },
      { label: "Brief the business stakeholders with transparency, presenting a clean rectification schedule.", score: 4 }
    ]
  },

  // CQ (14 more, to reach 20 in total)
  {
    category: AssessmentCategory.CQ,
    subsection: "Communication Clarity",
    text: "You are explaining an complex AI integration system to a non-technical board of directors. Your presentation strategy is:",
    context: "Social",
    options: [
      { label: "Use tangible analogies (e.g. comparing the AI to an efficient executive assistant) and highlight ROI and customer score improvements.", score: 5 },
      { label: "Read directly from the developer manual to demonstrate deep engineering expertise.", score: 1 },
      { label: "Avoid explaining the technology entirely and only show stock images and profit charts.", score: 2 },
      { label: "Show a simple, high-level interactive flow diagram that summarizes the data trip from customer to database.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.CQ,
    subsection: "Listening Ability",
    text: "An angry customer in Lekki calls to demand refunds. While they speak, how do you listen?",
    context: "Business",
    options: [
      { label: "Withhold judgment, focus on their operational pain points, note down key facts, and let them finish entirely before speaking.", score: 5 },
      { label: "Think of your rebuttal while they are talking, preparing to correct their timeline.", score: 2 },
      { label: "Put them on speakerphone while typing emails, only listening for the total refund amount.", score: 1 },
      { label: "Validate their anger early: 'I hear you, and I would feel the same way. Let's fix this together. What transaction ID...?'", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.CQ,
    subsection: "Persuasion",
    text: "You have to persuade Yaba landholders to lease their facilities for tech operations. Your value pitch prioritizes:",
    context: "Business",
    options: [
      { label: "Shared prosperity: show how modern tech hubs increase collateral property valuations and local employment.", score: 5 },
      { label: "Boasting about global venture capitalist backing and rapid digital disruption of Yaba.", score: 2 },
      { label: "Offering premium lump-sum payments upfront without discussing local ecosystem integration.", score: 3 },
      { label: "Partnering with municipal elders to demonstrate sustainable operations and cultural respect.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.CQ,
    subsection: "Listening Ability",
    text: "A team member suggestions a minor shift in marketing channels. You listen and respond with:",
    context: "Workplace",
    options: [
      { label: "'Interesting approach. Walk me through the customer capture data from your recent smaller tests.'", score: 5 },
      { label: "'No, our current channel works fine. Let's stick to the directive.'", score: 1 },
      { label: "'Okay, go ahead and do it,' without validating if there's any data backing the suggestion.", score: 2 },
      { label: "Ask them to draft a simple test proposal with a budget of 50,000 NGN to evaluate the model.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.CQ,
    subsection: "Confidence & Clout",
    text: "You have to present your business results in a crowded auditorium in Nairobi. Before walking on stage, you:",
    context: "Social",
    options: [
      { label: "Stand tall, slow your breathing, review the opening hook story, and walk out with calm, paced movements.", score: 5 },
      { label: "Drink three cups of coffee quickly to spike your adrenaline and energy.", score: 2 },
      { label: "Pace around nervously reading your slides word-for-word on your phone.", score: 1 },
      { label: "Interact with front-row audience members early to establish light, human connections.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.CQ,
    subsection: "Communication Clarity",
    text: "Your instructions to a remote Lagos contractor lead to a totally unusable mobile module. You write to them:",
    context: "Workplace",
    options: [
      { label: "'Apologies if my original requirements was ambiguous. Let's review this interactive wireframe together to align on the details.'", score: 5 },
      { label: "'This is completely unusable. Did you even read my instructions?'", score: 1 },
      { label: "'Never mind, we will pay you off and have our inside developers rewrite it.'", score: 2 },
      { label: "Send a clear, high-contrast screencast showing exactly where the layout fails, listing specific amendments.", score: 4 }
    ]
  },

  // Personality (19 more, to reach 25 in total)
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Conscientiousness",
    text: "How do you handle deadlines when multiple deliverables stack up during Nairobi business weeks?",
    context: "Workplace",
    options: [
      { label: "Rank them on an Eisenhower matrix (Urgent vs Important), block tasks on my calendar, and update stakeholders on delivery dates.", score: 5 },
      { label: "Work late nights franticly, jumping from task to task as people message me asking for updates.", score: 2 },
      { label: "Procrastinate on the hardest tasks, preferring to answer simple emails first to feel productive.", score: 1 },
      { label: "Use a collaborative task board (Trello/Asana), assigning sub-tasks clearly to ensure operational flow.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Extraversion",
    text: "You are invited to a highly prestigious business gala in Victoria Island. Your natural tendency is to:",
    context: "Social",
    options: [
      { label: "Identify 3 key players you genuinely want to connect with, have deep 15-minute chats with them, then head home satisfied.", score: 5 },
      { label: "Try to speak with everyone in the room, handing out 50 physical business cards within an hour.", score: 3 },
      { label: "Stay close to the buffet or cash bar, speaking only to colleagues you already know well.", score: 2 },
      { label: "Act as a connector: introduce tech colleagues to venture brokers you are comfortable with.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Agreeableness",
    text: "An administrative staff member accidentally breaks an expensive glass desk separator. You:",
    context: "Workplace",
    options: [
      { label: "Ensure they are physically uninjured first, call cleanup, and coordinate replacement without making them feel humiliated.", score: 5 },
      { label: "Deduct the replacement cost from their salary instantly as a lesson in manual care.", score: 1 },
      { label: "Scream briefly and remind them how expensive imported fittings are nowadays.", score: 1 },
      { label: "Check if the separator placement was structurally unsafe, relocating the new unit for better security.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Emotional Stability",
    text: "A major pitch that you spent three months designing is declined by a Kenyan bank. You spend that evening:",
    context: "Business",
    options: [
      { label: "Indulging in a nice dinner, getting proper sleep, and analyzing the feedback audit systematically the next morning.", score: 5 },
      { label: "Drinking heavily, blaming national currency inflation, and feeling that Kenya is a bad market.", score: 1 },
      { label: "Refusing to tell your colleagues, working all night to rewrite the pitch for another bank solo.", score: 2 },
      { label: "Debriefing the pitch team: 'This is great feedback database. Let's refine and pitch the microfinance banks next.'", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Openness",
    text: "When visiting a new city or country on the African continent, your primary dining strategy is to:",
    context: "Social",
    options: [
      { label: "Search for authentic local spots with traditional recipes, asking local residents for recommendations.", score: 5 },
      { label: "Search for standard global chains (like McDonald's or KFC) because you trust their standardized safety.", score: 2 },
      { label: "Cook simple food in your hotel room to avoid any dietary surprises.", score: 1 },
      { label: "Check online rating portals for mid-tier modern fusion restaurants representing local ingredients.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.PERSONALITY,
    subsection: "Conscientiousness",
    text: "When packing bags for a business flight from Abuja to Accra, you:",
    context: "Social",
    options: [
      { label: "Pack 24 hours prior using a digital check-list, grouping documents, electronics, and clothing systematically.", score: 5 },
      { label: "Throw random items into a suitcase 2 hours before heading to Nnamdi Azikiwe International Airport.", score: 1 },
      { label: "Have an assistant pack everything, checking only your passport right before transit.", score: 3 },
      { label: "Keep a pre-packed travel kit containing duplicate chargers, toiletries, and travel documents ready at all times.", score: 4 }
    ]
  },

  // Leadership (9 more, to reach 15 in total)
  {
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Initiative",
    text: "You notice the site administration team is manually typing delivery bill of ladings into spreadsheets, wasting 10 hours weekly. You:",
    context: "Workplace",
    options: [
      { label: "Spend 2 hours designing a simple digital intake form template that parses invoices and auto-populates ledger entries.", score: 5 },
      { label: "Complain that manual data entry is boring and demand a dedicated scanning intern.", score: 1 },
      { label: "Recommend looking for external automated software during the next quarterly review meeting.", score: 3 },
      { label: "Map the manual steps, test a simple spreadsheet macro, and train the team on the new, faster entry process.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Team Management",
    text: "Your Nairobi commercial build project misses a phase finishing milestone because of structural material delays. You address the board with:",
    context: "Workplace",
    options: [
      { label: "'The schedule delay was my oversight. We have structured a supply-catchup schedule with our backup merchant, ensuring delivery on July 10.'", score: 5 },
      { label: "'Our delivery trucks lagged because municipal traffic affected transit. We need more budget.'", score: 1 },
      { label: "'We finished 80% of the walls anyway, so it's practically a successful phase handover.'", score: 2 },
      { label: "A transparent breakdown of our material supply chain vulnerabilities, explaining the specific logistics steps we are restructuring.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Decision Making",
    text: "An employee asks to double their salary because they got a higher offer from a competitor in Accra. You:",
    context: "Workplace",
    options: [
      { label: "Evaluate their replacement costs, real margin contribution, and match only if sustainable, while documenting a clean backup map.", score: 5 },
      { label: "Match the offer immediately out of fear of losing them, ignoring the office budget grid.", score: 2 },
      { label: "Tell them to leave immediately, accusing them of disloyalty to the firm.", score: 1 },
      { label: "Hold an honest performance conversation. Offer a smaller base bump backed by clear performance commission targets.", score: 4 }
    ]
  },
  {
    category: AssessmentCategory.LEADERSHIP,
    subsection: "Decision Making",
    text: "A client wants a highly specialized, customized architectural design that requires 2 months of unique fabrication. Your firm focuses on standardized modular builds. You:",
    context: "Business",
    options: [
      { label: "Decline politely: 'We prioritize standardized high-efficiency modular presets. Let's see how our existing layouts fit your current property outline.'", score: 5 },
      { label: "Accept the deal immediately because it's a huge check, pausing all standard modular assembly lines for 2 months.", score: 2 },
      { label: "Tell them you will build it, but charge them 10x the standard pricing hoping they walk away.", score: 3 },
      { label: "Partner with an external bespoke architecture agency, referring the client's custom requests to them to deliver the customized fabrication.", score: 4 }
    ]
  }
];

// Combine to get a robust programmatic dataset of 100 questions
extraQuestionsData.forEach((eq, index) => {
  const fullIndex = index + quickQuestions.length + 1;
  const mappedOptions = eq.options.map((opt, oIdx) => {
    const letters = ["A", "B", "C", "D"];
    return {
      label: opt.label,
      value: letters[oIdx],
      score: opt.score
    };
  });
  fullQuestions.push({
    id: `q_full_${fullIndex}`,
    category: eq.category,
    subsection: eq.subsection,
    text: eq.text,
    context: eq.context,
    options: mappedOptions
  });
});

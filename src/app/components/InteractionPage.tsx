import { useState } from "react";
import { InteractionResources } from "./InteractionResources";
import {
  ChevronRight,
  ChevronDown,
  Lightbulb,
  GitBranch,
  BookOpen,
  ClipboardList,
  FileText,
  MousePointerClick,
} from "lucide-react";

interface WeekData {
  week: number;
  title: string;
  topics: string[];
  subtopics: string[];
  assignment: string[];
  resources: string[];
  output?: string;
}

interface MonthData {
  month: number;
  title: string;
  weeks: WeekData[];
}

const MONTHS: MonthData[] = [
  {
    month: 1,
    title: "Foundations: Humans, Cognition, and Interaction",
    weeks: [
      {
        week: 1,
        title: "What Interactive Research & Design Actually Is",
        topics: [
          "UX Research vs HCI vs Interaction Design",
          "Human-centered design",
          "Why interaction is more than screens",
          "Research-driven design thinking",
          "Design as behavior shaping",
        ],
        subtopics: [
          "Product thinking vs research thinking",
          "User goals vs system goals",
          "Interaction as communication",
          "The role of context",
        ],
        assignment: [
          'Write a 1-page reflection on: "How do humans and systems talk to each other?"',
          "Pick 3 products and analyze their interaction style",
        ],
        resources: [
          "The Design of Everyday Things — Don Norman",
          "Designing Interactions — Bill Moggridge",
          "Intro HCI videos from NNG / Google UX / university lectures",
        ],
      },
      {
        week: 2,
        title: "Cognitive Science for Designers",
        topics: [
          "Perception",
          "Attention",
          "Memory",
          "Mental models",
          "Decision-making",
          "Cognitive load",
        ],
        subtopics: [
          "Working memory limits",
          "Recognition vs recall",
          "Attention switching",
          "Habits and automation",
          "Error-prone thinking",
        ],
        assignment: [
          "Choose one app you use daily and identify:",
          "Where it increases cognitive load",
          "Where it reduces cognitive load",
          "Where it supports mental models",
          "Where it breaks them",
        ],
        resources: [
          "Cognition or any intro cognitive psychology textbook",
          "Thinking, Fast and Slow — Daniel Kahneman",
          "Short articles on cognitive load in UX",
        ],
      },
      {
        week: 3,
        title: "Human Behavior, Emotion, and Motivation",
        topics: [
          "Emotion in design",
          "Motivation",
          "Habits",
          "Friction",
          "Trust",
          "Reward systems",
        ],
        subtopics: [
          "Why users abandon products",
          "Emotion and memory",
          "Micro-interactions and emotional response",
          "Behavioral triggers",
          "Ethical persuasion",
        ],
        assignment: [
          'Design a "behavior map" for one habit-based product:',
          "What triggers use",
          "What keeps users engaged",
          "What frustrates them",
          "What emotional state the product creates",
        ],
        resources: [
          "Emotional Design — Don Norman",
          "Articles on habit formation and UX psychology",
          "A short talk on behavioral design",
        ],
      },
      {
        week: 4,
        title: "Foundations of UX Research",
        topics: [
          "Research types",
          "Qualitative vs quantitative",
          "Exploratory vs evaluative research",
          "Research ethics",
          "Research questions",
        ],
        subtopics: [
          "Interviews",
          "Surveys",
          "Usability testing",
          "Contextual inquiry",
          "Diary studies",
          "Observation",
        ],
        assignment: [
          "Create a mini research plan for a simple product:",
          "Research goal",
          "3 research questions",
          "Method",
          "Participant type",
          "Expected insights",
        ],
        resources: [
          "UX research handbooks / university notes",
          "Nielsen Norman Group articles",
          "One recorded user interview example",
        ],
      },
    ],
  },
  {
    month: 2,
    title: "Research Methods, Accessibility, and Emotional Design",
    weeks: [
      {
        week: 5,
        title: "Interviewing and Listening Deeply",
        topics: [
          "Interview design",
          "Open-ended questioning",
          "Neutral probing",
          "Bias in research",
          "Listening for patterns",
        ],
        subtopics: [
          "Recruitment basics",
          "Consent",
          "Good vs leading questions",
          "Follow-up probes",
          "Interview note-taking",
        ],
        assignment: [
          "Do 1 mock interview with a friend or classmate about a simple digital habit",
          "Summarize: goals, pain points, emotional signals, repeated themes",
        ],
        resources: [
          "Interviewing guides from UX research sources",
          "Example interview scripts",
          "Articles on avoiding bias in research",
        ],
      },
      {
        week: 6,
        title: "Synthesis: Turning Raw Data into Insight",
        topics: [
          "Affinity mapping",
          "Thematic analysis",
          "Insight writing",
          "Problem framing",
          "Research storytelling",
        ],
        subtopics: [
          "Codes and themes",
          "Patterns vs anecdotes",
          "Insight vs observation",
          "Opportunity areas",
          "Research reports",
        ],
        assignment: [
          "Take your interview notes and create:",
          "5 themes",
          "3 insights",
          "2 opportunity statements",
        ],
        resources: [
          "Affinity mapping tutorials",
          "Dovetail or Miro synthesis examples",
          "UX research report examples",
        ],
      },
      {
        week: 7,
        title: "Accessibility Foundations",
        topics: [
          "Inclusive design",
          "Disability models",
          "Accessibility vs usability",
          "WCAG basics",
          "Assistive technologies",
        ],
        subtopics: [
          "Visual accessibility",
          "Auditory accessibility",
          "Motor accessibility",
          "Cognitive accessibility",
          "Temporary vs permanent limitations",
        ],
        assignment: [
          "Do an accessibility audit of one website/app:",
          "What helps",
          "What blocks",
          "What could be improved",
          "What matters most for different users",
        ],
        resources: [
          "WCAG overview",
          "Mismatch — Kat Holmes",
          "Accessibility articles and screen-reader demos",
        ],
      },
      {
        week: 8,
        title: "Cognitive Accessibility and Inclusive Interaction",
        topics: [
          "Low-stress design",
          "Plain language",
          "Memory-friendly interfaces",
          "Error prevention",
          "Clear paths and guidance",
        ],
        subtopics: [
          "Cognitive overload",
          "Repetition and confirmation",
          "Chunking information",
          "Reducing uncertainty",
          "Designing for neurodiversity",
        ],
        assignment: [
          "Redesign one confusing screen for:",
          "Better clarity",
          "Less memory load",
          "Easier recovery from errors",
        ],
        resources: [
          "Cognitive accessibility guides",
          "Articles on neurodiversity and UX",
          "Inclusive design case studies",
        ],
      },
    ],
  },
  {
    month: 3,
    title: "Interaction Design and Human-AI Foundations",
    weeks: [
      {
        week: 9,
        title: "Interaction Design Fundamentals",
        topics: [
          "Affordances",
          "Signifiers",
          "Feedback",
          "Constraints",
          "Mapping",
          "Flow",
        ],
        subtopics: [
          "Interaction patterns",
          "User journey and intent",
          "Micro-interactions",
          "State changes",
          "Error states",
        ],
        assignment: [
          "Pick 3 interactions from any product and break them into:",
          "Trigger",
          "Action",
          "Feedback",
          "Success state",
          "Failure state",
        ],
        resources: [
          "The Design of Everyday Things",
          "Interaction design pattern libraries",
          "Short UI behavior analyses",
        ],
      },
      {
        week: 10,
        title: "Prototyping for Research",
        topics: [
          "Low-fidelity prototyping",
          "Concept testing",
          "Paper prototypes",
          "Figma prototyping",
          "Interactive flows",
        ],
        subtopics: [
          "What to prototype and what not to",
          "Testing assumptions",
          "Rapid iteration",
          "Prototype realism",
        ],
        assignment: [
          "Build a simple prototype in Figma for one interaction:",
          "Onboarding",
          "Onboarding assist",
          "Error recovery",
          "Question answering",
        ],
        resources: [
          "Figma prototyping tutorials",
          "UX prototyping case studies",
          "Example paper prototype walkthroughs",
        ],
      },
      {
        week: 11,
        title: "Introduction to Human-AI Interaction",
        topics: [
          "AI as a collaborator",
          "AI as a tool",
          "AI as a system with uncertainty",
          "User trust and control",
          "Explanation and transparency",
        ],
        subtopics: [
          "Human agency",
          "Confidence and trust",
          "AI errors",
          "Uncertainty handling",
          "Responsible AI basics",
        ],
        assignment: [
          "Analyze one AI product:",
          "How it explains itself",
          "Where it fails",
          "How users recover",
          "Where trust is earned or lost",
        ],
        resources: [
          "Human-AI interaction articles",
          "Responsible AI primers",
          "Case studies of AI product mistakes",
        ],
      },
      {
        week: 12,
        title: "Research Project 1",
        topics: [
          "Research planning",
          "Method choice",
          "Study design",
          "Synthesis",
          "Presentation",
        ],
        subtopics: [],
        assignment: [
          "Run a small research study on a digital product or AI feature:",
          "2–3 users",
          "One task",
          "One interview",
          "One synthesis doc",
          "One insight deck",
        ],
        resources: [],
        output: "A polished research case study for your portfolio",
      },
    ],
  },
  {
    month: 4,
    title: "Voice Interfaces and Conversational AI",
    weeks: [
      {
        week: 13,
        title: "Voice UX Basics",
        topics: [
          "What makes voice different",
          "Spoken interaction patterns",
          "Tone and persona",
          "Turn-taking",
          "Confidence and error handling",
        ],
        subtopics: [
          "Speech vs text interactions",
          "Voice as interface",
          "User expectations",
          "Recovery in speech systems",
        ],
        assignment: [
          "Write a voice flow for:",
          "Weather",
          "Reminders",
          "Mental wellness check-in",
          "Simple support query",
        ],
        resources: [
          "Designing Voice User Interfaces — Cathy Pearl",
          "Voice UX articles",
          "Examples from Alexa / Google Assistant patterns",
        ],
      },
      {
        week: 14,
        title: "Conversational Design",
        topics: [
          "Conversation structure",
          "Intent and slots",
          "Dialogue flow",
          "Confirmation",
          "Clarification",
          "Repair strategies",
        ],
        subtopics: [
          "Natural conversation vs designed conversation",
          "Context handling",
          "State awareness",
          "Conversation failure",
        ],
        assignment: [
          "Design a conversation script for a support assistant. Include:",
          "Greeting",
          "Intent detection",
          "Fallback",
          "Clarification",
          "Graceful exit",
        ],
        resources: [
          "Conversational design articles",
          "Example chatbot scripts",
          "Voice flow pattern libraries",
        ],
      },
      {
        week: 15,
        title: "LLM Interfaces and Prompted Interaction",
        topics: [
          "LLM behavior",
          "Prompt-driven interfaces",
          "Chat UX",
          "Output uncertainty",
          "Memory and context",
        ],
        subtopics: [
          "Prompting patterns",
          "Context windows",
          "Hallucinations",
          "User trust in AI responses",
          "Feedback loops",
        ],
        assignment: [
          "Take a chatbot or assistant idea and design:",
          "The user goal",
          "The prompt structure",
          "The fallback behavior",
          "The trust signals",
        ],
        resources: [
          "Human-AI interaction papers/articles",
          "LLM UX discussions",
          "Example product interfaces using AI chat",
        ],
      },
      {
        week: 16,
        title: "Voice + Chat Research Mini Project",
        topics: [
          "User needs in spoken systems",
          "Voice errors",
          "Conversational friction",
          "Evaluation methods",
        ],
        subtopics: [],
        assignment: [
          "Do a mini project:",
          "Design a voice or chat assistant",
          "Test it with 2 people",
          "Note confusion points",
          "Improve the flow",
        ],
        resources: [],
        output: "A voice/conversational AI case study",
      },
    ],
  },
  {
    month: 5,
    title: "Multimodal AI, Emotional Design, Mental Health, Safety",
    weeks: [
      {
        week: 17,
        title: "Multimodal Interaction",
        topics: [
          "Text + voice + image",
          "Human interaction across modalities",
          "Switching modes",
          "Context-rich interfaces",
        ],
        subtopics: [
          "Multi-sensory input",
          "Visual + verbal coordination",
          "Seamless handoff between modalities",
          "Modal mismatch",
        ],
        assignment: [
          "Design a multimodal assistant that:",
          "Accepts text, image, and voice",
          "Responds differently based on context",
          "Keeps the experience simple",
        ],
        resources: [
          "Multimodal AI articles and demos",
          "Product examples like assistant tools",
          "HCI papers on multimodal experiences",
        ],
      },
      {
        week: 18,
        title: "Emotional Design in AI and Interfaces",
        topics: [
          "Emotional states and product experience",
          "Calm technology",
          "Empathy in design",
          "Tone of voice",
          "Personality design",
        ],
        subtopics: [
          "Comfort",
          "Reassurance",
          "Frustration reduction",
          "Warmth without manipulation",
        ],
        assignment: [
          "Redesign an AI assistant to feel:",
          "Calmer",
          "More supportive",
          "Less robotic",
          "More respectful of user emotion",
        ],
        resources: [
          "Emotional Design — Don Norman",
          "Calm technology articles",
          "Examples of emotionally aware UX",
        ],
      },
      {
        week: 19,
        title: "Mental Health Technology",
        topics: [
          "Mental health UX principles",
          "Support vs treatment",
          "Emotional safety",
          "Check-ins",
          "Crisis boundaries",
        ],
        subtopics: [
          "Stigma and privacy",
          "Gentle interaction",
          "Burnout support",
          "Journaling and reflection tools",
          "Ethical limits",
        ],
        assignment: [
          "Design a low-pressure mental wellness flow:",
          "Daily check-in",
          "Mood tracking",
          "Reflective prompt",
          "Exit options",
          "Safety boundaries",
        ],
        resources: [
          "Digital mental health articles",
          "Ethical design guidance",
          "Mental health app case studies",
        ],
      },
      {
        week: 20,
        title: "Ethics, Trust, and Responsible Design",
        topics: [
          "AI ethics",
          "Mental health ethics",
          "Persuasion ethics",
          "Data privacy",
          "User autonomy",
        ],
        subtopics: [
          "Manipulation vs support",
          "Dependency risks",
          "Sensitive data handling",
          "Transparency",
          "Consent and control",
        ],
        assignment: [
          "Write an ethics review of one AI or wellness experience:",
          "What is risky",
          "What is okay",
          "What needs guardrails",
          "What should be avoided",
        ],
        resources: [
          "Responsible AI frameworks",
          "Digital well-being articles",
          "Ethical UX case studies",
        ],
      },
    ],
  },
  {
    month: 6,
    title: "Capstone: Specialization Project",
    weeks: [
      {
        week: 21,
        title: "Choose Your Capstone",
        topics: [
          "Voice-first wellness assistant",
          "Conversational AI support tool",
          "Multimodal AI tutor",
          "Accessible AI companion",
          "Emotion-aware journaling system",
          "Cognitive accessibility-focused product",
        ],
        subtopics: [],
        assignment: [
          "Write your capstone brief:",
          "Problem",
          "Audience",
          "Context",
          "Goals",
          "Constraints",
          "Success measures",
        ],
        resources: [],
      },
      {
        week: 22,
        title: "Research for the Capstone",
        topics: [
          "Secondary research",
          "User needs",
          "Competitive analysis",
          "Persona / archetype creation",
          "Journey mapping",
        ],
        subtopics: [],
        assignment: [
          "Create:",
          "1 research summary",
          "1 persona",
          "1 journey map",
          "1 opportunity statement",
        ],
        resources: [],
      },
      {
        week: 23,
        title: "Prototype and Test",
        topics: [
          "Interaction flow",
          "Voice script",
          "AI response design",
          "Accessibility review",
          "Emotional tone review",
        ],
        subtopics: [],
        assignment: [
          "Build the prototype in Figma or as a simple interactive flow",
          "Test it with 2–3 people and collect feedback",
        ],
        resources: [],
      },
      {
        week: 24,
        title: "Final Portfolio Presentation",
        topics: [],
        subtopics: [],
        assignment: [
          "Create a portfolio case study with:",
          "Problem statement",
          "Research",
          "Insights",
          "Design decisions",
          "Prototype",
          "Testing findings",
          "Iterations",
          "Final reflection",
        ],
        resources: [],
        output: "Final portfolio-ready case study",
      },
    ],
  },
];

const MONTH_ACCENTS = [
  { color: "var(--chart-1)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
  { color: "var(--chart-3)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-4)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-5)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
];

// ─── Leaf list ────────────────────────────────────────────────────────────────
function ItemList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="flex flex-col gap-xs">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-sm">
          <span
            className="shrink-0 rounded-full"
            style={{ width: 4, height: 4, backgroundColor: accent, opacity: 0.55, marginTop: 7, flexShrink: 0 }}
          />
          <span style={{ color: "var(--foreground)", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Section label + content ──────────────────────────────────────────────────
function Section({
  icon,
  label,
  items,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  accent: string;
}) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-xs">
      <div className="flex items-center gap-xs" style={{ marginBottom: 4 }}>
        <span style={{ color: accent, opacity: 0.75 }}>{icon}</span>
        <span
          style={{
            color: "var(--muted-foreground)",
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </span>
      </div>
      <ItemList items={items} accent={accent} />
    </div>
  );
}

// ─── Week card ────────────────────────────────────────────────────────────────
function WeekCard({
  data,
  accent,
  expanded,
  onToggle,
}: {
  data: WeekData;
  accent: (typeof MONTH_ACCENTS)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const isCapstone = data.week >= 21;

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden transition-shadow"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${expanded ? accent.border : "var(--border)"}`,
        boxShadow: expanded ? `0 0 0 1px ${accent.border}` : "none",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-xl text-left transition-colors"
        style={{
          padding: "var(--space-lg) var(--space-xl)",
          backgroundColor: expanded ? accent.light : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!expanded) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = expanded ? accent.light : "transparent";
        }}
      >
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 28, height: 28, backgroundColor: accent.color, color: "#fff", fontSize: 12, fontWeight: 600 }}
        >
          {data.week}
        </span>

        <div className="flex-1 min-w-0">
          <p style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
            Week {data.week} — {data.title}
          </p>
          {isCapstone && (
            <span
              className="inline-block mt-xs rounded-full"
              style={{ padding: "1px 8px", fontSize: 10, fontWeight: 500, color: accent.color, backgroundColor: accent.light, border: `1px solid ${accent.border}` }}
            >
              Capstone
            </span>
          )}
        </div>

        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 24, height: 24, backgroundColor: "var(--accent)", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
        >
          <ChevronRight size={13} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>

      {/* Body */}
      {expanded && (
        <div
          className="grid gap-xl"
          style={{
            padding: "var(--space-lg) var(--space-xl) var(--space-xl)",
            borderTop: "1px solid var(--border)",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          <Section icon={<Lightbulb size={11} />}     label="Topics"      items={data.topics}      accent={accent.color} />
          <Section icon={<GitBranch size={11} />}     label="Subtopics"   items={data.subtopics}   accent={accent.color} />
          <Section icon={<ClipboardList size={11} />} label="Assignment"  items={data.assignment}  accent={accent.color} />
          <Section icon={<BookOpen size={11} />}      label="Resources"   items={data.resources}   accent={accent.color} />
          {data.output && (
            <div className="flex flex-col gap-xs">
              <div className="flex items-center gap-xs" style={{ marginBottom: 4 }}>
                <span style={{ color: accent.color, opacity: 0.75 }}><FileText size={11} /></span>
                <span style={{ color: "var(--muted-foreground)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Output</span>
              </div>
              <span
                className="inline-block rounded-[var(--radius-sm)]"
                style={{ padding: "4px 10px", fontSize: 12, fontWeight: 500, color: accent.color, backgroundColor: accent.light, border: `1px solid ${accent.border}`, lineHeight: 1.4 }}
              >
                {data.output}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Month section ─────────────────────────────────────────────────────────────
function MonthSection({
  data,
  accent,
  expandedWeeks,
  toggleWeek,
}: {
  data: MonthData;
  accent: (typeof MONTH_ACCENTS)[0];
  expandedWeeks: Set<number>;
  toggleWeek: (n: number) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-lg">
      {/* Month header — collapsible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left transition-colors rounded-[var(--radius-md)]"
        style={{ padding: "4px 0", cursor: "pointer", backgroundColor: "transparent" }}
      >
        <span
          className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
          style={{ width: 28, height: 28, backgroundColor: "var(--heading-accent)", color: "#fff", fontSize: 11, fontWeight: 700 }}
        >
          M{data.month}
        </span>
        <div className="flex-1 min-w-0 text-left">
          <p style={{ color: "var(--heading-accent)", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
            Month {data.month}
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.3 }}>
            {data.title}
          </p>
        </div>
        <span
          className="shrink-0 flex items-center justify-center rounded-full transition-transform"
          style={{
            width: 24,
            height: 24,
            backgroundColor: "var(--accent)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
          }}
        >
          <ChevronRight size={13} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>

      {/* Week cards */}
      {open && <div className="flex flex-col gap-md">
        {data.weeks.map((w) => (
          <WeekCard
            key={w.week}
            data={w}
            accent={accent}
            expanded={expandedWeeks.has(w.week)}
            onToggle={() => toggleWeek(w.week)}
          />
        ))}
      </div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function InteractionPage() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());

  function toggleWeek(week: number) {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  }

  function expandAll() {
    const all = MONTHS.flatMap((m) => m.weeks.map((w) => w.week));
    setExpandedWeeks(new Set(all));
  }

  function collapseAll() {
    setExpandedWeeks(new Set());
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div
        className="shrink-0 flex items-start justify-between gap-2xl"
        style={{
          padding: "var(--space-2xl)",
          paddingBottom: "var(--space-xl)",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        <div>
          <div className="flex items-center gap-md mb-xs">
            <MousePointerClick size={18} style={{ color: "var(--chart-3)" }} />
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Course Outline
            </span>
          </div>
          <h1
            style={{
              color: "var(--heading-accent)",
              fontSize: "var(--text-2xl, 22px)",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Interactive Research & Design
          </h1>
          <p
            className="mt-xs"
            style={{
              color: "var(--muted-foreground)",
              fontSize: "var(--text-sm, 13px)",
              lineHeight: 1.5,
            }}
          >
            6 months · 24 weeks · HCI, voice, AI, emotion, and capstone
          </p>
        </div>

        <div className="flex items-center gap-md shrink-0">
          <button
            onClick={collapseAll}
            className="rounded-[var(--radius-md)] transition-colors"
            style={{
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
          >
            Collapse all
          </button>
          <button
            onClick={expandAll}
            className="rounded-[var(--radius-md)] transition-colors"
            style={{
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--primary-foreground)",
              backgroundColor: "var(--primary)",
            }}
          >
            Expand all
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: "var(--space-2xl)", backgroundColor: "var(--background)" }}
      >
        <div className="flex flex-col gap-2xl max-w-4xl mx-auto">
          {MONTHS.map((m, i) => (
            <MonthSection
              key={m.month}
              data={m}
              accent={MONTH_ACCENTS[i]}
              expandedWeeks={expandedWeeks}
              toggleWeek={toggleWeek}
            />
          ))}
        </div>

        {/* Resources */}
        <div className="max-w-4xl mx-auto mt-2xl">
          <InteractionResources />
        </div>
      </div>
    </div>
  );
}

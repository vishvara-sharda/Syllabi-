import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Lightbulb,
  GitBranch,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Accessibility,
  Video,
  FlaskConical,
  Star,
} from "lucide-react";

interface WeekData {
  week: number;
  title: string;
  topics: string[];
  subtopics: string[];
  resources: string[];
  assignment: string[];
  portfolio: string;
  capstone?: {
    options: string[];
    submit: string[];
    anchors: string[];
  };
}

const WEEKS: WeekData[] = [
  {
    week: 1,
    title: "Foundations: what accessibility really is",
    topics: [
      "Accessibility vs usability vs inclusive design",
      "Disability models: medical, social, and interaction-based",
      "Temporary, situational, and permanent disabilities",
      "Assistive technologies and how people actually use them",
      'Why "average user" thinking fails',
    ],
    subtopics: [
      "Barriers in digital products",
      "Perceivable, operable, understandable, robust",
      "Ethics, dignity, and language in accessibility work",
    ],
    resources: [
      "W3C Accessibility Fundamentals Overview and Introduction to Web Accessibility",
      "How People with Disabilities Use the Web and Diverse Abilities and Barriers",
      "Microsoft Inclusive Design intro",
      "A Web for Everyone",
    ],
    assignment: [
      'Do a "barrier diary" for 3 digital products you use this week',
      "Write 1 page on what breaks for users, not just what looks bad",
    ],
    portfolio: 'A short "Accessibility Problem Framing" case note',
  },
  {
    week: 2,
    title: "WCAG 2.2, but actually understandable",
    topics: [
      "How WCAG is structured",
      "A, AA, AAA",
      "The four principles and why they matter in design and research",
      "Success criteria vs techniques vs understanding docs",
    ],
    subtopics: [
      "Reading WCAG like a researcher",
      "Mapping issues to success criteria",
      "When standards help and when they do not",
    ],
    resources: [
      "WCAG 2.2 standard and WCAG 2 Overview",
      "Understanding WCAG 2.2 and Quick Reference",
      "Web Accessibility Tutorials",
    ],
    assignment: [
      "Pick 2 screens from a product and map 10 issues to WCAG criteria",
      "Note which issues are legal/compliance problems and which are pure usability problems",
    ],
    portfolio: "A WCAG issue mapping sheet",
  },
  {
    week: 3,
    title: "Accessibility research methods",
    topics: [
      "Inclusive research planning",
      "Recruiting participants with disabilities respectfully",
      "Moderated and unmoderated testing",
      "Remote testing and accommodations",
      "Note-taking, consent, and trauma-aware moderation",
    ],
    subtopics: [
      "Research questions that matter to disabled users",
      "Accessibility in scripts, tasks, and probes",
      "Avoiding bias in synthesis",
      "Collaborative evaluation and mixed expertise teams",
    ],
    resources: [
      "Planning and Managing Web Accessibility",
      "Evaluating Web Accessibility Overview and Using Combined Expertise to Evaluate Web Accessibility",
      "W3C Digital Accessibility Foundations course",
      "Practical Web Accessibility",
    ],
    assignment: [
      "Write a research plan for an accessible usability study",
      "Include screener, consent notes, accommodations, and sample tasks",
    ],
    portfolio: "An accessibility research plan template you can reuse",
  },
  {
    week: 4,
    title: "Cognitive accessibility I: memory, attention, and language",
    topics: [
      "Cognitive load in digital products",
      "Attention, memory, and processing differences",
      "Reading complexity and comprehension",
      "Predictability and consistency",
      "Cognitive accessibility as design, not decoration",
    ],
    subtopics: [
      "Clear labels",
      "Reduced decision friction",
      "Chunking, scaffolding, and reminders",
      "Avoiding recall-heavy flows",
    ],
    resources: [
      "W3C COGA Task Force and Cognitive Accessibility work",
      "Making Content Usable for People with Cognitive and Learning Disabilities",
      "Cognitive and learning abilities/barriers overview",
    ],
    assignment: [
      "Redesign a login, sign-up, or checkout flow to reduce memory load",
      "Explain each change in plain language",
    ],
    portfolio: "Before/after cognitive accessibility redesign",
  },
  {
    week: 5,
    title: "Cognitive accessibility II: forms, tasks, and wayfinding",
    topics: [
      "Forms that do not punish users",
      "Error prevention and recovery",
      "Wayfinding, progress, and task completion",
      "Focus order, landmarks, and headings",
      "Plain language in interfaces",
    ],
    subtopics: [
      "Form labels and instructions",
      "Error messages that actually help",
      "Progress indicators and confirmations",
      "Task-based simplicity",
    ],
    resources: [
      "Web Accessibility Cookbook sections on structuring pages, forms, performing actions, and managing focus",
      "W3C tutorials",
      "Easy Checks and evaluation tools",
    ],
    assignment: [
      "Test a registration or application flow with 3 cognitive heuristics",
      "Can users recognize where they are?",
      "Can they recover from mistakes?",
      "Can they finish without remembering too much?",
    ],
    portfolio: "A cognitive walkthrough with annotated fixes",
  },
  {
    week: 6,
    title: "Mental health, emotional accessibility, and trauma-aware design",
    topics: [
      "Stress, anxiety, overload, and digital friction",
      "Trauma-aware content and interaction patterns",
      "Emotional tone in microcopy",
      "Safe defaults and user control",
      "When sensitive content needs extra care",
    ],
    subtopics: [
      "Avoiding shame language",
      "Reducing surprise and pressure",
      "Choice, pacing, and reassurance",
      "Supportive error states and recovery paths",
    ],
    resources: [
      "Accessibility and Digital Mental Health: Considerations for Accessible Design",
      "CDC preferred terms and inclusive communication guidance",
      "Microsoft Inclusive Design tools and guidance, including mental health and neurodiversity references",
    ],
    assignment: [
      "Audit one mental-health-related or emotionally sensitive flow",
      "Rewrite the onboarding, error states, and help content to lower stress",
    ],
    portfolio: "A trauma-aware content redesign",
  },
  {
    week: 7,
    title: "Voice interfaces and conversational UX",
    topics: [
      "Voice UX as an accessibility surface",
      "Speech recognition, voice control, and voice assistants",
      "Memory-heavy interactions in voice",
      "Confirmation, repair, and fallback patterns",
      "Multi-modal support: voice + text + touch",
    ],
    subtopics: [
      "Turn-taking and conversational cues",
      "Command discoverability",
      "Speech ambiguity and error recovery",
      "Accessible voice navigation",
    ],
    resources: [
      "W3C Natural Language Interface Accessibility User Requirements",
      "W3C Voice Systems and Conversational Interfaces",
      "W3C Speech Recognition perspective video",
      "Amazon Alexa accessibility guidance and Google Voice Access docs",
    ],
    assignment: [
      "Design a 10-turn voice flow for booking, help, or search",
      "Include three failure states and recovery options",
    ],
    portfolio: "A conversational flow spec with accessibility notes",
  },
  {
    week: 8,
    title: "AI interfaces and accessibility",
    topics: [
      "AI as a support tool and as a barrier",
      "Trust, explanation, and user control",
      "Bias, hallucination, and overconfidence in AI responses",
      "Accessible AI copilots and chat interfaces",
      "Designing for uncertainty",
    ],
    subtopics: [
      "Prompting and retrieval in accessible language",
      "Confidence cues and verification patterns",
      "Human fallback paths",
      "Responsible AI in UX",
    ],
    resources: [
      "W3C AI and Accessibility Research Symposium report",
      "Microsoft training on accessible AI experiences",
      "W3C accessibility fundamentals page linking AI and accessibility research",
    ],
    assignment: [
      "Evaluate one AI interface for accessibility risks",
      "Identify where the system may confuse, overwhelm, or mislead users",
    ],
    portfolio: "An AI accessibility risk review",
  },
  {
    week: 9,
    title: "Inclusive design systems and accessible components",
    topics: [
      "Accessible components as reusable systems",
      "Tokens, states, and feedback",
      "Color, contrast, motion, and readability",
      "Structure, semantics, and keyboard support",
      "Designing for consistency across teams",
    ],
    subtopics: [
      "Buttons, dialogs, menus, tabs",
      "Error, disabled, loading, and empty states",
      "Content density and spacing",
      "Respecting user preferences",
    ],
    resources: [
      "Microsoft Inclusive Design toolkit and guidance",
      "Material Design accessibility guidance",
      "Web Accessibility Cookbook component chapters",
    ],
    assignment: [
      "Take one component from a design system and make it accessible across states",
      "Document the rules in plain language",
    ],
    portfolio: "One accessible component spec",
  },
  {
    week: 10,
    title: "Evaluation: audits, heuristics, and user testing",
    topics: [
      "Accessibility audits",
      "Manual testing vs automated testing",
      "Heuristic review and usability review",
      "Screen reader basics as a research skill",
      "How to write findings that teams act on",
    ],
    subtopics: [
      "Severity, impact, and frequency",
      "Prioritization by user harm",
      "Reporting accessibility problems clearly",
      "Evidence from behavior, not opinion",
    ],
    resources: [
      "W3C Evaluating Web Accessibility Overview, Easy Checks, and evaluation tools",
      "W3C Quick Reference and tutorials",
      "Practical Web Accessibility",
    ],
    assignment: [
      "Run a mini accessibility audit on one page or flow",
      "Write 5 findings with evidence, impact, and recommendations",
    ],
    portfolio: "A polished accessibility audit report",
  },
  {
    week: 11,
    title: "Strategy, advocacy, and accessibility operations",
    topics: [
      "Making accessibility stick in teams",
      "Policy, process, and ownership",
      "ResearchOps / DesignOps / accessibility governance",
      "Training, monitoring, and cross-functional collaboration",
      "Measuring progress",
    ],
    subtopics: [
      "Accessibility roadmaps",
      "Education and enablement",
      "Internal advocacy",
      "Standards adoption",
    ],
    resources: [
      "Planning and Managing Web Accessibility and Planning & Policies Overview",
      "W3C accessibility courses overview",
      "Microsoft accessibility training resources",
    ],
    assignment: [
      "Create a 1-page accessibility roadmap for a product team",
      "Include owners, milestones, and risks",
    ],
    portfolio: "A strategy slide or memo for leadership",
  },
  {
    week: 12,
    title: "Capstone week",
    topics: [],
    subtopics: [],
    resources: [],
    assignment: [],
    portfolio: "",
    capstone: {
      options: [
        "Accessible mental health flow redesign",
        "Accessible AI assistant evaluation and redesign",
        "Voice-first service with fallback modes",
        "Cognitive accessibility improvement for a complex form or onboarding",
        "Accessibility audit + research synthesis for one real product",
      ],
      submit: [
        "Problem statement",
        "User needs and barriers",
        "Research plan",
        "Findings",
        "Redesign direction",
        "Accessibility rationale",
        "Before/after visuals",
        "Reflection on tradeoffs",
      ],
      anchors: [
        "Microsoft Inclusive Design examples and cognition case studies",
        "W3C AI and Accessibility symposium materials",
        "W3C voice and natural-language interface requirements",
      ],
    },
  },
];

// Cycle through distinct accent colors per week
const WEEK_ACCENTS = [
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
  { color: "var(--chart-3)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-1)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-4)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-5)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
  { color: "var(--chart-3)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-1)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-4)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-5)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
  { color: "var(--chart-1)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
];

interface SectionRowProps {
  icon: React.ReactNode;
  label: string;
  items: string[];
  accentColor: string;
}

function SectionRow({ icon, label, items, accentColor }: SectionRowProps) {
  return (
    <div className="flex flex-col gap-xs">
      <div className="flex items-center gap-xs" style={{ marginBottom: 4 }}>
        <span style={{ color: accentColor, opacity: 0.75 }}>{icon}</span>
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
      <div className="flex flex-col gap-xs">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-sm">
            <span
              className="shrink-0 rounded-full mt-[6px]"
              style={{ width: 4, height: 4, backgroundColor: accentColor, opacity: 0.5 }}
            />
            <span style={{ color: "var(--foreground)", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WeekCardProps {
  data: WeekData;
  index: number;
  expandedIds: Set<number>;
  toggle: (n: number) => void;
}

function WeekCard({ data, index, expandedIds, toggle }: WeekCardProps) {
  const isExpanded = expandedIds.has(data.week);
  const accent = WEEK_ACCENTS[index % WEEK_ACCENTS.length];
  const isCapstone = !!data.capstone;

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden transition-shadow"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${isExpanded ? accent.border : "var(--border)"}`,
        boxShadow: isExpanded ? `0 0 0 1px ${accent.border}` : "none",
      }}
    >
      {/* Header */}
      <button
        onClick={() => toggle(data.week)}
        className="w-full flex items-center gap-xl text-left transition-colors"
        style={{
          padding: "var(--space-xl)",
          backgroundColor: isExpanded ? accent.light : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = isExpanded ? accent.light : "transparent";
        }}
      >
        {/* Week number badge */}
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: 32,
            height: 32,
            backgroundColor: accent.color,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {data.week}
        </span>

        <div className="flex-1 min-w-0">
          <p
            style={{
              color: "var(--foreground)",
              fontSize: "var(--text-base, 15px)",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Week {data.week} — {data.title}
          </p>
          {isCapstone && (
            <span
              className="inline-block mt-xs rounded-full"
              style={{
                padding: "2px 8px",
                fontSize: 11,
                fontWeight: 500,
                color: accent.color,
                backgroundColor: accent.light,
                border: `1px solid ${accent.border}`,
              }}
            >
              Capstone
            </span>
          )}
        </div>

        <span
          className="shrink-0 flex items-center justify-center rounded-full transition-transform"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "var(--accent)",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div
          style={{
            padding: "var(--space-xl)",
            paddingTop: "var(--space-lg)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {isCapstone && data.capstone ? (
            <div className="flex flex-col gap-xl">
              <SectionRow
                icon={<Lightbulb size={11} />}
                label="Capstone Project Options"
                items={data.capstone.options}
                accentColor={accent.color}
              />
              <SectionRow
                icon={<ClipboardList size={11} />}
                label="What to Submit"
                items={data.capstone.submit}
                accentColor={accent.color}
              />
              <SectionRow
                icon={<BookOpen size={11} />}
                label="Suggested Case-Study Anchors"
                items={data.capstone.anchors}
                accentColor={accent.color}
              />
            </div>
          ) : (
            <div
              className="grid gap-xl"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
            >
              {data.topics.length > 0 && (
                <SectionRow
                  icon={<Lightbulb size={11} />}
                  label="Topics"
                  items={data.topics}
                  accentColor={accent.color}
                />
              )}
              {data.subtopics.length > 0 && (
                <SectionRow
                  icon={<GitBranch size={11} />}
                  label="Subtopics"
                  items={data.subtopics}
                  accentColor={accent.color}
                />
              )}
              {data.resources.length > 0 && (
                <SectionRow
                  icon={<BookOpen size={11} />}
                  label="Resources"
                  items={data.resources}
                  accentColor={accent.color}
                />
              )}
              <div className="flex flex-col gap-xl">
                {data.assignment.length > 0 && (
                  <SectionRow
                    icon={<ClipboardList size={11} />}
                    label="Assignment"
                    items={data.assignment}
                    accentColor={accent.color}
                  />
                )}
                {data.portfolio && (
                  <div className="flex flex-col gap-xs">
                    <div className="flex items-center gap-xs" style={{ marginBottom: 4 }}>
                      <span style={{ color: accent.color, opacity: 0.75 }}>
                        <FileText size={11} />
                      </span>
                      <span
                        style={{
                          color: "var(--muted-foreground)",
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Portfolio Output
                      </span>
                    </div>
                    <span
                      className="inline-block rounded-[var(--radius-sm)]"
                      style={{
                        padding: "4px 10px",
                        fontSize: 12,
                        fontWeight: 500,
                        color: accent.color,
                        backgroundColor: accent.light,
                        border: `1px solid ${accent.border}`,
                        lineHeight: 1.4,
                      }}
                    >
                      {data.portfolio}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Month grouping ───────────────────────────────────────────────────────────

const MONTH_ACCENTS = [
  { color: "var(--chart-2)", light: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.35)" },
  { color: "var(--chart-3)", light: "rgba(181,131,141,0.12)", border: "rgba(181,131,141,0.35)" },
  { color: "var(--chart-1)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
  { color: "var(--chart-4)", light: "rgba(245,224,53,0.12)",  border: "rgba(245,224,53,0.4)" },
];

const MONTHS = [
  { month: 1, title: "Foundations & Standards", weeks: [1, 2, 3] },
  { month: 2, title: "Cognitive & Emotional Accessibility", weeks: [4, 5, 6] },
  { month: 3, title: "Emerging Interfaces & Systems", weeks: [7, 8, 9] },
  { month: 4, title: "Evaluation, Strategy & Capstone", weeks: [10, 11, 12] },
];

function MonthSection({
  monthData,
  accent,
  expandedIds,
  toggle,
}: {
  monthData: (typeof MONTHS)[0];
  accent: (typeof MONTH_ACCENTS)[0];
  expandedIds: Set<number>;
  toggle: (n: number) => void;
}) {
  const [open, setOpen] = useState(true);
  const weeks = WEEKS.filter((w) => monthData.weeks.includes(w.week));

  return (
    <div className="flex flex-col gap-lg">
      {/* Collapsible month header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left rounded-[var(--radius-md)] transition-colors"
        style={{ padding: "4px 0", backgroundColor: "transparent", cursor: "pointer" }}
      >
        <span
          className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
          style={{ width: 28, height: 28, backgroundColor: "var(--heading-accent)", color: "#fff", fontSize: 11, fontWeight: 700 }}
        >
          M{monthData.month}
        </span>
        <div className="flex-1 min-w-0 text-left">
          <p style={{ color: "var(--heading-accent)", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
            Month {monthData.month}
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.3 }}>
            {monthData.title} · Weeks {monthData.weeks[0]}–{monthData.weeks[monthData.weeks.length - 1]}
          </p>
        </div>
        <div className="shrink-0" style={{ width: 48, height: 1, backgroundColor: accent.border }} />
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
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
      {open && (
        <div className="flex flex-col gap-md">
          {weeks.map((w, i) => (
            <WeekCard
              key={w.week}
              data={w}
              index={monthData.weeks.indexOf(w.week) + (monthData.month - 1) * 3}
              expandedIds={expandedIds}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AccessibilityPage() {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  function toggle(week: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  }

  function expandAll() {
    setExpandedIds(new Set(WEEKS.map((w) => w.week)));
  }

  function collapseAll() {
    setExpandedIds(new Set());
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
            <Accessibility size={18} style={{ color: "var(--chart-2)" }} />
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Accessibility Syllabus
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
            Accessibility & Inclusive Design
          </h1>
          <p
            className="mt-xs"
            style={{
              color: "var(--muted-foreground)",
              fontSize: "var(--text-sm, 13px)",
              lineHeight: 1.5,
            }}
          >
            12-week syllabus · cognitive, emotional, voice, AI, and audit-focused
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
        {/* Summary strip */}
        <div
          className="flex flex-wrap items-center gap-xl mb-2xl rounded-[var(--radius-lg)]"
          style={{
            padding: "var(--space-lg) var(--space-xl)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {[
            { icon: <Lightbulb size={11} />, label: "Topics" },
            { icon: <GitBranch size={11} />, label: "Subtopics" },
            { icon: <BookOpen size={11} />, label: "Resources" },
            { icon: <ClipboardList size={11} />, label: "Assignment" },
            { icon: <FileText size={11} />, label: "Portfolio Output" },
            { icon: <GraduationCap size={11} />, label: "Capstone" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-xs">
              <span style={{ color: "var(--muted-foreground)" }}>{icon}</span>
              <span style={{ color: "var(--muted-foreground)", fontSize: 12 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Month sections with week cards inside */}
        <div className="flex flex-col gap-2xl max-w-4xl mx-auto">
          {MONTHS.map((m, i) => (
            <MonthSection
              key={m.month}
              monthData={m}
              accent={MONTH_ACCENTS[i]}
              expandedIds={expandedIds}
              toggle={toggle}
            />
          ))}
          <CoreResources />
        </div>

      </div>
    </div>
  );
}

function CollapsibleCard({
  title,
  badge,
  accentColor,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: string;
  accentColor: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md px-xl text-left transition-colors"
        style={{
          height: 44,
          borderBottom: open ? "1px solid var(--border)" : "none",
          backgroundColor: "var(--card)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--card)")}
      >
        <ChevronDown
          size={14}
          style={{
            color: "var(--muted-foreground)",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        />
        <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1 }}>
          {title}
        </span>
        {badge && (
          <span
            className="rounded-full"
            style={{
              padding: "2px 8px",
              fontSize: 11,
              fontWeight: 500,
              color: accentColor,
              backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
            }}
          >
            {badge}
          </span>
        )}
      </button>
      {open && children}
    </div>
  );
}

const RESOURCE_BOOKS = [
  {
    title: "A Web for Everyone",
    subtitle: "Accessibility as a Design Challenge",
    note: "Good for design thinking and accessibility as a product challenge",
  },
  {
    title: "Inclusive Design for a Digital World",
    subtitle: "",
    note: "Strong for inclusive design across web, apps, AI, VR, and AR",
  },
  {
    title: "Web Accessibility Cookbook",
    subtitle: "",
    note: "Practical component-level guidance",
  },
  {
    title: "Practical Web Accessibility",
    subtitle: "",
    note: "Broad, hands-on, and useful for product teams",
  },
];

const RESOURCE_VIDEO = [
  "W3C Digital Accessibility Foundations course",
  "W3C Web Accessibility Perspectives videos",
  "Microsoft Inclusive Design intro and toolkit",
];

const RESOURCE_STANDARDS = [
  "WCAG 2.2, Understanding WCAG 2.2, Quick Reference",
  "W3C planning / testing / evaluation resources",
  "COGA / cognitive accessibility resources",
  "Voice and natural-language interface requirements",
  "AI accessibility research and training resources",
];

const PORTFOLIO_PROJECTS = [
  {
    title: "Accessibility research case study",
    desc: "For a cognitive-heavy or emotionally sensitive flow",
    color: "var(--chart-2)",
  },
  {
    title: "WCAG + cognitive accessibility audit",
    desc: "With redesign recommendations",
    color: "var(--chart-3)",
  },
  {
    title: "Voice interface concept",
    desc: "With accessibility fallback paths",
    color: "var(--chart-1)",
  },
  {
    title: "AI chat/copilot accessibility evaluation",
    desc: "",
    color: "var(--chart-4)",
  },
  {
    title: "Accessible component or design-system spec",
    desc: "",
    color: "var(--chart-5)",
  },
  {
    title: "Trauma-aware microcopy redesign",
    desc: "",
    color: "var(--destructive)",
  },
];

function CoreResources() {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
    >
      {/* Outer header — always visible, non-collapsing label */}
      <div
        className="flex items-center gap-md px-xl"
        style={{
          height: 44,
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1 }}>
          Resources
        </span>
        <span
          className="rounded-full"
          style={{
            padding: "2px 8px",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--muted-foreground)",
            backgroundColor: "var(--accent)",
          }}
        >
          Core stack · portfolio projects
        </span>
      </div>

      <div className="flex flex-col gap-xl" style={{ padding: "var(--space-xl)" }}>

        {/* Core Resource Stack */}
        <CollapsibleCard title="Core Resource Stack" badge="Start with these throughout the semester" accentColor="var(--chart-2)" defaultOpen={true}>
          <div className="flex flex-col gap-xl" style={{ padding: "var(--space-xl)" }}>

            {/* Books */}
            <div>
              <div className="flex items-center gap-sm mb-lg">
                <BookOpen size={13} style={{ color: "var(--chart-2)" }} />
                <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Books</span>
              </div>
              <div className="flex flex-col gap-md">
                {RESOURCE_BOOKS.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-start gap-md rounded-[var(--radius-md)]"
                    style={{
                      padding: "var(--space-md) var(--space-lg)",
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="shrink-0 rounded-full mt-[2px]"
                      style={{ width: 6, height: 6, backgroundColor: "var(--chart-2)", marginTop: 6 }}
                    />
                    <div>
                      <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1.4, display: "block" }}>
                        {b.title}
                        {b.subtitle && (
                          <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}> — {b.subtitle}</span>
                        )}
                      </span>
                      {b.note && (
                        <span style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.4, fontStyle: "italic" }}>
                          {b.note}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video / course */}
            <div>
              <div className="flex items-center gap-sm mb-lg">
                <Video size={13} style={{ color: "var(--chart-3)" }} />
                <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Video / Course Resources</span>
              </div>
              <div className="flex flex-col gap-sm">
                {RESOURCE_VIDEO.map((item) => (
                  <div key={item} className="flex items-start gap-sm">
                    <span className="shrink-0 rounded-full" style={{ width: 4, height: 4, backgroundColor: "var(--chart-3)", opacity: 0.6, marginTop: 7 }} />
                    <span style={{ color: "var(--foreground)", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards */}
            <div>
              <div className="flex items-center gap-sm mb-lg">
                <FlaskConical size={13} style={{ color: "var(--chart-1)" }} />
                <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Research / Standards</span>
              </div>
              <div className="flex flex-col gap-sm">
                {RESOURCE_STANDARDS.map((item) => (
                  <div key={item} className="flex items-start gap-sm">
                    <span className="shrink-0 rounded-full" style={{ width: 4, height: 4, backgroundColor: "var(--chart-1)", opacity: 0.6, marginTop: 7 }} />
                    <span style={{ color: "var(--foreground)", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </CollapsibleCard>

        {/* Portfolio Projects */}
        <CollapsibleCard title="Best Portfolio Projects" badge="Build from this syllabus" accentColor="var(--chart-5)" defaultOpen={true}>
          <div
            className="grid gap-lg"
            style={{ padding: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {PORTFOLIO_PROJECTS.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-md rounded-[var(--radius-md)]"
                style={{
                  padding: "var(--space-lg)",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${p.color}`,
                }}
              >
                <Star size={13} style={{ color: p.color, marginTop: 2, flexShrink: 0 }} />
                <div>
                  <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1.4, display: "block" }}>
                    {p.title}
                  </span>
                  {p.desc && (
                    <span style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.4 }}>
                      {p.desc}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleCard>

      </div>
    </div>
  );
}

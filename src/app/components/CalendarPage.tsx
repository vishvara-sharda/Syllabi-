import { useState } from "react";
import { CalendarRange, Home, Accessibility, MousePointerClick, Check } from "lucide-react";

// ── Topic data ────────────────────────────────────────────────────────────────

const UX_RESEARCH_TOPICS_RAW = [
  "Introduction & Foundations",
  "User-Centered Design & Cognitive Psychology",
  "Cognitive Biases",
  "Motivation & Behavior Models",
  "Interviews & Contextual Inquiry",
  "Observational Methods",
  "Usability Testing",
  "Data Analysis (Qualitative)",
  "Surveys & Questionnaires",
  "Web Analytics & Metrics",
  "A/B and Experimental Testing",
  "Quantitative Analysis",
  "Cognitive Biases & Decision-Making",
  "Persuasive & Habit Design",
  "Emotion & Behavioral Triggers",
  "Ethics of Behavioral UX",
  "Reporting & Communication (Part 1)",
  "Reporting & Communication (Part 2)",
  "Design Systems & UI Patterns",
  "Building Blocks: Styles & Tokens",
  "Accessibility & Inclusive Design",
  "Behavioral UX Specialization",
  "Portfolio Case Development",
  "Finalization & Presentation",
];

const ACCESSIBILITY_TOPICS_RAW = [
  "Foundations: what accessibility really is",
  "WCAG 2.2, but actually understandable",
  "Accessibility research methods",
  "Cognitive accessibility I: memory, attention, and language",
  "Cognitive accessibility II: forms, tasks, and wayfinding",
  "Mental health, emotional accessibility, and trauma-aware design",
  "Voice interfaces and conversational UX",
  "AI interfaces and accessibility",
  "Inclusive design systems and accessible components",
  "Evaluation: audits, heuristics, and user testing",
  "Strategy, advocacy, and accessibility operations",
  "Capstone week",
];

const INTERACTION_TOPICS_RAW = [
  "What Interactive Research & Design Actually Is",
  "Cognitive Science for Designers",
  "Human Behavior, Emotion, and Motivation",
  "Foundations of UX Research",
  "Interviewing and Listening Deeply",
  "Synthesis: Turning Raw Data into Insight",
  "Accessibility Foundations",
  "Cognitive Accessibility and Inclusive Interaction",
  "Interaction Design Fundamentals",
  "Prototyping for Research",
  "Introduction to Human-AI Interaction",
  "Research Project 1",
  "Voice UX Basics",
  "Conversational Design",
  "LLM Interfaces and Prompted Interaction",
  "Voice + Chat Research Mini Project",
  "Multimodal Interaction",
  "Emotional Design in AI and Interfaces",
  "Mental Health Technology",
  "Ethics, Trust, and Responsible Design",
  "Choose Your Capstone",
  "Research for the Capstone",
  "Prototype and Test",
  "Final Portfolio Presentation",
];

const TOTAL_WEEKS = 26;
const START = new Date(2026, 5, 14); // June 14, 2026

// ── Stretch helper ─────────────────────────────────────────────────────────────

function stretch(topics: string[]): string[] {
  return Array.from({ length: TOTAL_WEEKS }, (_, i) =>
    topics[Math.floor((i * topics.length) / TOTAL_WEEKS)]
  );
}

const UX_TOPICS = stretch(UX_RESEARCH_TOPICS_RAW);
const A11Y_TOPICS = stretch(ACCESSIBILITY_TOPICS_RAW);
const IXN_TOPICS = stretch(INTERACTION_TOPICS_RAW);

// ── Date helpers ──────────────────────────────────────────────────────────────

function weekStart(i: number): Date {
  const d = new Date(START);
  d.setDate(d.getDate() + i * 7);
  return d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function monthLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ── Build week entries ─────────────────────────────────────────────────────────

interface WeekEntry {
  index: number; // 0-based
  start: Date;
  end: Date;
  ux: string;
  a11y: string;
  ixn: string;
}

const WEEKS: WeekEntry[] = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
  const start = weekStart(i);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { index: i, start, end, ux: UX_TOPICS[i], a11y: A11Y_TOPICS[i], ixn: IXN_TOPICS[i] };
});

// ── Group by month ─────────────────────────────────────────────────────────────

interface MonthGroup {
  label: string;
  weeks: WeekEntry[];
}

function groupByMonth(weeks: WeekEntry[]): MonthGroup[] {
  const map = new Map<string, WeekEntry[]>();
  for (const w of weeks) {
    const key = monthLabel(w.start);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(w);
  }
  return Array.from(map.entries()).map(([label, ws]) => ({ label, weeks: ws }));
}

const MONTH_GROUPS = groupByMonth(WEEKS);

// ── Colors per track ──────────────────────────────────────────────────────────

const TRACK_UX = {
  color: "rgba(56,189,248,1)",
  bg: "rgba(56,189,248,0.10)",
  border: "rgba(56,189,248,0.30)",
  label: "UX Research",
  icon: <Home size={11} />,
};
const TRACK_A11Y = {
  color: "rgba(181,131,141,1)",
  bg: "rgba(181,131,141,0.10)",
  border: "rgba(181,131,141,0.30)",
  label: "Accessibility",
  icon: <Accessibility size={11} />,
};
const TRACK_IXN = {
  color: "rgba(245,200,40,1)",
  bg: "rgba(245,200,40,0.10)",
  border: "rgba(245,200,40,0.30)",
  label: "Interaction",
  icon: <MousePointerClick size={11} />,
};

// ── Month accent colors ───────────────────────────────────────────────────────

const MONTH_COLORS = [
  "rgba(56,189,248,0.70)",
  "rgba(181,131,141,0.70)",
  "rgba(245,200,40,0.70)",
  "rgba(100,200,120,0.70)",
  "rgba(200,100,200,0.70)",
  "rgba(255,150,80,0.70)",
  "rgba(80,180,200,0.70)",
];

// ── Sub-components ────────────────────────────────────────────────────────────

interface TrackPillProps {
  track: typeof TRACK_UX;
  topic: string;
  checked: boolean;
  onToggle: () => void;
}

function TrackPill({ track, topic, checked, onToggle }: TrackPillProps) {
  return (
    <div
      className="flex items-start gap-sm rounded-[var(--radius-md)]"
      style={{
        padding: "6px 10px",
        backgroundColor: checked ? "var(--accent)" : track.bg,
        border: `1px solid ${checked ? "var(--border)" : track.border}`,
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className="shrink-0 flex items-center justify-center rounded"
        style={{
          width: 14,
          height: 14,
          marginTop: 3,
          flexShrink: 0,
          border: checked ? "none" : `1.5px solid ${track.color}`,
          backgroundColor: checked ? track.color : "transparent",
          cursor: "pointer",
          transition: "background-color 0.15s ease, border-color 0.15s ease",
        }}
      >
        {checked && <Check size={9} strokeWidth={3} style={{ color: "#fff" }} />}
      </button>

      {/* Track icon */}
      <span
        className="shrink-0 flex items-center"
        style={{ color: track.color, marginTop: 2, opacity: checked ? 0.4 : 1 }}
      >
        {track.icon}
      </span>

      {/* Label + topic */}
      <div className="flex flex-col gap-xs min-w-0">
        <span
          style={{
            color: track.color,
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            lineHeight: 1,
            opacity: checked ? 0.5 : 1,
          }}
        >
          {track.label}
        </span>
        <span
          style={{
            color: checked ? "var(--muted-foreground)" : "var(--foreground)",
            fontSize: 12,
            lineHeight: 1.45,
            textDecoration: checked ? "line-through" : "none",
            transition: "color 0.15s ease",
          }}
        >
          {topic}
        </span>
      </div>
    </div>
  );
}

interface WeekCardProps {
  entry: WeekEntry;
}

function WeekCard({ entry }: WeekCardProps) {
  const { index, start, end, ux, a11y, ixn } = entry;
  const weekNum = index + 1;
  const [checked, setChecked] = useState({ ux: false, a11y: false, ixn: false });
  const toggle = (key: keyof typeof checked) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-lg"
        style={{
          padding: "var(--space-lg) var(--space-xl)",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        {/* Week badge */}
        <span
          className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
          style={{
            width: 36,
            height: 28,
            backgroundColor: "var(--accent)",
            color: "var(--muted-foreground)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          W{weekNum}
        </span>

        {/* Date range */}
        <span
          style={{
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {fmt(start)} – {fmt(end)}
        </span>

        {/* Week number label right-aligned */}
        <span
          className="ml-auto shrink-0"
          style={{
            color: "var(--muted-foreground)",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          Week {weekNum} of {TOTAL_WEEKS}
        </span>
      </div>

      {/* Track pills */}
      <div
        className="flex flex-col gap-sm"
        style={{ padding: "var(--space-lg) var(--space-xl)" }}
      >
        <TrackPill track={TRACK_UX}   topic={ux}   checked={checked.ux}   onToggle={() => toggle("ux")} />
        <TrackPill track={TRACK_A11Y} topic={a11y} checked={checked.a11y} onToggle={() => toggle("a11y")} />
        <TrackPill track={TRACK_IXN}  topic={ixn}  checked={checked.ixn}  onToggle={() => toggle("ixn")} />
      </div>
    </div>
  );
}

interface MonthSectionProps {
  group: MonthGroup;
  colorIndex: number;
}

function MonthSection({ group, colorIndex }: MonthSectionProps) {
  const accent = MONTH_COLORS[colorIndex % MONTH_COLORS.length];
  const firstWeek = group.weeks[0].index + 1;
  const lastWeek = group.weeks[group.weeks.length - 1].index + 1;

  return (
    <div className="flex flex-col gap-md">
      {/* Month header */}
      <div className="flex items-center gap-md" style={{ marginBottom: 4 }}>
        <div
          className="shrink-0 rounded-[var(--radius-sm)]"
          style={{ width: 3, height: 28, backgroundColor: accent }}
        />
        <div>
          <p
            style={{
              color: "var(--heading-accent)",
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {group.label}
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.3 }}>
            {group.weeks.length === 1
              ? `Week ${firstWeek}`
              : `Weeks ${firstWeek}–${lastWeek}`}{" "}
            · {group.weeks.length} {group.weeks.length === 1 ? "week" : "weeks"}
          </p>
        </div>
      </div>

      {/* Week cards */}
      <div className="flex flex-col gap-sm">
        {group.weeks.map((w) => (
          <WeekCard key={w.index} entry={w} />
        ))}
      </div>
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────

function Legend() {
  const tracks = [TRACK_UX, TRACK_A11Y, TRACK_IXN];
  return (
    <div
      className="flex flex-wrap items-center gap-lg rounded-[var(--radius-lg)]"
      style={{
        padding: "var(--space-md) var(--space-xl)",
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        marginBottom: "var(--space-2xl)",
      }}
    >
      <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Tracks
      </span>
      {tracks.map((t) => (
        <div key={t.label} className="flex items-center gap-sm">
          <span
            className="shrink-0 rounded-full"
            style={{ width: 8, height: 8, backgroundColor: t.color }}
          />
          <span style={{ color: "var(--foreground)", fontSize: 12, fontWeight: 500 }}>
            {t.label}
          </span>
        </div>
      ))}
      <span
        className="ml-auto"
        style={{ color: "var(--muted-foreground)", fontSize: 12 }}
      >
        {TOTAL_WEEKS} weeks · {fmt(START)} – {fmt(weekStart(TOTAL_WEEKS - 1))} (end)
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function CalendarPage() {
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
            <CalendarRange size={18} style={{ color: "var(--chart-2)" }} />
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              6-Month Study Calendar
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
            Weekly Schedule
          </h1>
          <p
            className="mt-xs"
            style={{
              color: "var(--muted-foreground)",
              fontSize: "var(--text-sm, 13px)",
              lineHeight: 1.5,
            }}
          >
            {TOTAL_WEEKS} weeks · one topic per track per week · {fmt(START)} onwards
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: "var(--space-2xl)", backgroundColor: "var(--background)" }}
      >
        <div className="flex flex-col gap-2xl max-w-3xl mx-auto">
          <Legend />
          {MONTH_GROUPS.map((group, i) => (
            <MonthSection key={group.label} group={group} colorIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

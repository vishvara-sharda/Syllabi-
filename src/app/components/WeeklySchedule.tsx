import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SCHEDULE = [
  { week: 1, topic: "Introduction & Foundations", subtopics: "UX research role, mixed methods, ethics, behavioral science, problem statements, research goals", resources: "Dovetail UX Researcher Roles, NN/g Psychology for UX, Fogg Behavior Model, Don Norman – The Design of Everyday Things", assignment: "Create a research plan", deliverable: "Research plan document" },
  { week: 2, topic: "Cognitive Psychology", subtopics: "Gestalt laws, mental models, cognitive load, attention, memory, biases", resources: "Don Norman, NN/g Gestalt Principles, IDF Cognitive Bias Course", assignment: "Analyze an interface using Gestalt principles", deliverable: "Heuristic analysis" },
  { week: 3, topic: "Cognitive Biases", subtopics: "Framing, anchoring, confirmation bias, prospect theory", resources: "NN/g Decision Frames, Cialdini – Influence", assignment: "Identify biases in products", deliverable: "Bias analysis report" },
  { week: 4, topic: "Motivation & Behavior Models", subtopics: "Fogg Model, COM-B, Self-Determination Theory, emotions", resources: "Fogg (2009), IxDF Persuasive Design, Hooked, Nudge", assignment: "Analyze a habit-forming app", deliverable: "Behavioral model breakdown" },
  { week: 5, topic: "User Interviews", subtopics: "Interview types, question design, listening, contextual inquiry", resources: "UX Field Guide, Rubin & Chisnell, IDF Interviewing Course", assignment: "Conduct 5 interviews", deliverable: "Interview transcripts" },
  { week: 6, topic: "Observational Research", subtopics: "Ethnography, diary studies, field studies", resources: "NN/g Journey Mapping Research, UXPA Ethnography", assignment: "Conduct a diary study", deliverable: "Observation notes" },
  { week: 7, topic: "Usability Testing", subtopics: "Think-aloud, moderated/unmoderated, remote testing", resources: "Nielsen Norman Group, Paper Prototyping", assignment: "Run usability tests", deliverable: "Usability report" },
  { week: 8, topic: "Qualitative Analysis", subtopics: "Affinity diagrams, thematic analysis, coding, personas", resources: "NN/g Research Analysis, Ryan & Bernard", assignment: "Analyze interview data", deliverable: "Affinity map + Persona" },
  { week: 9, topic: "Surveys & Questionnaires", subtopics: "Likert scales, sampling, question design", resources: "Qualtrics, SurveyMonkey, UX Field Guide", assignment: "Create survey", deliverable: "Survey report" },
  { week: 10, topic: "Analytics & Metrics", subtopics: "Bounce rate, funnels, page views, heatmaps", resources: "Google Analytics, Hotjar, NN/g Evidence-Based Design", assignment: "Analyze analytics data", deliverable: "Analytics report" },
  { week: 11, topic: "A/B Testing", subtopics: "Hypothesis, significance, conversion metrics", resources: "Optimizely Resources, UX Field Guide", assignment: "Design an A/B experiment", deliverable: "A/B testing plan" },
  { week: 12, topic: "Quantitative Analysis", subtopics: "Mean, median, SD, charts, visualization", resources: "Statistics for UX, Excel, Google Sheets", assignment: "Analyze survey data", deliverable: "Statistical report" },
  { week: 13, topic: "Decision-Making Psychology", subtopics: "Scarcity, social proof, defaults, choice overload", resources: "Cialdini, NN/g Decision Frames", assignment: "Analyze product decisions", deliverable: "Cognitive bias audit" },
  { week: 14, topic: "Persuasive Design", subtopics: "Hook Model, triggers, rewards, nudges", resources: "Nir Eyal – Hooked, Fogg Model, Nudge", assignment: "Map user habit loops", deliverable: "Habit journey map" },
  { week: 15, topic: "Emotional Design", subtopics: "Pleasure, trust, gamification, motivation", resources: "Don Norman – Emotional Design, Stephen Wendel", assignment: "Analyze emotional triggers", deliverable: "Emotional design table" },
  { week: 16, topic: "Ethics in Behavioral UX", subtopics: "Dark patterns, ethical nudges, autonomy", resources: "ACM Ethics Papers, NN/g Ethics", assignment: "Evaluate manipulative flows", deliverable: "Ethics report" },
  { week: 17, topic: "Reporting & Storytelling", subtopics: "Executive summaries, slide decks, recommendations", resources: "Duarte – Resonate, Stephen Few – Now You See It", assignment: "Present findings", deliverable: "Research presentation" },
  { week: 18, topic: "Design System Fundamentals", subtopics: "Components, patterns, consistency, scale", resources: "NN/g Design Systems 101, Figma Resources", assignment: "Audit a product", deliverable: "UI consistency audit" },
  { week: 19, topic: "Styles & Tokens", subtopics: "Typography, color systems, spacing, grids", resources: "Material Design, IBM Carbon", assignment: "Create foundations", deliverable: "Style guide" },
  { week: 20, topic: "Components & Documentation", subtopics: "Libraries, documentation, governance", resources: "Storybook, Zeroheight, Figma Libraries", assignment: "Build component library", deliverable: "Mini design system" },
  { week: 21, topic: "Accessibility & Inclusive Design", subtopics: "WCAG, contrast, screen readers, cognitive accessibility", resources: "WCAG 2.1, WAVE, axe, A11Y Project", assignment: "Accessibility audit", deliverable: "Accessibility report" },
  { week: 22, topic: "Specialized UX Domains", subtopics: "Mobile UX, Voice UX, AR/VR, IoT, consumer behavior", resources: "NN/g Mobile UX, Interaction Design Foundation", assignment: "Redesign one interaction", deliverable: "Domain case study" },
  { week: 23, topic: "Portfolio Development", subtopics: "Case studies, storytelling, visuals", resources: "Leah Buley – UX Team of One, NN/g Portfolio Guides", assignment: "Start capstone", deliverable: "Case study outline" },
  { week: 24, topic: "Capstone & Presentation", subtopics: "Final report, stakeholder communication", resources: "UIE Articles, Tableau Public, Figma", assignment: "Complete end-to-end project", deliverable: "Portfolio-ready case study" },
];

// Week ranges per module for color coding
const MODULE_RANGES = [
  { weeks: [1, 4], color: "var(--chart-1)", light: "rgba(245,224,53,0.08)", label: "M1" },
  { weeks: [5, 8], color: "var(--chart-2)", light: "rgba(56,189,248,0.08)", label: "M2" },
  { weeks: [9, 12], color: "var(--chart-3)", light: "rgba(181,131,141,0.08)", label: "M3" },
  { weeks: [13, 18], color: "var(--chart-4)", light: "rgba(245,224,53,0.08)", label: "M4" },
  { weeks: [19, 20], color: "var(--primary)", light: "rgba(245,224,53,0.06)", label: "M5" },
  { weeks: [21, 22], color: "var(--chart-5)", light: "rgba(181,131,141,0.08)", label: "M6" },
  { weeks: [23, 24], color: "var(--destructive)", light: "rgba(212,24,61,0.08)", label: "M7" },
];

function getModuleForWeek(week: number) {
  return MODULE_RANGES.find((m) => week >= m.weeks[0] && week <= m.weeks[1])!;
}

const COLUMNS = ["Week", "Topic", "Subtopics", "Resources", "Assignment", "Deliverable"];

export function WeeklySchedule() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        backgroundColor: "var(--card)",
      }}
    >
      {/* Section label / toggle */}
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
        <span
          style={{
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          Weekly Schedule
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
          24 weeks
        </span>
      </button>

      {/* Scrollable table */}
      {open && <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 900 }}>
          <thead>
            <tr style={{ backgroundColor: "var(--accent)" }}>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="text-left"
                  style={{
                    padding: "10px 14px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((row, i) => {
              const mod = getModuleForWeek(row.week);
              const isFirst = i === 0 || getModuleForWeek(SCHEDULE[i - 1].week).label !== mod.label;

              return (
                <tr
                  key={row.week}
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--card)" : "var(--background)",
                    borderBottom: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = mod.light;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      i % 2 === 0 ? "var(--card)" : "var(--background)";
                  }}
                >
                  {/* Week number */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <div className="flex items-center gap-sm">
                      {isFirst && (
                        <span
                          className="rounded-sm"
                          style={{
                            width: 3,
                            height: 20,
                            backgroundColor: mod.color,
                            borderRadius: 2,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {!isFirst && <span style={{ width: 3, flexShrink: 0 }} />}
                      <span
                        className="inline-flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: mod.color,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {row.week}
                      </span>
                    </div>
                  </td>

                  {/* Topic */}
                  <td style={{ padding: "10px 14px", minWidth: 160 }}>
                    <span
                      style={{
                        color: "var(--foreground)",
                        fontSize: 13,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {row.topic}
                    </span>
                  </td>

                  {/* Subtopics */}
                  <td style={{ padding: "10px 14px", minWidth: 200 }}>
                    <span
                      style={{
                        color: "var(--muted-foreground)",
                        fontSize: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      {row.subtopics}
                    </span>
                  </td>

                  {/* Resources */}
                  <td style={{ padding: "10px 14px", minWidth: 200 }}>
                    <span
                      style={{
                        color: "var(--muted-foreground)",
                        fontSize: 12,
                        lineHeight: 1.5,
                        fontStyle: "italic",
                      }}
                    >
                      {row.resources}
                    </span>
                  </td>

                  {/* Assignment */}
                  <td style={{ padding: "10px 14px", minWidth: 160 }}>
                    <span
                      style={{
                        color: "var(--foreground)",
                        fontSize: 12,
                        lineHeight: 1.4,
                      }}
                    >
                      {row.assignment}
                    </span>
                  </td>

                  {/* Deliverable */}
                  <td style={{ padding: "10px 14px", minWidth: 160 }}>
                    <span
                      className="inline-block rounded-[var(--radius-sm)]"
                      style={{
                        padding: "3px 8px",
                        fontSize: 11,
                        fontWeight: 500,
                        color: mod.color,
                        backgroundColor: mod.light,
                        border: `1px solid ${mod.color}30`,
                        lineHeight: 1.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.deliverable}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

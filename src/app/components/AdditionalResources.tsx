import { useState } from "react";
import { ChevronDown, BookOpen, BookMarked } from "lucide-react";

const BOOK_CATEGORIES = [
  {
    label: "Psychology",
    color: "var(--chart-1)",
    light: "rgba(245,224,53,0.07)",
    books: [
      { title: "Thinking Fast and Slow", author: "Daniel Kahneman" },
      { title: "Influence", author: "Robert Cialdini" },
      { title: "Predictably Irrational", author: "Dan Ariely" },
      { title: "Hooked", author: "Nir Eyal" },
      { title: "Nudge", author: "Thaler & Sunstein" },
      { title: "Designing for Behavior Change", author: "Stephen Wendel" },
    ],
  },
  {
    label: "UX Research",
    color: "var(--chart-2)",
    light: "rgba(56,189,248,0.07)",
    books: [
      { title: "Just Enough Research", author: "Erika Hall" },
      { title: "Observing the User Experience", author: "Goodman et al." },
      { title: "Interviewing Users", author: "Steve Portigal" },
      { title: "Quantifying the User Experience", author: "Sauro & Lewis" },
      { title: "UX Team of One", author: "Leah Buley" },
    ],
  },
  {
    label: "Human-Computer Interaction",
    color: "var(--chart-3)",
    light: "rgba(181,131,141,0.07)",
    books: [
      { title: "The Design of Everyday Things", author: "Don Norman" },
      { title: "Emotional Design", author: "Don Norman" },
      { title: "About Face", author: "Alan Cooper" },
      { title: "Universal Principles of Design", author: "Lidwell, Holden & Butler" },
    ],
  },
  {
    label: "Design Systems",
    color: "var(--chart-5)",
    light: "rgba(181,131,141,0.07)",
    books: [
      { title: "Design Systems", author: "Alla Kholmatova" },
      { title: "Design System Handbook", author: "InVision" },
      { title: "Material Design Documentation", author: "Google" },
      { title: "IBM Carbon Documentation", author: "IBM" },
    ],
  },
];

const PSYCH_TOPICS = [
  {
    area: "Cognitive Psychology",
    topics: "Attention, memory, perception, mental models, cognitive load",
    resources: "Daniel Kahneman – Thinking Fast and Slow, Don Norman",
  },
  {
    area: "Behavioral Psychology",
    topics: "Reinforcement, conditioning, habits, triggers",
    resources: "B.J. Fogg, Nir Eyal",
  },
  {
    area: "Social Psychology",
    topics: "Social proof, conformity, identity, group behavior",
    resources: "Robert Cialdini – Influence",
  },
  {
    area: "Consumer Psychology",
    topics: "Decision making, pricing, trust, emotions",
    resources: "Predictably Irrational – Dan Ariely",
  },
  {
    area: "Behavioral Economics",
    topics: "Loss aversion, framing, defaults, scarcity",
    resources: "Nudge, Thinking Fast and Slow",
  },
  {
    area: "Emotion & Motivation",
    topics: "Intrinsic motivation, self-determination, emotional design",
    resources: "Don Norman – Emotional Design",
  },
  {
    area: "Human Factors & HCI",
    topics: "Affordances, feedback, errors, discoverability",
    resources: "Design of Everyday Things",
  },
  {
    area: "Accessibility Psychology",
    topics: "Cognitive accessibility, inclusive cognition",
    resources: "WCAG, A11Y Project",
  },
  {
    area: "Ethics & Persuasion",
    topics: "Dark patterns, ethical influence",
    resources: "ACM Papers, NN/g Ethics",
  },
];

function CollapsibleSection({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: string;
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
              color: "var(--muted-foreground)",
              backgroundColor: "var(--accent)",
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

function EssentialBooks() {
  return (
    <div style={{ padding: "var(--space-xl)" }}>
      <div className="grid grid-cols-1 gap-xl" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {BOOK_CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="rounded-[var(--radius-md)]"
            style={{
              border: `1px solid ${cat.color}25`,
              backgroundColor: cat.light,
              overflow: "hidden",
            }}
          >
            {/* Category header */}
            <div
              className="flex items-center gap-sm px-lg"
              style={{
                height: 36,
                borderBottom: `1px solid ${cat.color}20`,
                backgroundColor: `${cat.light}`,
              }}
            >
              <span
                className="rounded-full shrink-0"
                style={{ width: 6, height: 6, backgroundColor: cat.color }}
              />
              <span
                style={{
                  color: cat.color,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Book list */}
            <div className="flex flex-col" style={{ padding: "var(--space-md) var(--space-lg)" }}>
              {cat.books.map((book) => (
                <div
                  key={book.title}
                  className="flex items-start gap-sm"
                  style={{ padding: "5px 0", borderBottom: `1px solid ${cat.color}12` }}
                >
                  <BookOpen
                    size={11}
                    className="shrink-0 mt-[3px]"
                    style={{ color: cat.color, opacity: 0.7 }}
                  />
                  <div>
                    <span
                      style={{
                        color: "var(--foreground)",
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        display: "block",
                      }}
                    >
                      {book.title}
                    </span>
                    <span
                      style={{
                        color: "var(--muted-foreground)",
                        fontSize: 11,
                        lineHeight: 1.4,
                      }}
                    >
                      {book.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PsychTopicsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: 640 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--accent)" }}>
            {["Area", "Topics", "Resources"].map((col) => (
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
          {PSYCH_TOPICS.map((row, i) => (
            <tr
              key={row.area}
              style={{
                backgroundColor: i % 2 === 0 ? "var(--card)" : "var(--background)",
                borderBottom: "1px solid var(--border)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  i % 2 === 0 ? "var(--card)" : "var(--background)")
              }
            >
              <td style={{ padding: "10px 14px", minWidth: 180, whiteSpace: "nowrap" }}>
                <div className="flex items-center gap-sm">
                  <BookMarked size={12} style={{ color: "var(--chart-3)", flexShrink: 0 }} />
                  <span
                    style={{
                      color: "var(--foreground)",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {row.area}
                  </span>
                </div>
              </td>
              <td style={{ padding: "10px 14px", minWidth: 220 }}>
                <span
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {row.topics}
                </span>
              </td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdditionalResources() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
    >
      {/* Top-level toggle */}
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
          Additional Resources & Topics
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
          2 sections
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-xl" style={{ padding: "var(--space-xl)" }}>
          <CollapsibleSection title="Essential Books" badge="Read Throughout the 6 Months" defaultOpen={true}>
            <EssentialBooks />
          </CollapsibleSection>

          <CollapsibleSection title="Psychology Areas & Topics" badge="9 areas" defaultOpen={true}>
            <PsychTopicsTable />
          </CollapsibleSection>
        </div>
      )}
    </div>
  );
}

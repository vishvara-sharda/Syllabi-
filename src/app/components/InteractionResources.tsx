import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  User,
  Calendar,
  Lightbulb,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Book {
  title: string;
  author?: string;
  note?: string;
  chapters?: string;
  topics?: string[];
}
interface Paper {
  title: string;
  author?: string;
  note?: string;
}
interface VideoItem { label: string; note?: string }
interface CaseStudy { label: string }
interface Website { label: string }
interface Course { label: string; note?: string }

interface Category {
  id: string;
  label: string;
  note?: string;
  color: string;
  light: string;
  border: string;
  books?: Book[];
  papers?: Paper[];
  videos?: VideoItem[];
  caseStudies?: CaseStudy[];
  websites?: Website[];
  courses?: Course[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "hci",
    label: "HCI & Interaction Design",
    color: "var(--chart-1)",
    light: "rgba(245,224,53,0.07)",
    border: "rgba(245,224,53,0.22)",
    books: [
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        chapters: "Chapters 1–6",
        topics: ["Affordances", "Signifiers", "Mapping", "Feedback", "Human error"],
      },
      {
        title: "Designing Interactions",
        author: "Bill Moggridge",
        topics: ["Interaction history", "Human-centered design", "Design pioneers"],
      },
      {
        title: "About Face: The Essentials of Interaction Design",
        author: "Alan Cooper, Robert Reimann, David Cronin, Christopher Noessel",
        topics: ["Personas", "Interaction principles", "Goal-directed design"],
      },
      {
        title: "The Design of Future Things",
        topics: ["Intelligent systems", "Automation", "Human-AI interaction"],
      },
    ],
    videos: [
      { label: "Stanford CS147 Human-Computer Interaction", note: "YouTube" },
      { label: "CMU Human-Computer Interaction Institute lectures" },
      { label: "Nielsen Norman Group YouTube" },
      { label: "Interaction Design Foundation videos" },
    ],
    papers: [
      { title: '"The Computer for the 21st Century"', author: "Mark Weiser (1991)", note: "Foundational paper of ubiquitous computing" },
      { title: '"Ten Myths of Multimodal Interaction"', author: "Sharon Oviatt" },
    ],
    caseStudies: [
      { label: "Google Material Design" },
      { label: "Airbnb Design" },
      { label: "Spotify Design" },
      { label: "Duolingo UX" },
    ],
  },
  {
    id: "ux-research",
    label: "UX Research",
    color: "var(--chart-2)",
    light: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.22)",
    books: [
      { title: "Just Enough Research" },
      { title: "Interviewing Users" },
      { title: "Observing the User Experience" },
      { title: "Think Like a UX Researcher" },
    ],
    videos: [
      { label: "Nielsen Norman Group", note: "User interviews, journey mapping, usability testing" },
    ],
    papers: [
      { title: '"Research through Design"', author: "Zimmerman et al." },
      { title: '"Design Research Through Practice"', author: "Koskinen et al." },
    ],
    caseStudies: [
      { label: "Google UX case studies" },
      { label: "IDEO case studies" },
      { label: "Microsoft Research case studies" },
    ],
  },
  {
    id: "cog-science",
    label: "Cognitive Science",
    note: "Your deepest section",
    color: "var(--chart-3)",
    light: "rgba(181,131,141,0.07)",
    border: "rgba(181,131,141,0.22)",
    books: [
      { title: "Thinking, Fast and Slow" },
      {
        title: "Cognition",
        topics: ["Attention", "Memory", "Language", "Decision-making"],
      },
      { title: "The Feeling of What Happens", note: "Emotion and consciousness" },
      { title: "How Emotions Are Made", note: "Modern theory of emotions" },
      { title: "Predictably Irrational", note: "Behavioral science" },
    ],
    courses: [
      { label: "Yale Introduction to Psychology", note: "Professor Paul Bloom · YouTube" },
      { label: "MIT OpenCourseWare Cognitive Science" },
    ],
    papers: [
      { title: '"The Magical Number Seven, Plus or Minus Two"', author: "George Miller" },
      { title: '"A Cognitive Theory of Multimedia Learning"', author: "Richard Mayer" },
    ],
  },
  {
    id: "emotional-design",
    label: "Emotional Design",
    color: "var(--chart-4)",
    light: "rgba(245,224,53,0.07)",
    border: "rgba(245,224,53,0.22)",
    books: [
      { title: "Emotional Design" },
      { title: "Designing with the Mind in Mind" },
      { title: "Hooked", note: "Read critically" },
    ],
    videos: [
      { label: "Aarron Walter talks" },
      { label: "Don Norman talks" },
    ],
    papers: [
      { title: '"Emotion and Design"', author: "Donald Norman" },
      { title: "Affective Computing papers", author: "Rosalind Picard" },
    ],
  },
  {
    id: "accessibility",
    label: "Accessibility",
    color: "var(--chart-5)",
    light: "rgba(181,131,141,0.07)",
    border: "rgba(181,131,141,0.22)",
    books: [
      { title: "Mismatch" },
      { title: "Design Meets Disability" },
      { title: "Inclusive Design Patterns" },
    ],
    websites: [
      { label: "W3C WCAG Guidelines" },
      { label: "WebAIM" },
      { label: "Microsoft Inclusive Design Toolkit" },
    ],
    videos: [
      { label: "Google I/O Accessibility" },
      { label: "Microsoft Inclusive Design videos" },
    ],
    caseStudies: [
      { label: "Microsoft Xbox Adaptive Controller" },
      { label: "Google Lookout" },
      { label: "Apple VoiceOver" },
    ],
  },
  {
    id: "voice-ux",
    label: "Voice UX",
    note: "One of your specializations",
    color: "var(--chart-2)",
    light: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.22)",
    books: [
      { title: "Designing Voice User Interfaces", note: "Your Bible" },
      { title: "Voice Content and Usability" },
    ],
    videos: [
      { label: "Google Assistant Design" },
      { label: "Amazon Alexa Design" },
      { label: "VoiceLunch Podcast" },
    ],
    papers: [
      { title: '"What\'s the Talk on VUI Guidelines? A Meta-analysis of Voice User Interface Design Guidelines"' },
      { title: '"Conversational Repair"' },
    ],
    caseStudies: [
      { label: "Alexa" },
      { label: "Google Assistant" },
      { label: "Siri" },
    ],
  },
  {
    id: "conv-ai",
    label: "Conversational AI",
    color: "var(--chart-3)",
    light: "rgba(181,131,141,0.07)",
    border: "rgba(181,131,141,0.22)",
    books: [
      { title: "Conversational Design" },
      { title: "Designing Bots" },
      { title: "Chatbot Design" },
    ],
    papers: [
      { title: '"Guidelines for Human-AI Interaction"', author: "Amershi et al. (CHI 2019)", note: "Must read" },
      { title: '"Human-AI Interaction"', author: "Saleema Amershi" },
      { title: '"Human-Centered AI"', author: "Ben Shneiderman" },
    ],
    caseStudies: [
      { label: "Character.AI" },
      { label: "Claude" },
      { label: "ChatGPT" },
      { label: "Pi AI" },
      { label: "Replika" },
    ],
  },
  {
    id: "multimodal",
    label: "Multimodal AI",
    color: "var(--chart-1)",
    light: "rgba(245,224,53,0.07)",
    border: "rgba(245,224,53,0.22)",
    papers: [
      { title: '"Ten Myths of Multimodal Interaction"', author: "Sharon Oviatt" },
      { title: '"Multimodal Interfaces"', author: "Lawrence Nigay" },
      { title: '"Natural Interaction"', author: "Bill Buxton" },
    ],
    videos: [
      { label: "Google Gemini demos" },
      { label: "OpenAI multimodal demos" },
    ],
    caseStudies: [
      { label: "Gemini Live" },
      { label: "ChatGPT Voice" },
      { label: "Project Astra" },
    ],
  },
  {
    id: "mental-health",
    label: "Mental Health Technology",
    color: "var(--chart-4)",
    light: "rgba(245,224,53,0.07)",
    border: "rgba(245,224,53,0.22)",
    books: [
      { title: "The Body Keeps the Score" },
      { title: "Lost Connections" },
      { title: "The Man Who Mistook His Wife for a Hat" },
    ],
    papers: [
      { title: '"Chatbots and Mental Health"', author: "Inkster et al." },
      { title: '"Conversational Agents in Healthcare"', author: "Laranjo et al." },
      { title: '"Can Chatbots Help Support a Person\'s Mental Health?"' },
    ],
    caseStudies: [
      { label: "Woebot" },
      { label: "Wysa" },
      { label: "Headspace" },
      { label: "Calm" },
    ],
  },
  {
    id: "human-ai",
    label: "Human-AI Interaction",
    note: "Probably your future specialization",
    color: "var(--destructive)",
    light: "rgba(212,24,61,0.07)",
    border: "rgba(212,24,61,0.22)",
    books: [
      { title: "Human-Centered AI" },
      { title: "Designing with AI" },
    ],
    papers: [
      { title: '"Guidelines for Human-AI Interaction"', author: "Saleema Amershi et al." },
      { title: '"Human-AI Complementarity"' },
      { title: '"Keeping Humans in the Loop"' },
    ],
  },
];

const RESEARCHERS = [
  "Don Norman", "Ben Shneiderman", "Bill Buxton", "Brenda Laurel",
  "Rosalind Picard", "Sharon Oviatt", "Saleema Amershi", "Cathy Pearl",
];

const CONFERENCES = [
  { label: "ACM CHI", note: "" },
  { label: "ACM CSCW", note: "" },
  { label: "DIS", note: "" },
  { label: "UIST", note: "" },
  { label: "IUI", note: "" },
  { label: "Ubicomp", note: "" },
  { label: "ASSETS", note: "Accessibility" },
  { label: "CSCW", note: "" },
  { label: "HCII", note: "" },
];

// ─── Sub-section helpers ──────────────────────────────────────────────────────

function SubHeading({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex items-center gap-sm" style={{ marginBottom: "var(--space-md)" }}>
      <span style={{ color, opacity: 0.75 }}>{icon}</span>
      <span style={{ color: "var(--muted-foreground)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
    </div>
  );
}

function BookCard({ book, color, light, border }: { book: Book; color: string; light: string; border: string }) {
  return (
    <div
      className="rounded-[var(--radius-md)]"
      style={{ padding: "var(--space-md) var(--space-lg)", backgroundColor: "var(--background)", border: `1px solid var(--border)`, borderLeft: `3px solid ${color}` }}
    >
      <p style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{book.title}</p>
      {book.author && (
        <p style={{ color: "var(--muted-foreground)", fontSize: 11, marginTop: 2, lineHeight: 1.3 }}>{book.author}</p>
      )}
      {book.chapters && (
        <span
          className="inline-block rounded-full mt-xs"
          style={{ padding: "1px 8px", fontSize: 10, fontWeight: 500, color, backgroundColor: light, border: `1px solid ${border}` }}
        >
          {book.chapters}
        </span>
      )}
      {book.note && (
        <p style={{ color: "var(--muted-foreground)", fontSize: 11, fontStyle: "italic", marginTop: 2, lineHeight: 1.4 }}>{book.note}</p>
      )}
      {book.topics && book.topics.length > 0 && (
        <div className="flex flex-wrap gap-xs mt-sm">
          {book.topics.map((t) => (
            <span
              key={t}
              className="rounded-full"
              style={{ padding: "2px 8px", fontSize: 10, color: "var(--muted-foreground)", backgroundColor: "var(--accent)", border: "1px solid var(--border)" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PaperRow({ paper, color }: { paper: Paper; color: string }) {
  return (
    <div className="flex items-start gap-sm">
      <FileText size={11} style={{ color, opacity: 0.6, flexShrink: 0, marginTop: 3 }} />
      <div>
        <span style={{ color: "var(--foreground)", fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>{paper.title}</span>
        {paper.author && <span style={{ color: "var(--muted-foreground)", fontSize: 11 }}> — {paper.author}</span>}
        {paper.note && <p style={{ color: "var(--chart-2)", fontSize: 11, fontWeight: 500, fontStyle: "italic", marginTop: 1 }}>{paper.note}</p>}
      </div>
    </div>
  );
}

function SimpleList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-col gap-sm">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-sm">
          <span className="shrink-0 rounded-full" style={{ width: 4, height: 4, backgroundColor: color, opacity: 0.5, marginTop: 7, flexShrink: 0 }} />
          <span style={{ color: "var(--foreground)", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function VideoList({ items, color }: { items: VideoItem[]; color: string }) {
  return (
    <div className="flex flex-col gap-sm">
      {items.map((v) => (
        <div key={v.label} className="flex items-start gap-sm">
          <Video size={11} style={{ color, opacity: 0.6, flexShrink: 0, marginTop: 3 }} />
          <div>
            <span style={{ color: "var(--foreground)", fontSize: 12, lineHeight: 1.4 }}>{v.label}</span>
            {v.note && <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontStyle: "italic" }}> · {v.note}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseStudyPills({ items, color, light, border }: { items: CaseStudy[]; color: string; light: string; border: string }) {
  return (
    <div className="flex flex-wrap gap-sm">
      {items.map((c) => (
        <span
          key={c.label}
          className="rounded-[var(--radius-sm)]"
          style={{ padding: "4px 10px", fontSize: 11, fontWeight: 500, color, backgroundColor: light, border: `1px solid ${border}` }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: `1px solid ${open ? cat.border : "var(--border)"}`, backgroundColor: "var(--card)" }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left transition-colors"
        style={{ padding: "var(--space-lg) var(--space-xl)", backgroundColor: open ? cat.light : "transparent" }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = open ? cat.light : "transparent"; }}
      >
        <span
          className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
          style={{ width: 26, height: 26, backgroundColor: cat.color, color: "#fff", fontSize: 11, fontWeight: 700 }}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{cat.label}</p>
          {cat.note && <p style={{ color: "var(--muted-foreground)", fontSize: 11, lineHeight: 1.3, fontStyle: "italic" }}>{cat.note}</p>}
        </div>
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 22, height: 22, backgroundColor: "var(--accent)", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
        >
          <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>

      {/* Body */}
      {open && (
        <div
          className="flex flex-col gap-xl"
          style={{ padding: "var(--space-xl)", borderTop: "1px solid var(--border)" }}
        >
          {cat.books && cat.books.length > 0 && (
            <div>
              <SubHeading icon={<BookOpen size={12} />} label="Books" color={cat.color} />
              <div className="flex flex-col gap-md">
                {cat.books.map((b) => (
                  <BookCard key={b.title} book={b} color={cat.color} light={cat.light} border={cat.border} />
                ))}
              </div>
            </div>
          )}

          {cat.courses && cat.courses.length > 0 && (
            <div>
              <SubHeading icon={<Lightbulb size={12} />} label="Courses" color={cat.color} />
              <div className="flex flex-col gap-sm">
                {cat.courses.map((c) => (
                  <div key={c.label} className="flex items-start gap-sm">
                    <span className="shrink-0 rounded-full" style={{ width: 4, height: 4, backgroundColor: cat.color, opacity: 0.5, marginTop: 7 }} />
                    <div>
                      <span style={{ color: "var(--foreground)", fontSize: 12, lineHeight: 1.4 }}>{c.label}</span>
                      {c.note && <span style={{ color: "var(--muted-foreground)", fontSize: 11, fontStyle: "italic" }}> · {c.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cat.videos && cat.videos.length > 0 && (
            <div>
              <SubHeading icon={<Video size={12} />} label="Videos" color={cat.color} />
              <VideoList items={cat.videos} color={cat.color} />
            </div>
          )}

          {cat.papers && cat.papers.length > 0 && (
            <div>
              <SubHeading icon={<FileText size={12} />} label="Papers" color={cat.color} />
              <div className="flex flex-col gap-md">
                {cat.papers.map((p) => (
                  <PaperRow key={p.title} paper={p} color={cat.color} />
                ))}
              </div>
            </div>
          )}

          {cat.websites && cat.websites.length > 0 && (
            <div>
              <SubHeading icon={<ExternalLink size={12} />} label="Websites" color={cat.color} />
              <SimpleList items={cat.websites.map((w) => w.label)} color={cat.color} />
            </div>
          )}

          {cat.caseStudies && cat.caseStudies.length > 0 && (
            <div>
              <SubHeading icon={<User size={12} />} label="Case Studies" color={cat.color} />
              <CaseStudyPills items={cat.caseStudies} color={cat.color} light={cat.light} border={cat.border} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Researchers + Conferences ────────────────────────────────────────────────

function ResearchersCard() {
  const [open, setOpen] = useState(false);
  const color = "var(--chart-3)";
  const light = "rgba(181,131,141,0.07)";
  const border = "rgba(181,131,141,0.22)";

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: `1px solid ${open ? border : "var(--border)"}`, backgroundColor: "var(--card)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left transition-colors"
        style={{ padding: "var(--space-lg) var(--space-xl)", backgroundColor: open ? light : "transparent" }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = open ? light : "transparent"; }}
      >
        <User size={14} style={{ color, flexShrink: 0 }} />
        <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, flex: 1 }}>Researchers to Follow</span>
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 22, height: 22, backgroundColor: "var(--accent)", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
        >
          <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>
      {open && (
        <div className="flex flex-wrap gap-sm" style={{ padding: "var(--space-xl)", borderTop: "1px solid var(--border)" }}>
          {RESEARCHERS.map((r) => (
            <span
              key={r}
              className="rounded-[var(--radius-sm)]"
              style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, color, backgroundColor: light, border: `1px solid ${border}` }}
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ConferencesCard() {
  const [open, setOpen] = useState(false);
  const color = "var(--chart-1)";
  const light = "rgba(245,224,53,0.07)";
  const border = "rgba(245,224,53,0.22)";

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: `1px solid ${open ? border : "var(--border)"}`, backgroundColor: "var(--card)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left transition-colors"
        style={{ padding: "var(--space-lg) var(--space-xl)", backgroundColor: open ? light : "transparent" }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = open ? light : "transparent"; }}
      >
        <Calendar size={14} style={{ color, flexShrink: 0 }} />
        <div className="flex-1">
          <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600 }}>Conferences to Learn From</span>
          <p style={{ color: "var(--muted-foreground)", fontSize: 11, fontStyle: "italic", lineHeight: 1.3 }}>Where the best work in your field appears</p>
        </div>
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 22, height: 22, backgroundColor: "var(--accent)", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
        >
          <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>
      {open && (
        <div className="flex flex-wrap gap-sm" style={{ padding: "var(--space-xl)", borderTop: "1px solid var(--border)" }}>
          {CONFERENCES.map((c) => (
            <span
              key={c.label}
              className="rounded-[var(--radius-sm)]"
              style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, color, backgroundColor: light, border: `1px solid ${border}` }}
            >
              {c.label}{c.note ? ` · ${c.note}` : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function InteractionResources() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
    >
      {/* Top toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md px-xl text-left transition-colors"
        style={{ height: 44, borderBottom: open ? "1px solid var(--border)" : "none", backgroundColor: "var(--card)", cursor: "pointer" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--card)")}
      >
        <ChevronDown
          size={14}
          style={{ color: "var(--muted-foreground)", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
        />
        <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 600, lineHeight: 1 }}>Resources</span>
        <span
          className="rounded-full"
          style={{ padding: "2px 8px", fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)", backgroundColor: "var(--accent)" }}
        >
          10 categories · researchers · conferences
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-md" style={{ padding: "var(--space-xl)" }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
          <ResearchersCard />
          <ConferencesCard />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { AdditionalResources } from "./AdditionalResources";
import {
  ChevronRight,
  Target,
  ClipboardList,
  FileText,
  Calendar,
  BookOpen,
  GraduationCap,
} from "lucide-react";

type NodeType = "module" | "section" | "week" | "topic" | "reading";

interface CourseNode {
  id: string;
  label: string;
  badge?: string;
  type: NodeType;
  children?: CourseNode[];
}

const MODULES: CourseNode[] = [
  {
    id: "mod-1",
    label: "Module 1: Foundations of UX & Behavioral Science",
    badge: "Weeks 1–4",
    type: "module",
    children: [
      {
        id: "mod-1-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-1-obj-1", type: "topic", label: "Understand the role of UX research and human factors" },
          { id: "mod-1-obj-2", type: "topic", label: "Build groundwork in cognitive psychology" },
          { id: "mod-1-obj-3", type: "topic", label: "Learn formal terminology, research ethics, and problem framing" },
        ],
      },
      {
        id: "mod-1-w1",
        label: "Week 1 – Introduction & Foundations",
        type: "week",
        children: [
          { id: "mod-1-w1-1", type: "topic", label: "Advanced UX research role & mixed methods overview" },
          { id: "mod-1-w1-2", type: "topic", label: "Project planning & ethics" },
          { id: "mod-1-w1-3", type: "topic", label: "Introduction to behavioral science in UX" },
          { id: "mod-1-w1-4", type: "topic", label: "UX research ethics and privacy" },
          { id: "mod-1-w1-5", type: "topic", label: "Defining problem statements and research goals" },
          { id: "mod-1-w1-r", type: "reading", label: 'Key Readings: Dovetail "UX Researcher Roles"; NN/g "Psychology for UX"; Fogg (2009) Behavior Model; NN/g on UX ethics' },
        ],
      },
      {
        id: "mod-1-w2",
        label: "Week 2 – User-Centered Design & Cognitive Psychology",
        type: "week",
        children: [
          { id: "mod-1-w2-1", type: "topic", label: "Gestalt laws & mental models" },
          { id: "mod-1-w2-2", type: "topic", label: "Cognitive load, memory, and attention limits" },
          { id: "mod-1-w2-3", type: "topic", label: "Cognitive bias & Nielsen's usability principles" },
          { id: "mod-1-w2-r", type: "reading", label: "Key Readings: Don Norman, The Design of Everyday Things; NN/g on Gestalt & memory; IDF cognitive bias short course" },
        ],
      },
      {
        id: "mod-1-w3",
        label: "Week 3 – Cognitive Biases",
        type: "week",
        children: [
          { id: "mod-1-w3-1", type: "topic", label: "Framing, confirmation, anchoring, and decision frames" },
          { id: "mod-1-w3-2", type: "topic", label: "Prospect theory & mental models" },
          { id: "mod-1-w3-r", type: "reading", label: 'Key Readings: NN/g "Decision Frames"; psychology-for-UX readings' },
        ],
      },
      {
        id: "mod-1-w4",
        label: "Week 4 – Motivation & Behavior Models",
        type: "week",
        children: [
          { id: "mod-1-w4-1", type: "topic", label: "Motivation, emotion, and behavior-change theory" },
          { id: "mod-1-w4-2", type: "topic", label: "Fogg Behavior Model" },
          { id: "mod-1-w4-3", type: "topic", label: "COM-B & Self-Determination Theory" },
          { id: "mod-1-w4-r", type: "reading", label: 'Key Readings: IxDF "Persuasive Design"; Fogg\'s Behavior Model' },
        ],
      },
      {
        id: "mod-1-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-1-a1", type: "topic", label: "Draft a research goal statement" },
          { id: "mod-1-a2", type: "topic", label: "Analyze a UI using Gestalt principles" },
          { id: "mod-1-a3", type: "topic", label: "Evaluate a study result through bias framing" },
          { id: "mod-1-a4", type: "topic", label: "Identify one app element explained by Fogg's model" },
        ],
      },
      {
        id: "mod-1-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-1-d1", type: "topic", label: "Written research goal" },
          { id: "mod-1-d2", type: "topic", label: "UI analysis notes" },
          { id: "mod-1-d3", type: "topic", label: "Bias-case analysis" },
        ],
      },
    ],
  },
  {
    id: "mod-2",
    label: "Module 2: Qualitative UX Research Methods",
    badge: "Weeks 5–8",
    type: "module",
    children: [
      {
        id: "mod-2-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-2-obj-1", type: "topic", label: "Master generative and evaluative qualitative methods" },
          { id: "mod-2-obj-2", type: "topic", label: "Learn to conduct and document interviews, observations, diary studies, and usability tests" },
          { id: "mod-2-obj-3", type: "topic", label: "Develop coding and synthesis skills" },
        ],
      },
      {
        id: "mod-2-w5",
        label: "Week 5 – Interviews & Contextual Inquiry",
        type: "week",
        children: [
          { id: "mod-2-w5-1", type: "topic", label: "Interview types & question design" },
          { id: "mod-2-w5-2", type: "topic", label: "Listening skills" },
          { id: "mod-2-w5-3", type: "topic", label: "Contextual inquiry basics" },
          { id: "mod-2-w5-r", type: "reading", label: 'Key Readings: UX Field Guide – "User Interviews" (UIQ toolkit); interview chapters from Handbook of Usability Testing' },
        ],
      },
      {
        id: "mod-2-w6",
        label: "Week 6 – Observational Methods",
        type: "week",
        children: [
          { id: "mod-2-w6-1", type: "topic", label: "Ethnography & field study" },
          { id: "mod-2-w6-2", type: "topic", label: "Diary studies" },
          { id: "mod-2-w6-r", type: "reading", label: 'Key Readings: NN/g "Research for Journey Mapping"; UXPA ethnographic studies article' },
        ],
      },
      {
        id: "mod-2-w7",
        label: "Week 7 – Usability Testing",
        type: "week",
        children: [
          { id: "mod-2-w7-1", type: "topic", label: "Moderated vs. unmoderated testing" },
          { id: "mod-2-w7-2", type: "topic", label: "Remote vs. lab settings" },
          { id: "mod-2-w7-3", type: "topic", label: "Think-aloud protocol" },
          { id: "mod-2-w7-r", type: "reading", label: 'Key Readings: Nielsen Norman "Usability Testing 101"; Paper Prototyping; heuristic evaluation basics' },
        ],
      },
      {
        id: "mod-2-w8",
        label: "Week 8 – Data Analysis (Qualitative)",
        type: "week",
        children: [
          { id: "mod-2-w8-1", type: "topic", label: "Thematic analysis" },
          { id: "mod-2-w8-2", type: "topic", label: "Affinity diagramming" },
          { id: "mod-2-w8-3", type: "topic", label: "Coding qualitative data" },
          { id: "mod-2-w8-r", type: "reading", label: 'Key Readings: UX Field Guide – "Analyzing User Research"; NN/g on research analysis' },
        ],
      },
      {
        id: "mod-2-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-2-a1", type: "topic", label: "Conduct 5 interviews" },
          { id: "mod-2-a2", type: "topic", label: "Document observations" },
          { id: "mod-2-a3", type: "topic", label: "Run a 2-user usability test" },
          { id: "mod-2-a4", type: "topic", label: "Synthesize themes into personas and a journey map draft" },
        ],
      },
      {
        id: "mod-2-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-2-d1", type: "topic", label: "Interview transcripts" },
          { id: "mod-2-d2", type: "topic", label: "Observation notes" },
          { id: "mod-2-d3", type: "topic", label: "Affinity diagram output" },
          { id: "mod-2-d4", type: "topic", label: "Draft persona & journey map" },
        ],
      },
    ],
  },
  {
    id: "mod-3",
    label: "Module 3: Quantitative Methods & Analytics",
    badge: "Weeks 9–12",
    type: "module",
    children: [
      {
        id: "mod-3-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-3-obj-1", type: "topic", label: "Learn survey design and statistical basics" },
          { id: "mod-3-obj-2", type: "topic", label: "Understand UX metrics, A/B testing, and analytics" },
          { id: "mod-3-obj-3", type: "topic", label: "Derive insights from quantitative data" },
        ],
      },
      {
        id: "mod-3-w9",
        label: "Week 9 – Surveys & Questionnaires",
        type: "week",
        children: [
          { id: "mod-3-w9-1", type: "topic", label: "Likert scales & question types" },
          { id: "mod-3-w9-2", type: "topic", label: "Sampling methods" },
          { id: "mod-3-w9-3", type: "topic", label: "Online survey tools" },
          { id: "mod-3-w9-r", type: "reading", label: 'Key Readings: UX Field Guide – "Surveys"; Google Forms; Qualtrics; SurveyMonkey' },
        ],
      },
      {
        id: "mod-3-w10",
        label: "Week 10 – Web Analytics & Metrics",
        type: "week",
        children: [
          { id: "mod-3-w10-1", type: "topic", label: "Page views, time on page, bounce rate" },
          { id: "mod-3-w10-2", type: "topic", label: "Funnels & heatmaps" },
          { id: "mod-3-w10-r", type: "reading", label: 'Key Readings: NN/g "Evidence-based Interaction Design"; Google Analytics; Hotjar' },
        ],
      },
      {
        id: "mod-3-w11",
        label: "Week 11 – A/B and Experimental Testing",
        type: "week",
        children: [
          { id: "mod-3-w11-1", type: "topic", label: "Hypothesis setting & significance" },
          { id: "mod-3-w11-2", type: "topic", label: "Test design" },
          { id: "mod-3-w11-r", type: "reading", label: 'Key Readings: UX Field Guide – "A/B Testing"; Optimizely best-practice resources' },
        ],
      },
      {
        id: "mod-3-w12",
        label: "Week 12 – Quantitative Analysis",
        type: "week",
        children: [
          { id: "mod-3-w12-1", type: "topic", label: "Mean, median, mode, and standard deviation" },
          { id: "mod-3-w12-2", type: "topic", label: "Charting and visualizing results" },
          { id: "mod-3-w12-r", type: "reading", label: "Key Readings: Statistics for UX; Excel/Sheets charting tutorials" },
        ],
      },
      {
        id: "mod-3-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-3-a1", type: "topic", label: "Design a 10-question survey" },
          { id: "mod-3-a2", type: "topic", label: "Analyze analytics data" },
          { id: "mod-3-a3", type: "topic", label: "Plan an A/B test" },
          { id: "mod-3-a4", type: "topic", label: "Compute descriptive stats in Excel" },
        ],
      },
      {
        id: "mod-3-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-3-d1", type: "topic", label: "Survey instrument and results report" },
          { id: "mod-3-d2", type: "topic", label: "Analytics screenshot" },
          { id: "mod-3-d3", type: "topic", label: "A/B test plan & findings" },
        ],
      },
    ],
  },
  {
    id: "mod-4",
    label: "Module 4: Data Analysis, Synthesis & Reporting",
    badge: "Weeks 13–18",
    type: "module",
    children: [
      {
        id: "mod-4-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-4-obj-1", type: "topic", label: "Turn raw research into themes, insights, personas, and journeys" },
          { id: "mod-4-obj-2", type: "topic", label: "Develop stakeholder-ready communication skills" },
        ],
      },
      {
        id: "mod-4-w13",
        label: "Week 13 – Cognitive Biases & Decision-Making",
        type: "week",
        children: [
          { id: "mod-4-w13-1", type: "topic", label: "Confirmation bias & choice overload" },
          { id: "mod-4-w13-2", type: "topic", label: "Scarcity & social proof" },
          { id: "mod-4-w13-r", type: "reading", label: 'Key Readings: NN/g "Decision Frames"; behavioral design Q&A' },
        ],
      },
      {
        id: "mod-4-w14",
        label: "Week 14 – Persuasive & Habit Design",
        type: "week",
        children: [
          { id: "mod-4-w14-1", type: "topic", label: "Fogg's Behavior Model" },
          { id: "mod-4-w14-2", type: "topic", label: "Hook Model" },
          { id: "mod-4-w14-3", type: "topic", label: "Persuasive design principles" },
          { id: "mod-4-w14-r", type: "reading", label: "Key Readings: IxDF persuasive design; Hooked; Nudge" },
        ],
      },
      {
        id: "mod-4-w15",
        label: "Week 15 – Emotion & Behavioral Triggers",
        type: "week",
        children: [
          { id: "mod-4-w15-1", type: "topic", label: "Emotional design" },
          { id: "mod-4-w15-2", type: "topic", label: "Gamification" },
          { id: "mod-4-w15-3", type: "topic", label: "Social incentives" },
          { id: "mod-4-w15-r", type: "reading", label: "Key Readings: Norman's Emotional Design; Behavioral Design by Stephen Wendel" },
        ],
      },
      {
        id: "mod-4-w16",
        label: "Week 16 – Ethics of Behavioral UX",
        type: "week",
        children: [
          { id: "mod-4-w16-1", type: "topic", label: "Dark patterns vs. ethical nudges" },
          { id: "mod-4-w16-2", type: "topic", label: "User autonomy" },
          { id: "mod-4-w16-r", type: "reading", label: "Key Readings: ethics in persuasive UX; Nielsen/Norman ethics material" },
        ],
      },
      {
        id: "mod-4-w1718",
        label: "Weeks 17–18 – Reporting & Communication",
        type: "week",
        children: [
          { id: "mod-4-w1718-1", type: "topic", label: "Storytelling with data" },
          { id: "mod-4-w1718-2", type: "topic", label: "Slide decks & written reports" },
          { id: "mod-4-w1718-3", type: "topic", label: "Stakeholder communication & presentation structure" },
          { id: "mod-4-w1718-r", type: "reading", label: "Key Readings: NN/g presentation guides; Few's Now You See It; Duarte's Resonate; GDPR basics" },
        ],
      },
      {
        id: "mod-4-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-4-a1", type: "topic", label: "Synthesize interview and survey findings into personas and journeys" },
          { id: "mod-4-a2", type: "topic", label: "Prepare a slide deck" },
          { id: "mod-4-a3", type: "topic", label: "Peer-review report clarity" },
        ],
      },
      {
        id: "mod-4-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-4-d1", type: "topic", label: "Personas PDF" },
          { id: "mod-4-d2", type: "topic", label: "Journey map visual" },
          { id: "mod-4-d3", type: "topic", label: "Research presentation slides" },
          { id: "mod-4-d4", type: "topic", label: "Executive summary document" },
        ],
      },
    ],
  },
  {
    id: "mod-5",
    label: "Module 5: Design Systems & UI Standards",
    badge: "Weeks 19–20",
    type: "module",
    children: [
      {
        id: "mod-5-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-5-obj-1", type: "topic", label: "Understand what design systems are and why they matter" },
          { id: "mod-5-obj-2", type: "topic", label: "Learn to create and use a design system for consistency and scalability" },
        ],
      },
      {
        id: "mod-5-w19",
        label: "Week 19 – Design Systems & UI Patterns",
        type: "week",
        children: [
          { id: "mod-5-w19-1", type: "topic", label: "Component libraries & forms" },
          { id: "mod-5-w19-2", type: "topic", label: "Navigation patterns & style guides" },
          { id: "mod-5-w19-3", type: "topic", label: "Design tokens & consistency" },
          { id: "mod-5-w19-r", type: "reading", label: 'Key Readings: NN/g "Design Systems 101"; InVision Design System Handbook; Figma component library tutorials' },
        ],
      },
      {
        id: "mod-5-w20",
        label: "Week 20 – Building Blocks (Styles & Tokens)",
        type: "week",
        children: [
          { id: "mod-5-w20-1", type: "topic", label: "Color palettes & typography" },
          { id: "mod-5-w20-2", type: "topic", label: "Grid, components, and patterns" },
          { id: "mod-5-w20-3", type: "topic", label: "Documentation" },
          { id: "mod-5-w20-r", type: "reading", label: "Key Readings: Figma design system resources; Storybook; IBM Carbon or Google Material Design docs" },
        ],
      },
      {
        id: "mod-5-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-5-a1", type: "topic", label: "Audit a product for consistency" },
          { id: "mod-5-a2", type: "topic", label: "Create a mini style guide" },
          { id: "mod-5-a3", type: "topic", label: "Build UI components in Figma" },
          { id: "mod-5-a4", type: "topic", label: "Write usage guidelines for a component" },
        ],
      },
      {
        id: "mod-5-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-5-d1", type: "topic", label: "Mini design system style guide" },
          { id: "mod-5-d2", type: "topic", label: "Component library screenshot" },
          { id: "mod-5-d3", type: "topic", label: "Documentation snippet" },
        ],
      },
    ],
  },
  {
    id: "mod-6",
    label: "Module 6: Accessibility, Inclusive Design & Specialized UX",
    badge: "Weeks 21–22",
    type: "module",
    children: [
      {
        id: "mod-6-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-6-obj-1", type: "topic", label: "Learn to research with diverse users and ensure accessibility" },
          { id: "mod-6-obj-2", type: "topic", label: "Explore behavioral economics and specialized UX contexts" },
        ],
      },
      {
        id: "mod-6-w21",
        label: "Week 21 – Accessibility & Inclusive Design",
        type: "week",
        children: [
          { id: "mod-6-w21-1", type: "topic", label: "WCAG guidelines & screen readers" },
          { id: "mod-6-w21-2", type: "topic", label: "Color contrast" },
          { id: "mod-6-w21-3", type: "topic", label: "Motor, visual, and cognitive accessibility" },
          { id: "mod-6-w21-4", type: "topic", label: "Inclusive research methods" },
          { id: "mod-6-w21-r", type: "reading", label: "Key Readings: WCAG 2.1 Quick Reference; Inclusive Design for Web; NN/g accessibility usability testing report; A11Y checklist" },
        ],
      },
      {
        id: "mod-6-w22",
        label: "Week 22 – Behavioral UX Specialization",
        type: "week",
        children: [
          { id: "mod-6-w22-1", type: "topic", label: "Behavioral economics & loss aversion" },
          { id: "mod-6-w22-2", type: "topic", label: "Framing & choice architecture" },
          { id: "mod-6-w22-3", type: "topic", label: "Habit-forming features" },
          { id: "mod-6-w22-4", type: "topic", label: "Dark patterns vs. ethical nudges" },
          { id: "mod-6-w22-r", type: "reading", label: "Key Readings: Thaler & Sunstein's Nudge; UIE persuasive design articles" },
        ],
      },
      {
        id: "mod-6-opt",
        label: "Optional Specialized UX Topics",
        type: "section",
        children: [
          { id: "mod-6-opt-1", type: "topic", label: "Mobile/touch UX" },
          { id: "mod-6-opt-2", type: "topic", label: "Voice/UI" },
          { id: "mod-6-opt-3", type: "topic", label: "VR/AR fundamentals" },
          { id: "mod-6-opt-4", type: "topic", label: "IoT/wearables" },
          { id: "mod-6-opt-5", type: "topic", label: "Consumer behavior & business alignment" },
        ],
      },
      {
        id: "mod-6-assign",
        label: "Assignments & Activities",
        type: "section",
        children: [
          { id: "mod-6-a1", type: "topic", label: "Conduct an accessibility audit" },
          { id: "mod-6-a2", type: "topic", label: "Compare ethical and dark-patterned apps" },
          { id: "mod-6-a3", type: "topic", label: "Map a customer journey to a UX touchpoint" },
        ],
      },
      {
        id: "mod-6-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-6-d1", type: "topic", label: "Accessibility audit report" },
          { id: "mod-6-d2", type: "topic", label: "Ethics reflection essay" },
        ],
      },
    ],
  },
  {
    id: "mod-7",
    label: "Module 7: Capstone Project & Portfolio",
    badge: "Weeks 23–24",
    type: "module",
    children: [
      {
        id: "mod-7-obj",
        label: "Learning Objectives",
        type: "section",
        children: [
          { id: "mod-7-obj-1", type: "topic", label: "Integrate mixed methods on a real or simulated product" },
          { id: "mod-7-obj-2", type: "topic", label: "Prepare a job-ready portfolio piece" },
        ],
      },
      {
        id: "mod-7-w23",
        label: "Week 23 – Portfolio Case Development",
        type: "week",
        children: [
          { id: "mod-7-w23-1", type: "topic", label: "Assemble a UX case study" },
          { id: "mod-7-w23-2", type: "topic", label: "Storytelling & visuals" },
          { id: "mod-7-w23-3", type: "topic", label: "Research scope definition" },
          { id: "mod-7-w23-r", type: "reading", label: "Key Readings: NN/g case study guidance; Medium portfolio best practices; Leah Buley, UX Team of One" },
        ],
      },
      {
        id: "mod-7-w24",
        label: "Week 24 – Finalization & Presentation",
        type: "week",
        children: [
          { id: "mod-7-w24-1", type: "topic", label: "Refine deliverables" },
          { id: "mod-7-w24-2", type: "topic", label: "Present findings" },
          { id: "mod-7-w24-3", type: "topic", label: "Package the portfolio" },
          { id: "mod-7-w24-r", type: "reading", label: 'Key Readings: UIE "Talking to Stakeholders"; portfolio and presentation best practices' },
        ],
      },
      {
        id: "mod-7-final",
        label: "Final Project",
        type: "section",
        children: [
          { id: "mod-7-fp-1", type: "topic", label: "Execute a mini research study on a chosen topic" },
          { id: "mod-7-fp-2", type: "topic", label: "Submit a full report with slides" },
          { id: "mod-7-fp-3", type: "topic", label: "Prepare 2–3 case-study summaries" },
        ],
      },
      {
        id: "mod-7-del",
        label: "Deliverables",
        type: "section",
        children: [
          { id: "mod-7-d1", type: "topic", label: "Capstone report" },
          { id: "mod-7-d2", type: "topic", label: "Polished portfolio excerpts" },
          { id: "mod-7-d3", type: "topic", label: "Research presentation slides" },
        ],
      },
    ],
  },
];

const MODULE_ACCENTS = [
  { color: "var(--chart-1)", light: "rgba(245, 224, 53, 0.12)", border: "rgba(245, 224, 53, 0.4)" },
  { color: "var(--chart-2)", light: "rgba(56, 189, 248, 0.12)", border: "rgba(56, 189, 248, 0.35)" },
  { color: "var(--chart-3)", light: "rgba(181, 131, 141, 0.12)", border: "rgba(181, 131, 141, 0.35)" },
  { color: "var(--chart-4)", light: "rgba(245, 224, 53, 0.12)", border: "rgba(245, 224, 53, 0.4)" },
  { color: "var(--primary)", light: "rgba(245, 224, 53, 0.1)", border: "rgba(245, 224, 53, 0.3)" },
  { color: "var(--chart-5)", light: "rgba(181, 131, 141, 0.12)", border: "rgba(181, 131, 141, 0.35)" },
  { color: "var(--destructive)", light: "rgba(212, 24, 61, 0.08)", border: "rgba(212, 24, 61, 0.25)" },
];

function nodeIcon(type: NodeType, label: string) {
  if (type === "week") return <Calendar size={12} />;
  if (label.startsWith("Learning Objectives")) return <Target size={12} />;
  if (label.startsWith("Assignments")) return <ClipboardList size={12} />;
  if (label.startsWith("Deliverables") || label.startsWith("Final Project")) return <FileText size={12} />;
  if (label.startsWith("Optional")) return <GraduationCap size={12} />;
  return <BookOpen size={12} />;
}

// ── Child card (week or section) ──────────────────────────────────────────────
function ChildCard({
  node,
  accent,
  expanded,
  onToggle,
}: {
  node: CourseNode;
  accent: (typeof MODULE_ACCENTS)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const icon = nodeIcon(node.type, node.label);
  const isWeek = node.type === "week";

  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${expanded ? accent.border : "var(--border)"}`,
        boxShadow: expanded ? `0 0 0 1px ${accent.border}` : "none",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-md text-left transition-colors"
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
        <span style={{ color: isWeek ? accent.color : "var(--muted-foreground)", flexShrink: 0 }}>
          {icon}
        </span>
        <span
          className="flex-1"
          style={{
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: isWeek ? 600 : 500,
            lineHeight: 1.4,
          }}
        >
          {node.label}
        </span>
        <span
          className="shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: 22,
            height: 22,
            backgroundColor: "var(--accent)",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
          }}
        >
          <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
        </span>
      </button>

      {/* Body */}
      {expanded && node.children && (
        <div
          className="flex flex-col gap-xs"
          style={{
            padding: "var(--space-md) var(--space-xl) var(--space-lg)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {node.children.map((leaf) => {
            const isReading = leaf.type === "reading";
            return (
              <div key={leaf.id} className="flex items-start gap-sm">
                {isReading ? (
                  <BookOpen size={11} style={{ color: accent.color, opacity: 0.65, flexShrink: 0, marginTop: 3 }} />
                ) : (
                  <span
                    className="shrink-0 rounded-full"
                    style={{ width: 4, height: 4, backgroundColor: accent.color, opacity: 0.5, marginTop: 7, flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    color: isReading ? "var(--muted-foreground)" : "var(--foreground)",
                    fontSize: 12,
                    fontStyle: isReading ? "italic" : "normal",
                    lineHeight: 1.5,
                  }}
                >
                  {leaf.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Module section (month-style collapsible header) ───────────────────────────
function ModuleSection({
  module,
  index,
  expandedIds,
  toggleNode,
}: {
  module: CourseNode;
  index: number;
  expandedIds: Set<string>;
  toggleNode: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const accent = MODULE_ACCENTS[index % MODULE_ACCENTS.length];

  return (
    <div className="flex flex-col gap-lg">
      {/* Collapsible module header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-md text-left rounded-[var(--radius-md)] transition-colors"
        style={{ padding: "4px 0", backgroundColor: "transparent", cursor: "pointer" }}
      >
        <span
          className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
          style={{ width: 28, height: 28, backgroundColor: "var(--heading-accent)", color: "#fff", fontSize: 11, fontWeight: 700 }}
        >
          M{index + 1}
        </span>
        <div className="flex-1 min-w-0 text-left">
          <p style={{ color: "var(--heading-accent)", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
            Month {index + 1}
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.3 }}>
            {module.label.replace(/^Module \d+:\s*/, "")}
            {module.badge ? ` · ${module.badge}` : ""}
          </p>
        </div>
        <div className="flex-shrink-0" style={{ width: 48, height: 1, backgroundColor: accent.border }} />
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

      {/* Child cards */}
      {open && module.children && (
        <div className="flex flex-col gap-md">
          {module.children.map((child) => (
            <ChildCard
              key={child.id}
              node={child}
              accent={accent}
              expanded={expandedIds.has(child.id)}
              onToggle={() => toggleNode(child.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CourseTree() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggleNode(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    const ids = new Set<string>();
    MODULES.forEach((mod) => {
      mod.children?.forEach((child) => {
        if (child.children) ids.add(child.id);
      });
    });
    setExpandedIds(ids);
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
            <GraduationCap size={18} style={{ color: "var(--primary)" }} />
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
            UX Research & Design
          </h1>
          <p
            className="mt-xs"
            style={{
              color: "var(--muted-foreground)",
              fontSize: "var(--text-sm, 13px)",
              lineHeight: 1.5,
            }}
          >
            7 modules · 24 weeks · comprehensive curriculum
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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
              border: "1px solid transparent",
            }}
          >
            Expand all
          </button>
        </div>
      </div>

      {/* Tree content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: "var(--space-2xl)", backgroundColor: "var(--background)" }}
      >
        {/* Module sections */}
        <div className="flex flex-col gap-2xl max-w-4xl mx-auto">
          {MODULES.map((module, i) => (
            <ModuleSection
              key={module.id}
              module={module}
              index={i}
              expandedIds={expandedIds}
              toggleNode={toggleNode}
            />
          ))}
        </div>

        {/* Additional resources */}
        <div className="max-w-4xl mx-auto mt-2xl">
          <AdditionalResources />
        </div>
      </div>
    </div>
  );
}

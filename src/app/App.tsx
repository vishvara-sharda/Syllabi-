import { useState } from "react";
import { ThemeProvider, SidebarNavigation, SidebarButton } from "@figma/astraui";
import { Home, Accessibility, MousePointerClick, CalendarRange, BookOpen } from "lucide-react";
import { CourseTree } from "./components/CourseTree";
import { AccessibilityPage } from "./components/AccessibilityPage";
import { InteractionPage } from "./components/InteractionPage";
import { CalendarPage } from "./components/CalendarPage";
import { ArticlesPage } from "./components/ArticlesPage";

type Page = "home" | "accessibility" | "interaction" | "calendar" | "articles";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
        <SidebarNavigation>
          <SidebarButton
            icon={<Home className="size-full" strokeWidth={1.5} />}
            active={page === "home"}
            onClick={() => setPage("home")}
          />
          <SidebarButton
            icon={<Accessibility className="size-full" strokeWidth={1.5} />}
            active={page === "accessibility"}
            onClick={() => setPage("accessibility")}
          />
          <SidebarButton
            icon={<MousePointerClick className="size-full" strokeWidth={1.5} />}
            active={page === "interaction"}
            onClick={() => setPage("interaction")}
          />
          <SidebarButton
            icon={<CalendarRange className="size-full" strokeWidth={1.5} />}
            active={page === "calendar"}
            onClick={() => setPage("calendar")}
          />
          <SidebarButton
            icon={<BookOpen className="size-full" strokeWidth={1.5} />}
            active={page === "articles"}
            onClick={() => setPage("articles")}
          />
        </SidebarNavigation>

        <main className="flex-1 overflow-hidden">
          {page === "home" && <CourseTree />}
          {page === "accessibility" && <AccessibilityPage />}
          {page === "interaction" && <InteractionPage />}
          {page === "calendar" && <CalendarPage />}
          {page === "articles" && <ArticlesPage />}
        </main>
      </div>
    </ThemeProvider>
  );
}

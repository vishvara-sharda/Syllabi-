import { useState, useEffect } from "react";
import { BookOpen, Plus, ExternalLink, Trash2, Loader2, X, RefreshCw, Star } from "lucide-react";

interface Article {
  id: string;
  title: string;
  url: string;
  star: boolean;
  summary: string;
  recommendations: string;
}

const emptyForm = { title: "", url: "", star: false, summary: "", recommendations: "" };

// ── Article card ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  onDelete,
  deleting,
}: {
  article: Article;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        opacity: deleting ? 0.5 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <div style={{ padding: "var(--space-lg) var(--space-xl)" }}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-lg">
          <div className="flex items-center gap-sm min-w-0">
            {article.star && (
              <Star
                size={13}
                style={{ color: "#f5a623", fill: "#f5a623", flexShrink: 0 }}
              />
            )}
            {article.url ? (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-xs min-w-0"
                style={{
                  color: "var(--heading-accent)",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textDecoration: "none",
                }}
              >
                <span style={{ wordBreak: "break-word" }}>{article.title}</span>
                <ExternalLink
                  size={12}
                  className="shrink-0"
                  style={{ color: "var(--muted-foreground)", marginTop: 2 }}
                />
              </a>
            ) : (
              <span
                style={{
                  color: "var(--heading-accent)",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {article.title}
              </span>
            )}
          </div>

          <button
            onClick={onDelete}
            disabled={deleting}
            className="shrink-0 flex items-center justify-center rounded-[var(--radius-sm)]"
            style={{
              width: 28,
              height: 28,
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--muted-foreground)",
              cursor: deleting ? "not-allowed" : "pointer",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(220,50,50,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(220,80,80,1)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(220,80,80,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            }}
          >
            {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
          </button>
        </div>

        {/* Summary */}
        {article.summary && (
          <p
            style={{
              color: "var(--muted-foreground)",
              fontSize: 12,
              lineHeight: 1.6,
              marginTop: "var(--space-sm)",
            }}
          >
            {article.summary}
          </p>
        )}

        {/* Recommendations */}
        {article.recommendations && (
          <div style={{ marginTop: "var(--space-sm)" }}>
            <a
              href={article.recommendations}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs"
              style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <ExternalLink size={11} />
              <span>Recommendations</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add form ──────────────────────────────────────────────────────────────────

function inputStyle(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "var(--radius-md)",
    border: `1px solid ${focused ? "var(--heading-accent)" : "var(--border)"}`,
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.15s ease",
    boxSizing: "border-box" as const,
  };
}

function AddForm({
  onAdd,
  onCancel,
  submitting,
}: {
  onAdd: (form: typeof emptyForm) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState(emptyForm);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onAdd(form); }}
      className="rounded-[var(--radius-lg)]"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        padding: "var(--space-xl)",
      }}
    >
      <p style={{ color: "var(--heading-accent)", fontSize: 13, fontWeight: 600, marginBottom: "var(--space-lg)" }}>
        Add Article
      </p>

      <div className="flex flex-col gap-md">
        {/* Title */}
        <div className="flex flex-col gap-xs">
          <label style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Title *
          </label>
          <input
            required
            value={form.title}
            onChange={set("title")}
            placeholder="Article title"
            onFocus={() => setFocused("title")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "title")}
          />
        </div>

        {/* URL */}
        <div className="flex flex-col gap-xs">
          <label style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            URL
          </label>
          <input
            type="url"
            value={form.url}
            onChange={set("url")}
            placeholder="https://..."
            onFocus={() => setFocused("url")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "url")}
          />
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-xs">
          <label style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Summary
          </label>
          <textarea
            value={form.summary}
            onChange={set("summary")}
            placeholder="What was this article about?"
            rows={3}
            onFocus={() => setFocused("summary")}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle(focused === "summary"), resize: "vertical" }}
          />
        </div>

        {/* Recommendations */}
        <div className="flex flex-col gap-xs">
          <label style={{ color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Recommendations URL
          </label>
          <input
            type="url"
            value={form.recommendations}
            onChange={set("recommendations")}
            placeholder="https://..."
            onFocus={() => setFocused("recommendations")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "recommendations")}
          />
        </div>

        {/* Star */}
        <label
          className="flex items-center gap-sm"
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <input
            type="checkbox"
            checked={form.star}
            onChange={(e) => setForm((prev) => ({ ...prev, star: e.target.checked }))}
            style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#f5a623" }}
          />
          <span style={{ color: "var(--muted-foreground)", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={13} style={{ color: "#f5a623" }} /> Star this article
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-sm" style={{ marginTop: "var(--space-lg)" }}>
        <button
          type="submit"
          disabled={submitting || !form.title.trim()}
          className="flex items-center gap-sm"
          style={{
            padding: "7px 16px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--heading-accent)",
            border: "none",
            color: "var(--background)",
            fontSize: 13,
            fontWeight: 600,
            cursor: submitting || !form.title.trim() ? "not-allowed" : "pointer",
            opacity: submitting || !form.title.trim() ? 0.6 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          {submitting && <Loader2 size={13} className="animate-spin" />}
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "7px 16px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "transparent",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error(await res.text());
      setArticles(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(form: typeof emptyForm) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          url: form.url.trim() || null,
          star: form.star,
          summary: form.summary.trim() || null,
          recommendations: form.recommendations.trim() || null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setShowForm(false);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeletingId(null);
    }
  }

  const starredCount = articles.filter((a) => a.star).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
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
            <BookOpen size={18} style={{ color: "var(--chart-2)" }} />
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Reading Log
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
            Articles
          </h1>
          <p
            className="mt-xs"
            style={{
              color: "var(--muted-foreground)",
              fontSize: "var(--text-sm, 13px)",
              lineHeight: 1.5,
            }}
          >
            {articles.length} article{articles.length !== 1 ? "s" : ""} saved
            {starredCount > 0 && ` · ${starredCount} starred`}
            {" · synced with Notion"}
          </p>
        </div>

        <div className="flex items-center gap-sm shrink-0" style={{ marginTop: 4 }}>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center justify-center rounded-[var(--radius-md)]"
            style={{
              width: 32,
              height: 32,
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--muted-foreground)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            title="Refresh"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-sm"
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-md)",
              backgroundColor: showForm ? "var(--accent)" : "var(--heading-accent)",
              border: showForm ? "1px solid var(--border)" : "none",
              color: showForm ? "var(--muted-foreground)" : "var(--background)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? "Cancel" : "Add Article"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: "var(--space-2xl)", backgroundColor: "var(--background)" }}
      >
        <div className="flex flex-col gap-md max-w-3xl mx-auto">
          {/* Error */}
          {error && (
            <div
              className="rounded-[var(--radius-md)] flex items-center justify-between gap-md"
              style={{
                padding: "10px 14px",
                backgroundColor: "rgba(220,50,50,0.08)",
                border: "1px solid rgba(220,50,50,0.25)",
                color: "rgba(220,80,80,1)",
                fontSize: 13,
              }}
            >
              <span>{error}</span>
              <button onClick={() => setError(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Add form */}
          {showForm && (
            <AddForm
              onAdd={handleAdd}
              onCancel={() => setShowForm(false)}
              submitting={submitting}
            />
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center" style={{ padding: "var(--space-2xl)", color: "var(--muted-foreground)" }}>
              <Loader2 size={20} className="animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)]"
              style={{
                padding: "var(--space-2xl)",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
                textAlign: "center",
                gap: "var(--space-sm)",
              }}
            >
              <BookOpen size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 14, fontWeight: 500 }}>No articles yet</p>
              <p style={{ fontSize: 12 }}>Click "Add Article" to save your first one</p>
            </div>
          )}

          {/* Article list */}
          {!loading && articles.map((a) => (
            <ArticleCard
              key={a.id}
              article={a}
              onDelete={() => handleDelete(a.id)}
              deleting={deletingId === a.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

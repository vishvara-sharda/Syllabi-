import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB = process.env.NOTION_DATABASE_ID!;

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const response = await notion.databases.query({
        database_id: DB,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      });

      const articles = response.results.map((page: any) => ({
        id: page.id,
        title: page.properties.Name?.title?.[0]?.plain_text ?? "Untitled",
        url: page.properties.URL?.url ?? "",
        star: page.properties.Star?.checkbox ?? false,
        summary: page.properties.Summary?.rich_text?.[0]?.plain_text ?? "",
        recommendations: page.properties.Recommendations?.url ?? "",
      }));

      return res.json(articles);
    }

    if (req.method === "POST") {
      const { title, url, star, summary, recommendations } = req.body;

      const page = await notion.pages.create({
        parent: { database_id: DB },
        properties: {
          Name: { title: [{ text: { content: title || "Untitled" } }] },
          ...(url ? { URL: { url } } : {}),
          Star: { checkbox: star ?? false },
          ...(summary ? { Summary: { rich_text: [{ text: { content: summary } }] } } : {}),
          ...(recommendations ? { Recommendations: { url: recommendations } } : {}),
        },
      });

      return res.json({ id: (page as any).id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

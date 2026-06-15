import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const response = await notion.search({
      filter: { value: "data_source", property: "object" },
    });
    return res.json(response.results.map((db: any) => ({
      id: db.id,
      title: db.title?.[0]?.plain_text ?? "Untitled",
    })));
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

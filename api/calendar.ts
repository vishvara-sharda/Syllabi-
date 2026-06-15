import { put, list } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const { blobs } = await list({ prefix: "calendar-state" });
      if (blobs.length === 0) return res.json({ state: null });
      const response = await fetch(blobs[0].url);
      const data = await response.json();
      return res.json(data);
    }

    if (req.method === "POST") {
      await put("calendar-state.json", JSON.stringify(req.body), {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/json",
      });
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

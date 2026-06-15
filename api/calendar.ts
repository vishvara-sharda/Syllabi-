const BIN_ID = process.env.JSONBIN_BIN_ID!;
const API_KEY = process.env.JSONBIN_API_KEY!;
const BASE = "https://api.jsonbin.io/v3/b";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const response = await fetch(`${BASE}/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": API_KEY },
      });
      const data = await response.json();
      return res.json(data.record);
    }

    if (req.method === "POST") {
      await fetch(`${BASE}/${BIN_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
        body: JSON.stringify(req.body),
      });
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

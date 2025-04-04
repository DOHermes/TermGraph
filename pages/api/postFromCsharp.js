import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    const data = req.body;

    try {
      if (Array.isArray(data)) {
        await FurnaceData.insertMany(data);
        res.status(201).json({ message: "Veriler başarıyla eklendi.", count: data.length });
      } else {
        await FurnaceData.create(data);
        res.status(201).json({ message: "Tek veri eklendi." });
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      res.status(500).json({ message: "Veri eklenemedi.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

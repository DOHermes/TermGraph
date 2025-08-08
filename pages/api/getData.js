import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await connectDB();

    const { furnaceId, from, to } = req.query;

    if (!furnaceId) {
      return res.status(400).json({ error: "furnaceId gerekli" });
    }

    const query = { furnaceId };

    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from);
      if (to)   query.timestamp.$lte = new Date(to);
    }

    // 1. Toplam veri sayısını al
    const totalCount = await FurnaceData.countDocuments(query);

    // 2. Kaç veri istiyoruz? (maksimum 1000)
    const maxPoints = 1000;

    let data = [];

    if (!from && !to) {
      // Tarih seçilmemişse → son 6000'den her 10. veri
      data = await FurnaceData.find(query)
        .sort({ timestamp: -1 })
        .limit(10000)
        .lean();

      // sadece her 10. kaydı al
      data = data.filter((_, i) => i % 10 === 0).reverse();
    } else {
      // Tarih seçilmişse → seyreltme oranını hesapla
      const skipRatio = totalCount > maxPoints ? Math.floor(totalCount / maxPoints) : 1;

      const rawData = await FurnaceData.find(query)
        .sort({ timestamp: 1 }) // tarih aralığı sıralı gitsin
        .lean();

      // her skipRatio'nun katı olan kayıtları al
      data = rawData.filter((_, i) => i % skipRatio === 0);
    }

    res.status(200).json({ count: data.length, totalCount, data });
  } catch (error) {
    console.error("API getData error:", error);
    res.status(500).json({
      message: "Veriler alınamadı.",
      error: error.message || "Bilinmeyen hata",
    });
  }
}

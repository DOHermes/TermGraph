import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await connectDB();

    const { furnaceId, from, to } = req.query;
    const maxPoints = 1000;

    const ids = furnaceId
      ? [furnaceId]
      : await FurnaceData.distinct("furnaceId");

    const result = [];

    for (const id of ids) {
      const query = { furnaceId: id };

      if (from || to) {
        query.timestamp = {};
        if (from) query.timestamp.$gte = new Date(from);
        if (to)   query.timestamp.$lte = new Date(to);
      }

      const totalCount = await FurnaceData.countDocuments(query);
      const skipRatio = totalCount > maxPoints ? Math.floor(totalCount / maxPoints) : 1;

      let raw = [];

      if (!from && !to) {
        raw = await FurnaceData.find(query)
          .sort({ timestamp: -1 })
          .limit(skipRatio * maxPoints) // 10k yerine daha doğru limit
          .lean();

        raw = raw.filter((_, i) => i % skipRatio === 0).reverse();
      } else {
        raw = await FurnaceData.find(query)
          .sort({ timestamp: 1 })
          .limit(skipRatio * maxPoints)
          .lean();

        raw = raw.filter((_, i) => i % skipRatio === 0);
      }

      result.push({ furnaceId: id, count: raw.length, totalCount, data: raw });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("API getData error:", error);
    res.status(500).json({
      message: "Veriler alınamadı.",
      error: error.message || "Bilinmeyen hata",
    });
  }
}

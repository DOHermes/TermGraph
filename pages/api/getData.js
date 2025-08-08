import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await connectDB();

    const result = await FurnaceData.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$furnaceId", data: { $push: "$$ROOT" } } },
      { $project: { furnaceId: "$_id", data: { $slice: ["$data", 2000] } } },
    ], {
      allowDiskUse: true 
    });

    // Her ihtimale karşı array değilse boş array döndür
    const data = Array.isArray(result) ? result : [];

    res.status(200).json(data);
  } catch (error) {
    console.error("API getData error:", error);
    res.status(500).json({
      message: "Veriler alınamadı.",
      error: error.message || "Bilinmeyen hata",
    });
  }
}

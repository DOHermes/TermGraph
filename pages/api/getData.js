import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await connectDB();

    // Tüm fırın ID'lerini çek
    const furnaceIds = await FurnaceData.distinct("furnaceId");

    // Her fırının son 2000 kaydını çek
    const allData = [];

    for (const id of furnaceIds) {
      const data = await FurnaceData.find({ furnaceId: id })
        .sort({ timestamp: -1 })
        .limit(2000)
        .lean(); // gereksiz mongoose metadata'yı atar

      allData.push({
        furnaceId: id,
        data: data.reverse() // eskiden yeniye sıralamak için
      });
    }

    res.status(200).json(allData);
  } catch (error) {
    console.error("API getData error:", error);
    res.status(500).json({
      message: "Veriler alınamadı.",
      error: error.message || "Bilinmeyen hata",
    });
  }
}

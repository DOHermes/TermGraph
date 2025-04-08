import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();

    try {
      // Tüm fırınların verilerini gruplayarak çek
      const data = await FurnaceData.aggregate([
        { $sort: { timestamp: -1 } }, // En son verileri al
        { $group: { _id: "$furnaceId", data: { $push: "$$ROOT" } } }, // Fırın ID'lerine göre grupla
        { $project: { furnaceId: "$_id", data: { $slice: ["$data", 2000] } } }, // Her fırından son 20 veriyi al
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Veriler alınamadı.", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

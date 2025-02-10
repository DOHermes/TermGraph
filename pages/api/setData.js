import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();

    // Rastgele 16 fırın için 50'şer veri oluştur
    const randomData = [];
    for (let furnaceId = 1; furnaceId <= 16; furnaceId++) {
      for (let i = 0; i < 50; i++) {
        randomData.push({
          furnaceId,
          timestamp: new Date(Date.now() - i * 1000 * 60), // 1 dakikalık aralıklarla
          temperature: Math.random() * 100, // 0 ile 100 arasında rastgele sıcaklık
        });
      }
    }

    try {
      // MongoDB'ye rastgele verileri ekle
      await FurnaceData.insertMany(randomData);
      res.status(201).json({ message: "16 fırın için 50'şer veri başarıyla eklendi!" });
    } catch (error) {
      res.status(500).json({ message: "Veriler kaydedilemedi.", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

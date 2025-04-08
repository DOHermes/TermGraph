import connectDB from "./database";
import { CoilState } from "./coilState";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    const { coilsHex } = req.body;

    if (!coilsHex) {
      return res.status(400).json({ message: "coilsHex eksik!" });
    }

    try {
      const result = await CoilState.findByIdAndUpdate(
        "current", // sabit tek veri
        { coilsHex, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      res.status(200).json({
        message: "Coil verisi güncellendi.",
        coilsHex: result.coilsHex,
        updatedAt: result.updatedAt,
      });
    } catch (error) {
      console.error("Coil güncelleme hatası:", error);
      res.status(500).json({ message: "Güncelleme başarısız.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
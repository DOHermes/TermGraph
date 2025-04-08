import connectDB from "./database";
import { CoilState } from "./coilState";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();

    try {
      const doc = await CoilState.findById("current");

      if (!doc || !doc.coilsHex) {
        return res.status(404).json({ message: "Veri bulunamadı." });
      }

      const coilsHex = doc.coilsHex;
      const coilsBool = hexToBoolArray(coilsHex); // 18 adet bool gelir

      // 500–517 arası key’lerle nesne oluştur
      const result = {};
      for (let i = 0; i < 18; i++) {
        result[(500 + i).toString()] = coilsBool[i];
      }

      res.status(200).json(result);
    } catch (error) {
      console.error("Coil veri okuma hatası:", error);
      res.status(500).json({ message: "Veri alınamadı.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// HEX → 18 bitlik bool[] dönüşümü
function hexToBoolArray(hex) {
  const bytes = [];

  // Hex'i byte dizisine çevir (örneğin "01AB3C" → [0x01, 0xAB, 0x3C])
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  const bits = [];
  for (let i = 0; i < 3; i++) {
    const b = bytes[i] || 0;
    for (let j = 0; j < 8; j++) {
      bits.push((b & (1 << j)) !== 0); // LSB → MSB yönünde
    }
  }

  return bits.slice(0, 18); // Sadece 18 adet değer döndür
}

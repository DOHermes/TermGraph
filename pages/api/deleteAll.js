import connectDB, { FurnaceData } from "./database";

export default async function handler(req, res) {
    await connectDB();

    try {
      const result = await FurnaceData.deleteMany({});
      res.status(200).json({ message: "Tüm veriler silindi.", deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ message: "Veriler silinemedi.", error });
    }

}
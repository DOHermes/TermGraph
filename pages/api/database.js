import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// MongoDB Şeması
const FurnaceDataSchema = new mongoose.Schema({
  furnaceId: Number, // Fırın ID'si (1-16)
  timestamp: Date,   // Veri zamanı
  temperature: Number, // Sıcaklık değeri
});

export const FurnaceData = mongoose.models.FurnaceData || mongoose.model("FurnaceData", FurnaceDataSchema);
export default connectDB;

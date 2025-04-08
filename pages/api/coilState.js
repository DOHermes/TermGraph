import mongoose from "mongoose";

const CoilStateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "current", // Sabit ID (tek belgeyi temsil eder)
  },
  coilsHex: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Eğer model daha önce tanımlanmışsa tekrar tanımlama
export const CoilState = mongoose.models.CoilState || mongoose.model("CoilState", CoilStateSchema);

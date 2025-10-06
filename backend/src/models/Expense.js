import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Groceries", "Health", "Rent", "Other"],
      default: "Other",
    },
    note: { type: String },
    merchant: { type: String },
    date: { type: Date, default: Date.now },
    source: { type: String, enum: ["UPI", "Card", "Cash", "NetBanking", "Other"], default: "Other" }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);

import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Expense from "../models/Expense.js";
import { aiCategorize, aiInsights } from "../services/openai.js";

const router = express.Router();

// auto-categorize
router.post("/categorize", requireAuth, async (req, res) => {
  const { note, merchant } = req.body;
  const category = await aiCategorize({ note, merchant });
  res.json({ category });
});

// monthly insights
router.get("/insights", requireAuth, async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { user: req.userId } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $project: { _id: 0, category: "$_id", total: 1 } }
  ]);

  const insights = await aiInsights(summary);
  res.json({ insights });
});

export default router;

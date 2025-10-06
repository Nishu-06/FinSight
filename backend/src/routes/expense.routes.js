import express from "express";
import Expense from "../models/Expense.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Add expense
router.post("/", requireAuth, async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.userId });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all expenses of logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get category-wise summary
router.get("/summary", requireAuth, async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

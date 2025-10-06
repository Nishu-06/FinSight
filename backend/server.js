import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import expenseRoutes from './src/routes/expense.routes.js';
import aiRoutes from './src/routes/ai.routes.js';

const app = express();
app.use(express.json());

// ✅ CORS setup with env
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true
}));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, project: "FinSight AI Finance Assistant", time: new Date().toISOString() });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ FinSight backend running at http://localhost:${PORT}`));
});

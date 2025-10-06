import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI: categorize expense
export async function aiCategorize({ note, merchant }) {
  const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Groceries", "Health", "Rent", "Other"];

  const prompt = `Classify this expense into one of the categories: ${categories.join(", ")}.
  Example: "Zomato order" -> Food, "Uber ride" -> Travel, "Airtel bill" -> Bills.  
  Expense: ${note || ""}, Merchant: ${merchant || ""}`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return resp.choices[0].message.content.trim();
}

// AI: generate insights
export async function aiInsights(summary) {
  const prompt = `You are a finance coach. Analyze this monthly spending summary: ${JSON.stringify(summary)}.
  Give me:
  1) 3 short savings tips in India context.
  2) One line budget focus for next month.
  3) A Money Health Score between 0-100.`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return resp.choices[0].message.content.trim();
}

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
};


const chatbot = async (products, userQuestion) => {
  const productSummary = products
    .map(
      (p) =>
        `{
  "id": ${p.id},
  "title": "${p.title}",
  "price": ${p.price},
  "category": "${p.category}",
  "description": "${p.description.replace(/"/g, "'")}",
  "image": "${p.image}"
}`
    )
    .join(",\n");

    const systemPrompt = `
    You are a smart AI shopping assistant for an e-commerce website.

    🔹 Your job is to:
    - Understand the user's shopping query, including filtering by category, price range, and other preferences.
    - Recommend matching products from the list strictly matching the filters.
    - Return the result in JSON format like:
      {
        "message": "optional assistant comment",
        "products": [ array of matching products ]
      }

    Each product should include:
    - title
    - price (number)
    - category
    - description
    - image

    🛍 Available products:
    [
    ${productSummary}
    ]

    💡 Important:
    - When the user asks for products under a certain price (e.g., under $50), only include products with price **less than or equal** to that value.
    - Do not include any products priced above the specified limit.
    - If no products match, return an empty "products" array with a friendly message.
    - Always return valid JSON only — no extra text outside JSON.

    💬 Example output:
    {
      "message": "Here are some electronics under $50:",
      "products": [
        {
          "title": "Portable USB Drive 128GB",
          "price": 29.99,
          "category": "electronics",
          "description": "Compact and fast portable USB 3.0 drive.",
          "image": "https://example.com/img.jpg"
        }
      ]
    }

    Now respond to this user query:
    `;



  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuestion },
    ],
    temperature: 0.4,
  });

  const content = completion.choices[0].message.content;

  try {
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    const jsonString = content.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse JSON from OpenAI:", content);
    return {
      message: "Sorry, I couldn't process your request properly.",
      products: [],
    };
  }
};

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Invalid question" });
    }

    const products = await getProducts();
    const aiResponse = await chatbot(products, question);

    res.json({
      message: aiResponse.message || "Here are some products you may like:",
      products: aiResponse.products || [],
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

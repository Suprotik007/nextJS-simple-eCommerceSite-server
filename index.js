const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = process.env.MONGODB_URI 
const client = new MongoClient(uri);
let productsCollection;

async function run() {
  try {
    await client.connect();
    const db = client.db("nextjs-shop");
    productsCollection = db.collection("products");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
run();

// Routes
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await productsCollection.find().toArray();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// app.post("/api/products", async (req, res) => {
//   try {
//     const product = req.body;
//     const result = await productsCollection.insertOne(product);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add product" });
//   }
// });

// Start server
app.get("/", (req, res) => {
  res.send("🚀 Server is running fine ");
});

app.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});

import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import "dotenv/config"; // Load your .env.local values

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function uploadBill() {
  try {
    await client.connect();
    const db = client.db("legislation");
    const collection = db.collection("simplified_bills");

    // Adjust this to your actual path to final_summarized_bill.txt
    const filePath = path.join(process.cwd(), "storage", "final_summarized_bill.txt");
    const simplifiedText = fs.readFileSync(filePath, "utf-8");

    await collection.insertOne({
      state: "WA",
      bill: "Bill #1: Stop Logging",
      simplified: simplifiedText,
      date: new Date()
    });

    console.log("Uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
  } finally {
    await client.close();
  }
}

uploadBill();

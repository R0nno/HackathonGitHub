import { MongoClient, ServerApiVersion } from 'mongodb';
import axios from 'axios';

const uri = process.env.MONGODB_URI;
const openaiKey = process.env.OPENAI_API_KEY; // from .env.local

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { state, bill } = req.body;

      // Placeholder: you don't have PDFs yet
      const text_to_summarize = `Summarize the legislation about ${bill} for the state of ${state}.`;

      const prompt = `Simplify this legislative bill into plain English:\n\n${text_to_summarize}`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }]
        },
        {
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          }
        }
      );

      const simplified_text = response.data.choices[0].message.content;

      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

      await client.connect();
      const db = client.db('legislation');
      await db.collection('simplified_bills').insertOne({
        state,
        bill,
        simplified: simplified_text,
        date: new Date()
      });
      await client.close();

      res.status(200).json({ message: 'Bill simplified and saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing bill.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

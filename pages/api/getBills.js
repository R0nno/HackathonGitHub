import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("legislation"); // Your database name
    const collection = db.collection("simplified_bills"); // Your collection name

    const { state } = req.query;

    if (!state) {
      return res.status(400).json({ message: "Missing 'state' query parameter." });
    }

    // Find bills that match the state
    const bills = await collection.find({ state: state }).toArray();

    res.status(200).json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bills." });
  }
}

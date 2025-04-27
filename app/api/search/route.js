/*import clientPromise from "./../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { bill_code } = req.body;
  console.log("bill_code received:", bill_code);

  const client = await clientPromise;
  const db = client.db('Bills_Summary');
  const bills = db.collection('Bills');

  console.log("Searching for:", bill_code);

  const bill = await bills.findOne({ bill_code: bill_code}); 


  console.log("Result:", bill);

  if (!bill) {
    return res.status(404).json({ message: "Bill not found" });
  }

  res.status(200).json({
    bill_summary: bill.bill_summary,
    bill_representatives: bill.bill_representatives,
  });
}
*/

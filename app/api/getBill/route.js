import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const { id } = await req.json();
    console.log('Incoming ID:', id);

    if (!id) {
      return new Response(JSON.stringify({ error: 'No ID provided' }), { status: 400 });
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db('Bills_Summary');
    const collection = database.collection('Bills');

    const bill = await collection.findOne({ bill_code: id });

    if (!bill) {
      console.log('Bill not found');
      return new Response(JSON.stringify({ error: 'Bill not found' }), { status: 404 });
    }

    console.log('Found Bill:', bill);

    return new Response(JSON.stringify({ bill_summary: bill.bill_summary }), { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

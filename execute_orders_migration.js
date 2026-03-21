const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const envFile = fs.readFileSync('.env', 'utf8');
  let directUrl = '';
  for (const line of envFile.split('\n')) {
    if (line.startsWith('DIRECT_URL=')) {
      directUrl = line.split('=')[1].trim();
      break;
    }
  }

  const client = new Client({ connectionString: directUrl });
  try {
    await client.connect();
    
    // Order Table
    const createOrderTableQuery = `
      CREATE TABLE IF NOT EXISTS "Order" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "customerName" TEXT NOT NULL,
        "customerEmail" TEXT NOT NULL,
        "customerPhone" TEXT,
        "customerAddress" TEXT,
        "totalAmount" NUMERIC(10,2) NOT NULL,
        "razorpayOrderId" TEXT UNIQUE,
        "razorpayPaymentId" TEXT UNIQUE,
        "razorpaySignature" TEXT,
        status TEXT DEFAULT 'pending',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    await client.query(createOrderTableQuery);

    // OrderItem Table
    const createOrderItemTableQuery = `
      CREATE TABLE IF NOT EXISTS "OrderItem" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "orderId" UUID NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
        "productId" TEXT NOT NULL,
        "productName" TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        quantity INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    await client.query(createOrderItemTableQuery);
    
    console.log("Migration successful: Order and OrderItem tables created");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}
run();

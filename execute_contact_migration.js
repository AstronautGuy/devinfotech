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
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "ContactTicket" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'unread',
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    
    await client.query(createTableQuery);

    // Also add RLS policies or make it accessible to anon if needed. 
    // Usually server side inserts bypass RLS if service_role is used.
    
    console.log("Migration successful: ContactTicket table created");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}
run();

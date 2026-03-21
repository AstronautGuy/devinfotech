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
    await client.query('ALTER TABLE "Product" ADD COLUMN category text;');
    console.log("Migration successful");
  } catch (err) {
    if (err.message.includes('already exists')) {
       console.log("Migration successful (column already exists)");
    } else {
       console.error("Migration failed:", err);
    }
  } finally {
    await client.end();
  }
}
run();

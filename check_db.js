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
    const res = await client.query('SELECT COUNT(*) FROM "Product"');
    console.log("Products count:", res.rows[0].count);
    const res2 = await client.query(`SELECT COUNT(*) FROM "_ProductToTag"`);
    console.log("ProductToTag count:", res2.rows[0].count);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();

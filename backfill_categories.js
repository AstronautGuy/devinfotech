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
    const query = `
      UPDATE "Product" p
      SET category = subquery.tag_name
      FROM (
        SELECT pt."A" as product_id, t.name as tag_name,
        ROW_NUMBER() OVER(PARTITION BY pt."A" ORDER BY t.name) as rk
        FROM "_ProductToTag" pt
        JOIN "Tag" t ON t.id = pt."B"
      ) subquery
      WHERE subquery.product_id = p.id AND subquery.rk = 1 AND p.category IS NULL;
    `;
    const res = await client.query(query);
    console.log(`Migration successful: Backfilled ${res.rowCount} products with their primary category/tag.`);
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}
run();

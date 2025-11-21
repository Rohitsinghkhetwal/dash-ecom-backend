import { pool } from "./db";

async function createTable() {
  // const query = `
  //   CREATE TABLE IF NOT EXISTS products (
  //     id SERIAL PRIMARY KEY,
  //     name TEXT NOT NULL,
  //     image_url TEXT NOT NULL,
  //     type TEXT NOT NULL,
  //     brand TEXT NOT NULL,
  //     rating NUMERIC DEFAULT 0,
  //     price NUMERIC NOT NULL,
  //     old_price NUMERIC,
  //     weight TEXT,
  //     diet_type TEXT,
  //     tag TEXT,
  //     created_at TIMESTAMP DEFAULT NOW()
  //   );
  // `;

//   const query = `  CREATE TABLE email_verification (
//   email TEXT PRIMARY KEY,
//   otp TEXT,
//   is_verified BOOLEAN DEFAULT false,
//   verified_at TIMESTAMP
// );`
// const query = ` CREATE TABLE IF NOT EXISTS orders (
//   id SERIAL PRIMARY KEY,
//   email TEXT NOT NULL,
//   first_name TEXT NOT NULL,
//   last_name TEXT NOT NULL,
//   address TEXT NOT NULL,
//   city TEXT NOT NULL,
//   country TEXT NOT NULL,
//   post_code TEXT,
//   region_state TEXT,
//   payment_method TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW()
// );
// `

const query = `CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL
);
`



  try {
    await pool.query(query);
    console.log("✅ Table created successfully");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    pool.end();
  }
}

createTable();

const { Pool } = require('pg');

const pool = new Pool({
  user: 'yourusername',      
  host: 'localhost',
  database: 'TestOrder',     
  password: 'yourpassword',  
  port: 5432,
});

const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      orderID VARCHAR(50) NOT NULL
    );
  `;
  await pool.query(queryText);
};

const insertOrderID = async (orderID) => {
  const queryText = 'INSERT INTO orders(orderID) VALUES($1) RETURNING *';
  const values = [orderID];
  const res = await pool.query(queryText, values);
  return res.rows[0];
};

module.exports = {
  pool,
  createTable,
  insertOrderID
};

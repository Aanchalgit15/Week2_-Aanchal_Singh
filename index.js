const express = require('express');
const bodyParser = require('body-parser');
const { pool, createTable, insertOrderID } = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize database table
createTable();

app.post('/filter-orders', async (req, res) => {
  const items = req.body.items;
  if (!items) {
    return res.status(400).send('Items list is required');
  }

  // Filter out orders whose any OrderBlock’s LineNo is divisible by 3
  const filteredOrders = items.filter(order => 
    !order.OrderBlocks.some(block => block.LineNo % 3 === 0)
  );

  // Insert orderIDs into the database iteratively
  try {
    for (const order of filteredOrders) {
      await insertOrderID(order.orderID);
    }
    res.status(200).send('Filtered orders have been processed and stored.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing orders');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

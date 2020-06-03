const express = require('express');
const router = express.Router();

const db = require('./postgres');

router.get('/', (req, res) => {
  res.json({ message: 'Hello from router!' });
});

/**
 * @route   GET /api/donations/:table
 * @desc    Get all entries from specified table
 * @access  Public
 */
router.get('/:table', async (req, res) => {
  try {
    const query = `SELECT * FROM ${req.params.table};`;
    const result = await db.query(query);
    res.json({ result: result.rows });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

/**
 * @route   POST /api/donations
 * @desc    Arrange new delivery and add new items to DB
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // Destructure the request body
    const { items, destination, pickup_by, pickup_from } = req.body;

    // Prepare queries
    const deliveryQuery = `
      INSERT INTO deliveries (id, destination, pickup_by, pickup_from)
      VALUES (uuid_generate_v4(), $1, $2, $3)
      RETURNING *;
    `;
    const itemsQuery = `
      INSERT INTO items (id, name, quantity, deliveries_id)
      VALUES (uuid_generate_v4(), $1, $2, $3);
    `;

    // Add new delivery entry
    const result = await db.query(deliveryQuery, [destination, pickup_by, pickup_from]);

    // Save the delivery_id as the foreign key for each of the items
    const deliveries_id = result.rows[0].id;

    // Iterate through items array and store each
    for (let item of items) {
      await db.query(itemsQuery, [item.name, item.quantity, deliveries_id]);
    }

    // Send successful message *** MAY be altered depending on the frontend ***
    res.json({ message: 'success' });
  } catch ({ message }) {
    // Send 418 on unsuccessful response
    res.status(418).json({ message });
  }
});

/**
 * @route   PATCH /api/donations/item/:id
 * @desc    Change information about an existing item
 * @access  Public
 */
router.patch('/item/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, quantity } = req.body;
    let changes;

    if (name && quantity) {
      // Updating name and quantity
      changes = `SET name = '${name}', quantity = ${quantity}`;
    } else if (name) {
      // Updating name only
      changes = `SET name = '${name}'`;
    } else if (quantity) {
      // Updating quantity only
      changes = `SET quantity = ${quantity}`;
    }

    // Construct final query
    const query = `
      UPDATE items
      ${changes}
      WHERE id = '${id}'
      RETURNING *;`;

    const result = await db.query(query);

    // Send back successful response
    res.json({
      message: 'Successfully updated items',
      item: result.rows[0],
    });
  } catch ({ message }) {
    // Send back error message
    res.status(418).json({ message });
  }
});

/**
 * @route   PATCJ /api/donations/delivery/:id
 * @desc    Change information about an existing delivery
 * @access  Public
 */
router.patch('/delivery/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { destination, pickup_by, pickup_from } = req.body;
    let changes = [];

    // Update destinations as needed
    if (destination) changes.push(`destination = '${destination}'`);

    if (pickup_by) changes.push(`pickup_by = '${pickup_by}'`);

    if (pickup_from) changes.push(`pickup_from = '${pickup_from}'`);

    // Construct final query
    changes = 'SET ' + changes.join(', ');

    const query = `
      UPDATE deliveries
      ${changes}
      WHERE id = '${id}'
      RETURNING *;`;

    const result = await db.query(query);

    // Send back successful response
    res.json({
      message: 'Successfully updated delivery',
      delivery: result.rows[0],
    });
  } catch ({ message }) {
    // Send back error message
    res.status(418).json({ message });
  }
});

/**
 * @route   DELETE /api/donations/delivery/:id
 * @desc    Cancel an existing delivery
 * @access  Public
 */
router.delete('/delivery/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const itemsQuery = `
      DELETE FROM items
      WHERE deliveries_id = '${id}'
      RETURNING *;`;

    const deletedItems = await db.query(itemsQuery);
    console.log(deletedItems);

    const deliveryQuery = `
      DELETE FROM deliveries
      WHERE id = '${id}'
      RETURNING *;`;

    const deletedDelivery = await db.query(deliveryQuery);

    // Send back successful response with deleted delivery and items
    res.json({
      message: 'Successfully cancelled delivery',
      delivery: deletedDelivery.rows[0],
      items: deletedItems.rows,
    });
  } catch ({ message }) {
    // Send back error message
    res.status(418).json({ message });
  }
});

/**
 * @route   DELETE /api/donations/item/:id
 * @desc    Delete an item from a delivery
 * @access  Public
 */
router.delete('/item/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Construct query
    const query = `
      DELETE FROM items
      WHERE id = '${id}'
      RETURNING *;`;

    const result = await db.query(query);

    // Send back successful response with deleted item
    res.json({
      message: 'Successfully deleted item',
      item: result.rows[0],
    });
  } catch ({ message }) {
    // Send back error message
    res.status(418).json({ message });
  }
});

module.exports = router;
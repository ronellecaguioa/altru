const express = require('express');
const router = express.Router();

const db = require('./postgres');

/**
 * @route   GET /api/donations/items
 * @desc    Get all item entries
 * @access  Public
 */
router.get('/items', async (req, res) => {
  try {
    const query = `SELECT * FROM items;`;
    const result = await db.query(query);
    res.json({ items: result.rows });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

/**
 * @route   GET /api/donations/allDeliveries
 * @desc    Get all deliveries
 * @access  Public
 */
router.get('/allDeliveries', async (req, res) => {
  try {
    const query = `
    SELECT * FROM deliveries;`;

    let deliveries = await db.query(query);
    deliveries = deliveries.rows;

    res.json({ deliveries });
  } catch ({ message }) {
    res.status(418).json({ message });
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
    console.log('THE SERVER, ', req.body);

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
    res.json({
      message: 'success',
      data: result.rows[0],
    });
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
 * @route   PATCH /api/donations/delivery/:id
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

    const deliveryQuery = `
      DELETE FROM deliveries
      WHERE id = '${id}'
      RETURNING *;`;

    const deletedDelivery = await db.query(deliveryQuery);

    // Send back successful response with deleted delivery and items
    res.json({
      message: 'Successfully cancelled delivery',
      delivery: deletedDelivery.rows[0].id,
      items: deletedItems.rows.map(item => item.id),
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

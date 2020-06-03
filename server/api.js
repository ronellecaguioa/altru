const express = require('express');
const router = express.Router();

const db = require('./postgres');

router.get('/', (req, res) => {
  res.json({ message: 'Hello from router!' });
});

/**
 * @route   GET /api/donations
 * @desc    Get all items from DB
 * @access  Public
 */
router.get('/donations', async (req, res) => {
  try {
    const query = 'SELECT * FROM items;';
    const result = await db.query(query);
    res.status(200).json({ items: result.rows });
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

  try {
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
 * @route   patch /api/donations/item/:id
 * @desc    Change information about an existing item
 * @access  Public
 */
router.patch('/item/:id', async (req, res) => {
  const id = req.params.id;
  const { name, quantity } = req.body;
  let changes;

  if (name && quantity) {
    // Updating name and quantity
    changes = `
      SET (name, quantity) = ('${name}', ${quantity})`;

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
  try {
    const result = await db.query(query)
    res.json({
      message: 'Successfully updated items',
      item: result.rows[0]
    })
  } catch ({ message }) {
    res.json({ message })
  }
});

/**
 * @route   patch /api/donations/delivery/:id
 * @desc    Change information about an existing delivery
 * @access  Public
 */
router.patch('/delivery/:id', (req, res) => {});

module.exports = router;

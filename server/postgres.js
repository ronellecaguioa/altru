const { Pool } = require('pg')
require('dotenv/config')

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  hostname: process.env.PG_HOST,
  port: 5432,
  database: "altru"
})

module.exports = pool;
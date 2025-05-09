// lib/redis.js
const { createClient } = require("redis");

const redis = createClient({
    url: process.env.REDIS_URL, // e.g. "redis://default:<password>@<host>:<port>"
});

redis.on("error", (err) => console.error("Redis Error", err));
redis.connect();

module.exports = redis;

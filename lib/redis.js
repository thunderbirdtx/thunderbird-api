const { createClient } = require("redis");
const redis = createClient();

redis.on("error", (err) => console.error("Redis Error", err));

// Only connect outside of test environment
if (process.env.NODE_ENV !== "test") {
    redis.connect();
}

module.exports = redis;

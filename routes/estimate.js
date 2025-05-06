const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.blocknative.com/gasprices/blockprices",
            {
                headers: {
                    Authorization: process.env.BLOCKNATIVE_KEY,
                },
            }
        );

        const prices = response.data.blockPrices?.[0]?.estimatedPrices;
        if (!prices) {
            return res.status(500).json({ error: "No gas prices found" });
        }

        // You can pass confidence in request (default to 90)
        const confidence = req.body.confidence || 90;
        const tier =
            prices.find((p) => p.confidence === confidence) || prices[0];

        res.json({
            confidence: tier.confidence,
            maxFeePerGas: tier.maxFeePerGas,
            maxPriorityFeePerGas: tier.maxPriorityFeePerGas,
            unit: "Gwei",
        });
    } catch (error) {
        console.error("Estimate Gas Error:", error.message);
        res.status(500).json({ error: "Failed to fetch gas estimates" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

// You should have this set in your .env
const RPC_URL = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);

router.get("/", async (req, res) => {
    const { to, data, value, from } = req.query;

    if (!to || !data) {
        return res.status(400).json({ error: "Missing 'to' or 'data' in query params." });
    }

    try {
        const tx = {
            to,
            data,
            from: from || ethers.ZeroAddress,
            value: value ? ethers.parseEther(value).toString() : "0x0",
        };

        const result = await provider.call(tx);

        const gasEstimate = await provider.estimateGas(tx);

        res.json({
            success: true,
            gasUsed: gasEstimate.toString(),
            returnData: result,
        });
    } catch (err) {
        console.error("Simulation failed:", err);
        res.status(500).json({
            success: false,
            error: err.reason || err.message || "Unknown error",
        });
    }
});

module.exports = router;

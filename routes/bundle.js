const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// You can change this to goerli or mainnet depending on your use case
const FLASHBOTS_RELAY = "https://relay.flashbots.net";

// Utilities
function toHex(num) {
    return `0x${num.toString(16)}`;
}

router.post("/", async (req, res) => {
    const { signedTxs, targetBlockNumber } = req.body;

    if (!Array.isArray(signedTxs) || signedTxs.length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'signedTxs' array." });
    }

    try {
        // Fallback to next block if no blockNumber provided
        const rpcRes = await fetch(process.env.RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_blockNumber",
                params: [],
            }),
        });

        const rpcJson = await rpcRes.json();
        const currentBlock = parseInt(rpcJson.result, 16);
        const targetBlock = targetBlockNumber || currentBlock + 1;

        // Send bundle to Flashbots
        const response = await fetch(FLASHBOTS_RELAY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_sendBundle",
                params: [
                    {
                        txs: signedTxs, // array of raw signed txs
                        blockNumber: toHex(targetBlock),
                    },
                ],
            }),
        });

        const json = await response.json();

        if (json.error) {
            console.error("Flashbots error:", json.error);
            return res.status(502).json({ error: json.error.message || "Flashbots error" });
        }

        res.json({
            status: "Bundle submitted",
            targetBlock,
            bundleHash: json.result, // Flashbots returns hash
        });
    } catch (err) {
        console.error("Failed to submit bundle:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

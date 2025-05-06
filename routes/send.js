const express = require("express");
const axios = require("axios");

const router = express.Router();

const FLASHBOTS_URL = "https://rpc.flashbots.net";

router.post("/", async (req, res) => {
    try {
        const { signedTx } = req.body;

        if (!signedTx) {
            return res.status(400).json({ error: "Missing signedTx" });
        }

        const flashbotsPayload = {
            jsonrpc: "2.0",
            method: "eth_sendRawTransaction",
            params: [signedTx],
            id: 1,
        };

        const response = await axios.post(FLASHBOTS_URL, flashbotsPayload, {
            headers: { "Content-Type": "application/json" },
        });

        const txHash = response.data.result;

        res.json({
            message: "Transaction relayed via Flashbots",
            hash: txHash,
        });
    } catch (err) {
        console.error("Flashbots send error:", err.message);
        res.status(500).json({ error: "Flashbots relay failed", details: err.message });
    }
});

module.exports = router;

// routes/wait.js
const express = require("express");
const { JsonRpcProvider } = require("ethers");

const router = express.Router();
const provider = new JsonRpcProvider(process.env.RPC_URL);

router.get("/:hash", async (req, res) => {
    const { hash } = req.params;

    try {
        console.log(`⏳ Waiting for tx ${hash}...`);
        const receipt = await provider.waitForTransaction(hash, 1, 60_000); // 1 confirmation, 60s timeout

        if (!receipt) return res.status(408).json({ error: "Timed out" });

        res.json({
            status: receipt.status === 1 ? "Success" : "Failed",
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed.toString(),
        });
    } catch (err) {
        console.error("wait error:", err);
        res.status(500).json({ error: "Failed to wait for tx" });
    }
});

module.exports = router;

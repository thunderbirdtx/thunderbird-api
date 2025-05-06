const express = require("express");
const router = express.Router();
const { JsonRpcProvider } = require("ethers");

// Create an RPC provider (from Alchemy, Infura, etc.)
const provider = new JsonRpcProvider(process.env.RPC_URL);

router.post("/", async (req, res) => {
    const { signedTx } = req.body;

    if (!signedTx || typeof signedTx !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'signedTx'" });
    }

    try {
        // Attempt to broadcast the new signed tx
        const txResponse = await provider.sendTransaction(signedTx);
        console.log("📡 Sent replacement tx:", txResponse.hash);

        res.json({
            status: "Replacement broadcasted",
            hash: txResponse.hash,
        });
    } catch (err) {
        console.error("❌ Failed to send replacement tx:", err.reason || err.message);
        res.status(500).json({ error: "Failed to send replacement transaction" });
    }
});

module.exports = router;

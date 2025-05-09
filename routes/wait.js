const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { v4: uuidv4 } = require("uuid");
const redis = require("../lib/redis");

const RPC_URL = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);

router.post("/", async (req, res) => {
    const { signedTx, maxGasGwei } = req.body;

    if (!signedTx || !maxGasGwei) {
        return res.status(400).json({ error: "Missing signedTx or maxGasGwei" });
    }

    const jobId = uuidv4();
    const job = {
        signedTx,
        maxGasGwei,
        createdAt: Date.now(),
    };

    await redis.set(`waitjob:${jobId}`, JSON.stringify(job));

    res.json({ status: "waiting", jobId });
});


// GET /api/wait/:jobId
router.get("/:jobId", async (req, res) => {
    const jobId = req.params.jobId;
    const key = `waitjob:${jobId}`;

    try {
        const job = await redis.get(key);

        if (!job) {
            return res.status(404).json({ status: "not_found", jobId });
        }

        res.json({
            status: "waiting",
            jobId,
            job: JSON.parse(job),
        });
    } catch (err) {
        console.error("Error checking wait job status:", err.message);
        res.status(500).json({ error: "internal_error" });
    }
});


module.exports = router;

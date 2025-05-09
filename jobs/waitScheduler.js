const { ethers } = require("ethers");
const redis = require("../lib/redis");

const RPC_URL = process.env.ALCHEMY_RPC_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);

const pollWaitJobs = async () => {
    try {
        const keys = await redis.keys("waitjob:*");
        if (!keys.length) return;

        const block = await provider.getBlock("latest");
        const baseFee = Number(block.baseFeePerGas) / 1e9;

        for (const key of keys) {
            const job = JSON.parse(await redis.get(key));
            if (baseFee <= job.maxGasGwei) {
                try {
                    const txHash = await provider.broadcastTransaction(job.signedTx);
                    console.log(`✅ Sent ${key}: ${txHash}`);
                    await redis.del(key);
                } catch (err) {
                    console.error(`❌ Failed to send ${key}:`, err.message);
                }
            }
        }
    } catch (err) {
        console.error("Scheduler error:", err.message);
    }
};

// Kick off interval
console.log("⏳ Starting wait job scheduler...");
setInterval(pollWaitJobs, 60_000);

const express = require("express");
const { JsonRpcProvider } = require("ethers");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const provider = new JsonRpcProvider(process.env.RPC_URL); // Set this in .env
const prisma = new PrismaClient();

router.get("/:txHash", async (req, res) => {
    const { txHash } = req.params;

    try {
        console.log("⏳ Fetching transaction for:", txHash);

        const receipt = await provider.getTransactionReceipt(txHash);
        const tx = await provider.getTransaction(txHash);

        if (!receipt || !tx) {
            console.log("❌ Transaction not found");
            return res.status(404).json({ error: "Transaction not found" });
        }

        const gasUsed = receipt.gasUsed?.toString() || "0";
        const effectiveGasPrice = receipt.effectiveGasPrice?.toString() || "0";
        const totalEthUsed = (BigInt(gasUsed) * BigInt(effectiveGasPrice)).toString();

        console.log("✅ Found tx, saving to DB...");

        await prisma.transaction.upsert({
            where: { hash: txHash },
            update: {},
            create: {
                hash: txHash,
                from: tx.from,
                to: tx.to,
                value: tx.value.toString(),
                gasUsed,
                effectiveGasPrice,
                totalEthUsed,
                blockNumber: receipt.blockNumber,
                status: receipt.status === 1 ? "Success" : "Failed",
            },
        });

        return res.json({
            status: receipt.status === 1 ? "Success" : "Failed",
            blockNumber: receipt.blockNumber,
            gasUsed,
            effectiveGasPrice,
            totalEthUsed,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            saved: true,
        });
    } catch (err) {
        console.error("🔥 Error in /track:", err); // FULL error object
        res.status(500).json({ error: "Failed to fetch or store transaction" });
    }
});


module.exports = router;

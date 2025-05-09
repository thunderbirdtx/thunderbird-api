const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:wallet", async (req, res) => {
    const { wallet } = req.params;

    try {
        const txs = await prisma.transaction.findMany({
            where: {
                from: wallet, // direct match
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const totalEthUsed = txs.reduce((acc, tx) => {
            return acc + BigInt(tx.totalEthUsed || "0");
        }, BigInt(0));

        res.json({
            wallet,
            txCount: txs.length,
            totalEthUsed: totalEthUsed.toString(),
            totalEthUsedReadable: Number(totalEthUsed) / 1e18,
            transactions: txs.map(tx => ({
                ...tx,
                gasUsed: tx.gasUsed?.toString(),
                effectiveGasPrice: tx.effectiveGasPrice?.toString(),
                totalEthUsed: tx.totalEthUsed?.toString(),
                value: tx.value?.toString(),
            })),
        });

    } catch (err) {
        console.error("Error in /stats:", err);
        res.status(500).json({ error: "Failed to fetch wallet stats" });
    }
});

module.exports = router;

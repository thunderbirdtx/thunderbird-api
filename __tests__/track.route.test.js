jest.mock("ethers", () => {
    const original = jest.requireActual("ethers");
    return {
        ...original,
        JsonRpcProvider: jest.fn().mockImplementation(() => ({
            getTransaction: jest.fn().mockResolvedValue({
                from: "0x123",
                to: "0x456",
                value: { toString: () => "1000000000000000000" },
            }),
            getTransactionReceipt: jest.fn().mockResolvedValue({
                gasUsed: { toString: () => "21000" },
                effectiveGasPrice: { toString: () => "1000000000" },
                blockNumber: 123456,
                status: 1,
            }),
        })),
    };
});

const request = require("supertest");
const app = require("../server");

describe("GET /api/track/:txHash", () => {
    it("should return 400 for invalid tx hash", async () => {
        const res = await request(app).get("/api/track/bad-input");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });

    it("should return a valid transaction object", async () => {
        const txHash = "0xf5f7d4ea675f19dc18a557369d9675b482d9d4a5842ad8e1ce558dcfc7c17ffb";
        const res = await request(app).get(`/api/track/${txHash}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("from", "0x123");
        expect(res.body).toHaveProperty("to", "0x456");
        expect(res.body).toHaveProperty("gasUsed", "21000");
    });
});

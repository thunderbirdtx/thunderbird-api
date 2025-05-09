const request = require("supertest");
const app = require("../server");

describe("GET /api/track/:txHash", () => {
    it("should return 400 for invalid tx hash", async () => {
        const res = await request(app).get("/api/track/bad-input");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });


    it("should return a valid transaction object", async () => {
        //note to contributors this should change regularly
      const txHash = "0xf5f7d4ea675f19dc18a557369d9675b482d9d4a5842ad8e1ce558dcfc7c17ffb";
      const res = await request(app).get(`/api/track/${txHash}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("from");
      expect(res.body).toHaveProperty("to");
      expect(res.body).toHaveProperty("gasUsed");
    });
});

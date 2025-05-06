require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/estimate-gas", require("./routes/estimate"));
app.use("/api/send", require("./routes/send"));
//app.use("/api/wait-and-send", require("./routes/wait"));
//app.use("/api/simulate", require("./routes/simulate"));
//app.use("/api/bundle", require("./routes/bundle"));
//app.use("/api/replace", require("./routes/replace"));
app.use("/api/track", require("./routes/track"));
app.use("/api/stats", require("./routes/stats"));
//app.use("/api/alerts", require("./routes/alerts"));
//app.use("/api/health", require("./routes/health"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Thunderbird API running on port ${PORT}`));

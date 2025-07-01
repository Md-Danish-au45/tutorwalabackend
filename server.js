// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./src/routes/contactRoutes");
const consultationRoutes = require("./src/routes/consultationRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api/consultation", consultationRoutes);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

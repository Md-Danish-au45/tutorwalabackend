// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./src/routes/contactRoutes");
const consultationRoutes = require("./src/routes/consultationRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const articleRoutes = require("./src/routes/articles");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// / MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://danish:1234567890@cluster0.hde1hvc.mongodb.net/students",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use("/uploads", express.static("uploads"));

app.use("/api", contactRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
//env config
dotenv.config();

//router import

//mongodb connection
connectDB();

//rest objecct
const app = express();

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

app.get("/api", (req, res) => {
  res.send("hii");
});

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server Running on  port no ${PORT}`.bgCyan.white);
});

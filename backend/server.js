const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const canvasRoutes = require("./routes/canvasRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Api is running"));
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/canvas", canvasRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server started at ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const canvasRoutes = require("./routes/canvasRoutes");
const __dirname1 = path.resolve();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
// -----Deployment------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (_, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (_, res) => res.send("Api is running"));
}

// -----Deployment------
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/canvas", canvasRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at ${PORT}`));

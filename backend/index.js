import express from "express";
import mongoDB from "./db.js";
import createUserRouter from "./routes/CreateUser.js";
import displayDataRouter from "./routes/DisplayData.js";
import ordersRouter from "./routes/Orders.js";

const app = express();
const port = 5000;

// Connect DB
mongoDB();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// JSON parsing
app.use(express.json());

// API routes
app.use("/api", createUserRouter);
app.use("/api", displayDataRouter);
app.use("/api", ordersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

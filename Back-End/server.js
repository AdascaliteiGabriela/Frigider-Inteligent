import express from "express";

const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("Hello from Backend 👋");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// Health check obligatorio para Railway
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Puerto de Railway (NO pongas fallback)
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

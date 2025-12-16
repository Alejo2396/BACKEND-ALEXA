require('dotenv').config(); 
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutando en puerto ${PORT}`);
});

require('dotenv').config(); 
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(4000, () => {
    console.log('Servidor ejecutando en puerto 4000');
});

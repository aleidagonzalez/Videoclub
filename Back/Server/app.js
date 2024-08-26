const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Conectar a MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Importar rutas
const userRoutes = require('./Routes/usersRoutes');

// Usar las rutas
app.use('/auth', userRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Hello my friends');
});

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

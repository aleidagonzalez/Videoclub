const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://aleida1983:KlstI4vG4rN5ZMQK@cluster0.iy5ae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Definir el esquema y modelo de Mongoose
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

// Ruta para manejar la solicitud POST del formulario
app.post('/api/saveData', (req, res) => {
    const newUser = new User(req.body);

    newUser.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Data saved successfully');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

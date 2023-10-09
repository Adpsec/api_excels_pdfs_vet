const express = require('express');
const bodyParser = require('body-parser');
const productosRouter = require('./routes/productos');
const ventasRouter = require('./routes/ventas');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
app.use(bodyParser.json());

// Configuración de Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'veterinaria-4cfc1.appspot.com'
});

app.use('/productos', productosRouter);
app.use('/ventas', ventasRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const productRoutes = require('./routes/products');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

/* =========================
   STATIC FILES
========================= */

app.use(express.static(
    path.join(__dirname, 'public')
));

/* =========================
   ROUTES
========================= */

app.use('/api/products', productRoutes);

app.use('/api/contact', contactRoutes);

app.use('/api/auth', authRoutes);

/* =========================
   HTML ROUTES
========================= */

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );

});

app.get('/products', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'products.html')
    );

});

app.get('/about', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'about.html')
    );

});

app.get('/contact', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'contact.html')
    );

});

app.get('/admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'admin.html')
    );

});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log('MongoDB Connected');

})

.catch((error) => {

    console.log(error);

});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
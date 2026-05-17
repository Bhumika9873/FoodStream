const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'https://food-stream.vercel.app/',
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;

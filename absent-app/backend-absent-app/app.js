require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const absentRoutes = require('./routes/absentRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/absent', absentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

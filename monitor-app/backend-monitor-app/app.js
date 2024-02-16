require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');
const absentRoutes = require('./routes/absentRoutes');

app.use(cors());
app.use(express.json());

app.use('/employee', employeeRoutes);
app.use('/absent', absentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
const personRoutes = require('./routes/person');
const familyRoutes = require('./routes/family');

app.use('/api/persons', personRoutes);
app.use('/api/families', familyRoutes);

module.exports = app;
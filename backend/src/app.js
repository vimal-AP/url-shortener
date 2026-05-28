require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { redirectUrl } = require('./controllers/url.controller');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/urls', require('./routes/url.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));

app.get('/:code', redirectUrl);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
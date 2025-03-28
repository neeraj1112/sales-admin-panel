const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./config/database');
const wholesalerRoutes = require('./routes/wholesaler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', wholesalerRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

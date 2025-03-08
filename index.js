const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/v1/authRoute');
const { connectToDatabase } = require('./db/mongodb');
// const appRoutes = require('./Routes/v1/appRoutes');

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api', appRoutes);

// Sync databas
// db.sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch(error => {
//     console.error('Error syncing database:', error);
//   });

const PORT = process.env.PORT || 3005;

(async () => {
  await connectToDatabase(); // Connect to MongoDB first
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

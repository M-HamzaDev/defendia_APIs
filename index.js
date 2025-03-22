const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/v1/authRoute');
const appRoutes = require('./routes/v1/appRoute');

const { connectToDatabase } = require('./db/mongodb');
app.use("/uploads", express.static("uploads"));

// const appRoutes = require('./Routes/v1/appRoutes');
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', appRoutes);

// Sync databas
// db.sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch(error => {
//     console.error('Error syncing database:', error);
//   });


// Add root route for verification
app.get('/', (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// ... rest of your routes and middleware

const PORT = process.env.PORT || 3005;

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      // Startup message with important information
      console.log(`
      =============================================
       Server successfully started!
       Port: ${PORT}
       Environment: ${process.env.NODE_ENV || 'development'}
       Timestamp: ${new Date().toISOString()}
      =============================================
      `);
    });
  } catch (error) {
    console.error("🔥 Server startup failed:", error);
    process.exit(1);
  }
})();
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const indexRoutes = require('./routes/index');
const featureRoutes = require('./routes/features');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine and point to src/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Allow Express to read HTML form submissions and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (like CSS) from src/public
app.use(express.static(path.join(__dirname, 'public')));

// Main application routes
app.use('/', indexRoutes);
app.use('/features', featureRoutes);

// 404 handler: runs when no route matches the requested URL
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'That page does not exist in this application.',
    errorDetail: null
  });
});

// Global error handler: catches SQL and runtime errors so the app never crashes
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).render('error', {
    title: 'Something Went Wrong',
    message: err.userMessage || 'A database or server error occurred while handling your request.',
    errorDetail: err.sqlMessage || err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
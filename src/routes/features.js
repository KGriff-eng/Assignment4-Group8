const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Placeholder routes for Options 1–7 so navigation links work right away.
// Piper, Mel, and Rachel can replace each placeholder with their real form/query/validation logic.
const optionNumbers = [1, 2, 3, 4, 5, 6, 7];

optionNumbers.forEach((num) => {
  router.get(`/option${num}`, async (req, res, next) => {
    try {
      res.render('error', {
        title: `Option ${num} (In Progress)`,
        message: `Option ${num} route is connected and ready for feature implementation.`,
        errorDetail: null
      });
    } catch (err) {
      // Forwarding errors to next(err) triggers the safe error handler in app.js
      next(err);
    }
  });
});

module.exports = router;
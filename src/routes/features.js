const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Placeholder routes for Options 1–7 so navigation links work right away.
// Piper, Mel, and Rachel can replace each placeholder with their real form/query/validation logic.
const optionNumbers = [1, 2, 3, 4]; //removed 5, 6, 7 - R

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

//Rachel - added 

// Option 5 - Supplier Lookup
router.get('/option5', async (req, res, next) => {
    try {
        const partName = typeof req.query.partName === 'string'
            ? req.query.partName.trim() : '';

        const partNumber = typeof req.query.partNumber === 'string'
            ? req.query.partNumber.trim() : '';

        // Retrieve available parts
        const [parts] = await pool.query(
            'SELECT PartNumber, Name FROM part ORDER BY Name, PartNumber'
        );

        let suppliers = [];
        let selectedParts = [];

        // Validate user input
        if (partNumber.length > 50 || partName.length > 100) {
            return res.status(400).render('error', {
                title: 'Invalid Part Selection',
                message: 'Please select a valid automotive part.',
                errorDetail: null
            });
        }

        if (partNumber !== '') {

            let condition;
            let values;

            // Search all matching part numbers
            if (partNumber === 'all') {
                if (partName === '') {
                    condition = '1 = 1';
                    values = [];
                } else {
                    condition = 'p.Name = ?';
                    values = [partName];
                }
            } else {
                condition = 'p.PartNumber = ?';
                values = [partNumber];
            }

            // Retrieve matching suppliers
            const [results] = await pool.execute(`
                SELECT p.PartNumber, p.Name, p.Manufacturer,
                       p.UnitPrice, p.QuantityInStock,
                       s.CompanyName, s.ContactInformation
                FROM part p
                JOIN partsupplier ps
                    ON p.PartNumber = ps.PartNumber
                JOIN supplier s
                    ON ps.CompanyName = s.CompanyName
                WHERE ${condition}
                ORDER BY p.UnitPrice, p.PartNumber, s.CompanyName
            `, values);

            suppliers = results;

            // Retrieve original part records for validation
            const [partDetails] = await pool.execute(`
                SELECT p.PartNumber, p.Name, p.Manufacturer,
                       p.UnitPrice, p.QuantityInStock
                FROM part p
                WHERE ${condition}
                ORDER BY p.PartNumber
            `, values);

            selectedParts = partDetails;
        }

        res.render('option5', {
            title: 'Supplier Lookup',
            parts,
            partName,
            partNumber,
            selectedParts,
            suppliers
        });

    } catch (err) {
        next(err);
    }
});


// Option 6 - Vehicle Service History
router.get('/option6', async (req, res, next) => {
    try {
        const vin = typeof req.query.vin === 'string'
            ? req.query.vin.trim() : '';

        // Retrieve vehicles for the search filters
        const [vehicles] = await pool.query(`
            SELECT VIN, Make, Model, Year
            FROM vehicle
            ORDER BY Make, Model, Year, VIN
        `);

        let selectedVehicle = null;
        let appointments = [];
        let verificationRecords = [];
        let totalCost = 0;

        // Validate the VIN
        if (vin.length > 17) {
            return res.status(400).render('error', {
                title: 'Invalid VIN',
                message: 'Please select a valid vehicle.',
                errorDetail: null
            });
        }

        if (vin !== '') {

            // Retrieve the selected vehicle
            const [vehicleDetails] = await pool.execute(`
                SELECT VIN, Make, Model, Year, Mileage,
                       DATE_FORMAT(FirstServiceDate, '%Y-%m-%d')
                           AS FirstServiceDate
                FROM vehicle
                WHERE VIN = ?
            `, [vin]);

            if (vehicleDetails.length > 0) {
                selectedVehicle = vehicleDetails[0];
            }

            // Retrieve appointment and service history
            const [results] = await pool.execute(`
                SELECT
                    a.AppointmentID,
                    DATE_FORMAT(a.AppointmentDate, '%Y-%m-%d')
                        AS AppointmentDate,
                    a.Time,
                    a.Status,
                    a.TotalCost,
                    GROUP_CONCAT(
                        aps.ServiceName
                        ORDER BY aps.ServiceName
                        SEPARATOR ', '
                    ) AS Services
                FROM appointment a
                LEFT JOIN appointmentservice aps
                    ON a.AppointmentID = aps.AppointmentID
                WHERE a.VIN = ?
                GROUP BY a.AppointmentID, a.AppointmentDate,
                         a.Time, a.Status, a.TotalCost
                ORDER BY a.AppointmentDate DESC, a.Time DESC
            `, [vin]);

            appointments = results;

            // Calculate total recorded appointment costs
            appointments.forEach(appointment => {
                totalCost += Number(appointment.TotalCost || 0);
            });

            // Retrieve original records for verification
            const [originalRecords] = await pool.execute(`
                SELECT AppointmentID, VIN,
                       DATE_FORMAT(AppointmentDate, '%Y-%m-%d')
                           AS AppointmentDate,
                       Time, Status, TotalCost
                FROM appointment
                WHERE VIN = ?
                ORDER BY AppointmentDate DESC, Time DESC
            `, [vin]);

            verificationRecords = originalRecords;
        }

        res.render('option6', {
            title: 'Vehicle Service History',
            vehicles,
            vin,
            selectedVehicle,
            appointments,
            totalCost,
            verificationRecords
        });

    } catch (err) {
        next(err);
    }
});


// Option 7 - Customer Information Lookup
router.get('/option7', async (req, res, next) => {
    try {
        const search = typeof req.query.search === 'string'
            ? req.query.search.trim() : '';

        let customers = [];
        let verificationRecords = [];

        // Validate search input
        if (search !== '' &&
            (search.length < 2 || search.length > 100)) {

            return res.status(400).render('error', {
                title: 'Invalid Customer Search',
                message: 'Enter between 2 and 100 characters.',
                errorDetail: null
            });
        }

        if (search !== '') {

            const searchValue = '%' + search + '%';

            // Find matching customers
            const [results] = await pool.execute(`
                SELECT CustomerEmail, FirstName, LastName,
                       PhoneNumber, StreetAddress, City,
                       Province, PostalCode
                FROM customer
                WHERE FirstName LIKE ?
                   OR LastName LIKE ?
                   OR CONCAT(FirstName, ' ', LastName) LIKE ?
                   OR CustomerEmail LIKE ?
                ORDER BY LastName, FirstName, CustomerEmail
            `, [
                searchValue,
                searchValue,
                searchValue,
                searchValue
            ]);

            customers = results;

            // Retrieve registered vehicles for each customer
            for (const customer of customers) {

                const [vehicles] = await pool.execute(`
                    SELECT VIN, Make, Model, Year, Mileage,
                           DATE_FORMAT(FirstServiceDate, '%Y-%m-%d')
                               AS FirstServiceDate
                    FROM vehicle
                    WHERE CustomerEmail = ?
                    ORDER BY Year DESC, Make, Model
                `, [customer.CustomerEmail]);

                customer.vehicles = vehicles;
            }

            // Independently verify customer and vehicle records
            const [originalRecords] = await pool.execute(`
                SELECT c.CustomerEmail,
                       c.FirstName,
                       c.LastName,
                       v.VIN,
                       v.Make,
                       v.Model,
                       v.Year
                FROM customer c
                LEFT JOIN vehicle v
                    ON c.CustomerEmail = v.CustomerEmail
                WHERE c.FirstName LIKE ?
                   OR c.LastName LIKE ?
                   OR CONCAT(c.FirstName, ' ', c.LastName) LIKE ?
                   OR c.CustomerEmail LIKE ?
                ORDER BY c.LastName, c.FirstName, v.VIN
            `, [
                searchValue,
                searchValue,
                searchValue,
                searchValue
            ]);

            verificationRecords = originalRecords;
        }

        res.render('option7', {
            title: 'Customer Registry',
            search,
            customers,
            verificationRecords
        });

    } catch (err) {
        next(err);
    }
});


module.exports = router;
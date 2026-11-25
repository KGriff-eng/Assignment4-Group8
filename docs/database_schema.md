# Automotive Shop Management System
## Database Schema — Assignment 4, Group 8

Database name: assignment3
Database engine: MySQL 8.0
Source: dump/assignment3_dump.sql

Use the exact lowercase table names listed below.

## 1. customer

- CustomerEmail VARCHAR(100) — Primary Key
- FirstName VARCHAR(50) — Required
- LastName VARCHAR(50) — Required
- PhoneNumber VARCHAR(20)
- StreetAddress VARCHAR(100)
- City VARCHAR(50)
- Province VARCHAR(50)
- PostalCode VARCHAR(10)
- PaymentInformation VARCHAR(255)

## 2. vehicle

- VIN VARCHAR(17) — Primary Key
- CustomerEmail VARCHAR(100) — Foreign Key
- Make VARCHAR(50) — Required
- Model VARCHAR(50) — Required
- Year INT — Required
- Mileage INT
- FirstServiceDate DATE

Foreign key:
CustomerEmail references customer(CustomerEmail).
Deleting a customer sets this field to NULL.

## 3. mechanic

- MechanicID INT — Primary Key
- FirstName VARCHAR(50) — Required
- LastName VARCHAR(50) — Required
- HourlyPayRate DECIMAL(10,2) — Required
- ExperienceLevel VARCHAR(50)
- Availability VARCHAR(50)

## 4. mechaniccertification

- MechanicID INT — Primary Key, Foreign Key
- Certification VARCHAR(100) — Primary Key

Foreign key:
MechanicID references mechanic(MechanicID).

## 5. servicetype

- ServiceName VARCHAR(100) — Primary Key
- PartCost DECIMAL(10,2)
- LabourCost DECIMAL(10,2)
- EstimatedCost DECIMAL(10,2)
- HierarchyRequirement VARCHAR(100)

## 6. part

- PartNumber VARCHAR(50) — Primary Key
- Name VARCHAR(100) — Required
- Manufacturer VARCHAR(100)
- QuantityInStock INT — Default 0
- UnitPrice DECIMAL(10,2)

## 7. supplier

- CompanyName VARCHAR(100) — Primary Key
- ContactInformation VARCHAR(255)

## 8. appointment

- AppointmentID INT — Primary Key, Auto Increment
- VIN VARCHAR(17) — Foreign Key, Required
- AppointmentDate DATE — Required
- Time TIME — Required
- Status VARCHAR(50)
- TotalCost DECIMAL(10,2)
- MechanicID INT — Foreign Key, Nullable

Foreign keys:
VIN references vehicle(VIN).
MechanicID references mechanic(MechanicID).

Unique constraint:
VIN + AppointmentDate + Time

## 9. appointmentservice

- AppointmentID INT — Primary Key, Foreign Key
- ServiceName VARCHAR(100) — Primary Key, Foreign Key

Foreign keys:
AppointmentID references appointment(AppointmentID).
ServiceName references servicetype(ServiceName).

## 10. servicepartrequirement

- ServiceName VARCHAR(100) — Primary Key, Foreign Key
- PartNumber VARCHAR(50) — Primary Key, Foreign Key
- QuantityRequired INT — Default 1

Foreign keys:
ServiceName references servicetype(ServiceName).
PartNumber references part(PartNumber).

## 11. partsupplier

- PartNumber VARCHAR(50) — Primary Key, Foreign Key
- CompanyName VARCHAR(100) — Primary Key, Foreign Key

Foreign keys:
PartNumber references part(PartNumber).
CompanyName references supplier(CompanyName).

## 12. vehicleownerhistory

- VIN VARCHAR(17) — Primary Key, Foreign Key
- CustomerEmail VARCHAR(100) — Primary Key, Foreign Key
- StartDate DATE — Primary Key
- EndDate DATE

Foreign keys:
VIN references vehicle(VIN).
CustomerEmail references customer(CustomerEmail).

## Development Rules

- Use the shared connection in src/config/db.js.
- Use parameterized SQL queries for user input.
- Validate all form inputs on the server.
- Handle SQL errors without crashing the application.
- Do not modify the database schema without team approval.
- Never commit database passwords.
- Each developer uses their own local MySQL database.
- Do not display sensitive payment information.

## Known Schema Differences

- PhoneNumber is not UNIQUE in the current SQL dump,
  although it was documented as unique in the report.
- AppointmentID is the sole primary key of appointment.
- VIN, AppointmentDate and Time form a unique constraint.
- QuantityRequired exists in servicepartrequirement.
- The two Assignment 3 views are not in the current dump.

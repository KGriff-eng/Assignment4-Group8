const { pool, testConnection } = require('./db');

async function runTest() {
    try {
        await testConnection();

        const [database] = await pool.query(
            'SELECT DATABASE() AS databaseName'
        );

        console.log('Database:', database[0].databaseName);

        const [tables] = await pool.query('SHOW TABLES');

        console.log('Database tables and views:');
        console.table(tables);

        const [customers] = await pool.query(
            'SELECT COUNT(*) AS totalCustomers FROM customer'
        );

        console.log(
            'Total customers:',
            customers[0].totalCustomers
        );

        console.log('Database test completed successfully!');
    } catch (error) {
        console.error('Database test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

runTest();

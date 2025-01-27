const { Client } = require('pg');

async function setupDatabase() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres', // Change if your PostgreSQL user is different
        password: 'myPassword', // Replace with your PostgreSQL password
    });

    let newClient; // Declare newClient here

    try {
        await client.connect();

        // Check if the user exists
        const userCheck = await client.query(`
            SELECT 1 FROM pg_roles WHERE rolname='armitage';
        `);

        if (userCheck.rowCount === 0) {
            // Create user if it does not exist
            await client.query("CREATE USER armitage WITH PASSWORD 'password';");
            console.log("User 'armitage' created.");
        } else {
            console.log("User 'armitage' already exists.");
        }

        // Check if the database exists
        const dbCheck = await client.query(`
            SELECT 1 FROM pg_database WHERE datname='honeypot_logs';
        `);

        if (dbCheck.rowCount === 0) {
            // Create database if it does not exist
            await client.query('CREATE DATABASE honeypot_logs;');
            console.log("Database 'honeypot_logs' created.");
        } else {
            console.log("Database 'honeypot_logs' already exists.");
        }

        // Grant privileges
        await client.query('GRANT ALL PRIVILEGES ON DATABASE honeypot_logs TO armitage;');

        // Close the initial connection
        await client.end();

        // Create a new client for the new database connection
        newClient = new Client({
            host: 'localhost',
            port: 5432,
            user: 'armitage', // Use the new user
            password: 'password', // Use the password for the new user
            database: 'honeypot_logs' // Connect to the new database
        });

        await newClient.connect();

        // Create sequences if they do not exist
        await newClient.query(`
            CREATE SEQUENCE IF NOT EXISTS honeypots_id_seq;
        `);

        await newClient.query(`
            CREATE SEQUENCE IF NOT EXISTS commands_id_seq;
        `);

        await newClient.query(`
            CREATE SEQUENCE IF NOT EXISTS logins_id_seq;
        `);

        // Create tables if they do not exist
        await newClient.query(`
            CREATE TABLE IF NOT EXISTS honeypots (
                id INTEGER NOT NULL DEFAULT nextval('honeypots_id_seq') PRIMARY KEY,
                ip VARCHAR(45) NOT NULL,
                hostname VARCHAR(255) NOT NULL,
                ssh_port INTEGER NOT NULL,
                ssh_username VARCHAR(100) NOT NULL,
                ssh_password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await newClient.query(`
            CREATE TABLE IF NOT EXISTS commands (
                id INTEGER NOT NULL DEFAULT nextval('commands_id_seq') PRIMARY KEY,
                command TEXT,
                ip_address INET,
                timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                honeypot_server VARCHAR(255)
            );
        `);

        await newClient.query(`
            CREATE TABLE IF NOT EXISTS logins (
                id INTEGER NOT NULL DEFAULT nextval('logins_id_seq') PRIMARY KEY,
                username VARCHAR(255),
                password VARCHAR(255),
                ip_address INET,
                successful_login BOOLEAN,
                timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                honeypot_server VARCHAR(255)
            );
        `);

        console.log('Database setup completed successfully!');
    } catch (err) {
        console.error('Error setting up the database:', err);
    } finally {
        await client.end();
        if (newClient) {
            await newClient.end(); // Ensure the new client is also closed
        }
        // Exit the process
        process.exit(0);
    }
}

setupDatabase();

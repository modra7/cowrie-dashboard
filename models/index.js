// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('honeypot_logs', 'armitage', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});
/*
const Command = sequelize.define('Command', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically increment the ID
    },
    command: {
      type: DataTypes.TEXT, // Use TEXT for command
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.INET, // Use INET for IP address
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE, // Use DATE for timestamp
      allowNull: false,
    },
    honeypot_server: {
      type: DataTypes.STRING(255), // Use STRING with a max length of 255
      allowNull: false,
    },
  }, {
    tableName: 'commands', // Specify the table name if it doesn't match the model name
  });
*/
  const Honeypot = sequelize.define('Honeypot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ip: {
        type: DataTypes.STRING(45), // Supports both IPv4 and IPv6
        allowNull: false,
    },
    hostname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ssh_port: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ssh_username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ssh_password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'honeypots', // Specify the table name
});

// Sync models with the database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error creating database tables:', err);
    });

// Export the models and sequelize instance
module.exports = {
    sequelize,
    Honeypot,
};

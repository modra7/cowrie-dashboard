# Cowrie Dashboard

Welcome to the Cowrie Dashboard project! This dashboard is designed to visualize and manage data collected from the Cowrie honeypot. It provides insights into honeypot activity, including commands executed and login attempts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- PostgreSQL (version 12 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/modra7/cowrie-dashboard.git
   cd cowrie-dashboard
   ```

2. Install the required Node.js dependencies:

   ```bash
   npm install
   ```

## Database Setup

To set up the PostgreSQL database, follow these steps:

1. **Log in as the PostgreSQL User:**

   Open your terminal and log in to the PostgreSQL command line as the `postgres` user:

   ```bash
   sudo -u postgres psql
   ```

2. **Run the Database Setup Script:**

   After logging in, you can run the provided npm script to automate the creation of the user, database, sequences, and tables. Make sure you have the necessary permissions and that the script is configured correctly.

   ```bash
   npm run setup-db
   ```

   This script will:
   - Create the user `armitage` if it does not exist.
   - Create the database `honeypot_logs` if it does not exist.
   - Grant privileges to the `armitage` user on the `honeypot_logs` database.
   - Create the necessary sequences and tables.

## Running the Project

To start the Cowrie Dashboard, run the following command:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

Once the dashboard is running, you can access it through your web browser. The dashboard will display data from the `honeypot_logs` database, allowing you to monitor honeypot activity, view executed commands, and track login attempts.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report a bug, please open an issue or submit a pull request.


---

Thank you for using the Cowrie Dashboard! If you have any questions or need further assistance, feel free to reach out.

---

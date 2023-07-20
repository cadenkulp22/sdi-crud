# SDI17 CRUD App - Inventory Management System

## Project Overview

The Inventory Management System is a web application that allows users to manage their inventory items. Users can register for a new account, create inventory items, and perform various actions based on their assigned role. The application is fully dockerized, making it easy to set up and run.

### Key Features

- **User Registration**: New users can create an account and access the application.

- **Role-Based Access Control**: Users are assigned the "Inventory Manager" role, granting them the ability to view their own created items, all created items, and edit their own items.

- **Data Seeding**: The database does not come pre-seeded with data, allowing users to create their own items.

### Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine

2. Navigate to the root directory of the project

3. Setup the application using Docker:
`docker-compose up --build -d`

4. Access the frontend application at http://localhost:3000 in your web browser

5. Access the backend API at http://localhost:3001

### Testing the Application

To verify the full functionality of the Inventory Management System, it is recommended to create a few items under different user accounts. This will allow you to test user-specific actions, such as viewing their items and editing them.
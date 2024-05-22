# Batch-3 Assignment-2

## Objective
Developed an Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Joi/Zod.

# Running the Application Locally

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (Node Package Manager) or Yarn
- MongoDB

## Step-by-Step Guide

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine using the following command:

```bash
git clone https://github.com/Raiyan109/L3-assignment-2.git
```

### 2. Navigate to the project directory

### 3. Install Dependencies

```bash
npm install
```

### 4. Set up Environment variables

Create a .env file in the root of the project and add the following environment variables:

```bash
PORT=5000
DB_URI=<your-mongodb-connection-string>
```


### 5. Run the application

```bash 
npm run start:dev
```


# Test the Endpoints
Once the server is running, you can test the endpoints using a tool like Postman or cURL. The server should be running at http://localhost:5000.
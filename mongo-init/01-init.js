// Initialize the firm_data database
db = db.getSiblingDB('firm_data');

// Create financial_data collection with data from CSV
db.financial_data.insertMany([
  {
    "_id": "66e5132909e1fe8496521dc2",
    "revenue": 1500000,
    "expenses": 500000,
    "market_cap": 1800000,
    "profit": 1000000
  },
  {
    "_id": "66e5132909e1fe8496521dc3",
    "revenue": 2000000,
    "expenses": 600000,
    "market_cap": 2300000,
    "profit": 1400000
  },
  {
    "_id": "66e5132909e1fe8496521dc4",
    "revenue": 3000000,
    "expenses": 900000,
    "market_cap": 3500000,
    "profit": 2100000
  },
  {
    "_id": "66e5132909e1fe8496521dc5",
    "revenue": 4000000,
    "expenses": 1200000,
    "market_cap": 4700000,
    "profit": 2800000
  },
  {
    "_id": "66e5132909e1fe8496521dc6",
    "revenue": 2500000,
    "expenses": 750000,
    "market_cap": 2900000,
    "profit": 1750000
  },
  {
    "_id": "66e5132909e1fe8496521dc7",
    "revenue": 2700000,
    "expenses": 850000,
    "market_cap": 3100000,
    "profit": 1850000
  },
  {
    "_id": "66e5132909e1fe8496521dc8",
    "revenue": 3400000,
    "expenses": 1150000,
    "market_cap": 4000000,
    "profit": 2250000
  }
]);

// Create firm_prediction collection with data from CSV
db.firm_prediction.insertMany([
  {
    "_id": "672a3eb6804e38a9b9871a02",
    "randspend": 165349.3,
    "admincost": 136897.9,
    "marketspend": 471784.2,
    "state": "New York",
    "Profit": 192261.93
  },
  {
    "_id": "672a3eb6804e38a9b9871a03",
    "randspend": 162597.8,
    "admincost": 151377.69,
    "marketspend": 443898.63,
    "state": "California",
    "Profit": 191792.16
  },
  {
    "_id": "672a3eb6804e38a9b9871a04",
    "randspend": 153441.61,
    "admincost": 101145.65,
    "marketspend": 407934.64,
    "state": "Florida",
    "Profit": 191050.49
  },
  {
    "_id": "672a3eb6804e38a9b9871a05",
    "randspend": 144372.51,
    "admincost": 118671.95,
    "marketspend": 383199.72,
    "state": "New York",
    "Profit": 182902.09
  },
  {
    "_id": "672a3eb6804e38a9b9871a06",
    "randspend": 142107.44,
    "admincost": 91391.87,
    "marketspend": 366168.52,
    "state": "Florida",
    "Profit": 166188.04
  }
]);

// Create company_statuses collection with data from CSV
db.company_statuses.insertMany([
  {
    "_id": "6719b00ab0fa892d69aad7e8",
    "company_name": "C_1",
    "status_label": "alive",
    "year": 1999,
    "X1": 511.267,
    "X2": 833.107,
    "X3": 18.373,
    "X4": 89.031,
    "X5": 336.018
  },
  {
    "_id": "6719b00ab0fa892d69aad7e9",
    "company_name": "C_1", 
    "status_label": "alive",
    "year": 2000,
    "X1": 485.856,
    "X2": 713.811,
    "X3": 18.577,
    "X4": 64.367,
    "X5": 320.59
  },
  {
    "_id": "6719b00ab0fa892d69aad81a",
    "company_name": "C_6",
    "status_label": "failed",
    "year": 1999,
    "X1": 4424,
    "X2": 15482,
    "X3": 1092,
    "X4": 2248,
    "X5": 708
  }
]);

// Create login_users collection with data from CSV
db.login_users.insertMany([
  {
    "_id": "672ba25a45564d47b8e9c40a",
    "fname": "Aayush",
    "lname": "Shah",
    "email": "aayushshah342@gmail.com",
    "password": "11111",
    "__v": 0
  },
  {
    "_id": "672bae4345564d47b8e9c435",
    "fname": "Jane",
    "lname": "Doe",
    "email": "jane.doe@profitpulse.com",
    "password": "12345678",
    "__v": 0
  },
  {
    "_id": "672bbb2245564d47b8e9c440",
    "fname": "John",
    "lname": "Smith",
    "email": "john.smith@profitpulse.com",
    "password": "11111",
    "__v": 0
  },
  {
    "_id": "672bbb4645564d47b8e9c443",
    "fname": "Admin",
    "lname": "User",
    "email": "admin@profitpulse.com",
    "password": "admin123",
    "__v": 0
  }
]);

// Create feedback collection for storing user feedback
db.feedback.createIndex({ "timestamp": 1 });
db.feedback.insertMany([
  {
    category: "feature",
    feedback: "Love the new prediction dashboard! Very intuitive.",
    email: "user1@example.com",
    sentiment: "positive",
    timestamp: new Date()
  },
  {
    category: "bug",
    feedback: "The profit prediction seems to be off by a significant margin.",
    email: "user2@example.com", 
    sentiment: "critical",
    timestamp: new Date()
  }
]);

print("Database initialization completed!");
print("Collections created:");
print("- financial_data: " + db.financial_data.countDocuments());
print("- firm_prediction: " + db.firm_prediction.countDocuments());
print("- company_statuses: " + db.company_statuses.countDocuments());
print("- login_users: " + db.login_users.countDocuments());
print("- feedback: " + db.feedback.countDocuments());

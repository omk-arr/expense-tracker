# Expense Tracker Backend

A RESTful API backend for an expense tracking application built with Node.js, Express, and PostgreSQL using Supabase.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Expense Management**: CRUD operations for expenses with pagination
- **Category System**: Default categories + custom user categories
- **Statistics**: Expense analytics and category breakdowns
- **Data Validation**: Input validation and error handling
- **Security**: Password hashing, JWT tokens, CORS protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: helmet, cors

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free)

### 2. Create Supabase Database

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy your connection string

### 3. Clone and Install

```bash
# Create project directory
mkdir expense-tracker-backend
cd expense-tracker-backend

# Initialize package.json (copy from artifact above)
# Install dependencies
npm install
```

### 4. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your Supabase credentials
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 5. Initialize Database

```bash
# Create tables and seed default categories
npm run init-db
```

### 6. Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get user expenses (with pagination, filters)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create custom category
- `PUT /api/categories/:id` - Update custom category
- `DELETE /api/categories/:id` - Delete custom category

### Health Check
- `GET /api/health` - Server health status

## API Usage Examples

### Register User
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Expense
```javascript
POST /api/expenses
Headers: { "Authorization": "Bearer <jwt_token>" }
{
  "amount": 25.50,
  "description": "Lunch at restaurant",
  "categoryId": 1,
  "date": "2024-01-15"
}
```

### Get Expenses with Filters
```javascript
GET /api/expenses?page=1&limit=20&category=1&startDate=2024-01-01&endDate=2024-01-31
Headers: { "Authorization": "Bearer <jwt_token>" }
```

## Database Schema

### Tables
- **users**: User accounts and authentication
- **categories**: Expense categories (default + custom)
- **expenses**: User expense records

### Key Features
- Foreign key relationships with CASCADE delete
- Indexes for performance optimization
- Default categories seeded automatically
- Decimal precision for monetary amounts

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet middleware

## Error Handling

- Consistent error response format
- Proper HTTP status codes
- Development vs production error messages
- Database error handling

## Deployment

### Vercel (Backend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Environment Variables for Production
```
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

## Development

```bash
# Install dev dependencies
npm install

# Run in development mode
npm run dev

# Initialize/reset database
npm run init-db
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

MIT License
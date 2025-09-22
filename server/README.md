# MediaLog Server

This is the backend server for the MediaLog application, built with Express.js and Prisma.

## Features

- User authentication (register, login, logout)
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB database with Prisma ORM
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/medialog"

# JWT Configuration
# Generate a strong random secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="your-generated-secret-here"# Server Configuration
PORT=5000
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current user (requires authentication)

### Health Check

- `GET /api/health` - Check if the API is running

## Project Structure

```
server/
├── controllers/
│   └── auth.controller.js    # Authentication controllers
├── middleware/
│   └── verifyToken.js        # JWT verification middleware
├── utils/
│   ├── password.js           # Password utilities
│   └── jwt.js               # JWT utilities
├── prisma/
│   └── schema.prisma        # Database schema
├── tests/
│   └── prisma/
│       └── schema.test.js   # Database tests
├── app.js                   # Main server file
└── server.js                # Auth routes
```

## Testing

Run the Prisma integration test:

```bash
cd server && node tests/prisma/schema.test.js
```

## Dependencies

- **express**: Web framework
- **prisma**: Database ORM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

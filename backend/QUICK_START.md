# Quick Start Guide

This guide will help you get the e-commerce backend up and running quickly.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- A code editor (VS Code recommended)

## Setup Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

The `.env` file is already configured with your MongoDB connection. If you need to change it:

```env
MONGO_URI=mongodb+srv://eslamabdaltif:oneone2@cluster0.oqq08ws.mongodb.net/?appName=Cluster0
JWT_SECRET=ecommerce_super_secret_key_2024_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Seed Sample Data (Optional but Recommended)

This will create sample users and products for testing:

```bash
npm run seed
```

This creates:
- **Admin User**: admin@example.com / admin123
- **Regular User**: john@example.com / password123
- **10 Sample Products** across different categories

### 4. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at: `http://localhost:5000`

### 5. Test the API

Visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Testing Endpoints

### 1. Register a User

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login

**POST** `http://localhost:5000/api/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Copy the `token` from the response.

### 3. Get Products

**GET** `http://localhost:5000/api/products`

No authentication needed for viewing products.

### 4. Add to Cart (Requires Authentication)

**POST** `http://localhost:5000/api/cart/items`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Body:
```json
{
  "productId": "PRODUCT_ID_FROM_GET_PRODUCTS",
  "quantity": 1
}
```

## API Testing Tools

Use any of these tools to test the API:

1. **Postman** (Recommended)
   - Download: https://www.postman.com/downloads/
   - Import base URL: `http://localhost:5000/api`

2. **Thunder Client** (VS Code Extension)
   - Install from VS Code extensions
   - Lightweight and integrated

3. **cURL** (Command Line)
   ```bash
   curl http://localhost:5000/api/products
   ```

## Common Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Clear all data from database
npm run seed:delete
```

## Project Structure Overview

```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── models/         # Database schemas
├── routes/         # API routes
├── utils/          # Helper functions
├── uploads/        # Uploaded images
├── .env           # Environment variables
└── server.js      # Application entry point
```

## Important Notes

1. **Admin Access**: Use `admin@example.com / admin123` after running the seeder
2. **File Uploads**: Images are stored locally in `/uploads/products/`
3. **CORS**: Configured to accept requests from `http://localhost:3000`
4. **JWT Tokens**: Valid for 7 days by default

## Next Steps

1. Connect your frontend to the API
2. Update CORS settings in `.env` if your frontend runs on a different port
3. Read the full [README.md](README.md) for complete API documentation
4. For production deployment, see the Vercel deployment section in README

## Troubleshooting

### MongoDB Connection Error
- Check if your MongoDB URI is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your database credentials

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Module Not Found Error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Support

For detailed API documentation, see [README.md](README.md)

For issues, check:
1. Console error messages
2. MongoDB connection status
3. Environment variables are set correctly

---

Happy coding! 🚀

# E-Commerce Backend API

A complete e-commerce backend built with Node.js, Express, and MongoDB. This backend provides all necessary functionality for a full-featured e-commerce application including authentication, product management, shopping cart, and order processing (without payment integration).

## Features

- **Authentication & Authorization**
  - User registration and login with JWT
  - Password hashing with bcrypt
  - Protected routes and role-based access control (User/Admin)

- **User Management**
  - User profile management
  - Password update
  - Account deletion
  - Admin user management (activate/deactivate users)

- **Product Management**
  - CRUD operations for products
  - Advanced search functionality
  - Category filtering
  - Price range filtering
  - Sorting (price, name, date, rating)
  - Pagination
  - Product image uploads

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Automatic stock validation
  - Cart persistence per user

- **Order Management**
  - Create orders from cart
  - Order history
  - Order status tracking (Placed, Processing, Shipped, Delivered, Cancelled)
  - Order cancellation with stock restoration
  - Automatic pricing calculation (subtotal, tax, shipping)

- **Admin Dashboard**
  - Dashboard statistics
  - User management
  - Order management
  - Product analytics
  - Best-selling products tracking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator
- **Environment Variables**: dotenv

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── userController.js     # User management
│   ├── productController.js  # Product operations
│   ├── cartController.js     # Cart management
│   ├── orderController.js    # Order processing
│   ├── adminController.js    # Admin operations
│   └── uploadController.js   # File upload handling
├── middleware/
│   ├── auth.js              # Authentication & authorization middleware
│   ├── errorHandler.js      # Centralized error handling
│   └── validator.js         # Request validation rules
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── userRoutes.js        # User endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── cartRoutes.js        # Cart endpoints
│   ├── orderRoutes.js       # Order endpoints
│   ├── adminRoutes.js       # Admin endpoints
│   └── uploadRoutes.js      # Upload endpoints
├── utils/
│   └── upload.js            # Multer configuration
├── uploads/
│   └── products/            # Product images storage
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Application entry point
└── vercel.json             # Vercel deployment config
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone and Install

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the backend root directory with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://eslamabdaltif:oneone2@cluster0.oqq08ws.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` to a random, secure string in production.

### Step 3: Run the Application

**Development Mode** (with auto-restart):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in .env)

## Deployment to Vercel

This backend is configured for easy deployment to Vercel.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# From the backend directory
vercel

# For production deployment
vercel --prod
```

### Step 3: Configure Environment Variables

In your Vercel dashboard, add the following environment variables:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: production
- `FRONTEND_URL`: Your frontend URL

### Note on File Uploads in Vercel

Vercel's serverless functions have ephemeral file systems. For production, consider using a cloud storage solution like:
- AWS S3
- Cloudinary
- Vercel Blob Storage

## API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.vercel.app/api
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. Login
**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### 3. Get Current User
**GET** `/api/auth/me`

Get currently logged-in user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    ...
  }
}
```

### 4. Logout
**POST** `/api/auth/logout`

Logout user (client-side token removal).

**Headers:**
```
Authorization: Bearer <token>
```

---

## User Endpoints

All user endpoints require authentication.

### 1. Get Profile
**GET** `/api/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

### 2. Update Profile
**PUT** `/api/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": { ... }
}
```

### 3. Update Password
**PUT** `/api/users/password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### 4. Delete Account
**DELETE** `/api/users/account`

**Headers:**
```
Authorization: Bearer <token>
```

---

## Product Endpoints

### 1. Get All Products
**GET** `/api/products`

Get products with optional filtering, searching, sorting, and pagination.

**Query Parameters:**
- `search`: Search by name, description, or tags
- `category`: Filter by category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `sort`: Sort option (price_asc, price_desc, name_asc, name_desc, newest, rating)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `featured`: Filter featured products (true/false)
- `inStock`: Filter in-stock products (true/false)

**Example:**
```
GET /api/products?category=Electronics&minPrice=100&maxPrice=1000&sort=price_asc&page=1&limit=12
```

**Response (200):**
```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "page": 1,
  "pages": 4,
  "data": [ ... ]
}
```

### 2. Get Single Product
**GET** `/api/products/:id`

### 3. Get Categories
**GET** `/api/products/categories/list`

Get all available product categories.

### 4. Get Featured Products
**GET** `/api/products/featured/list`

**Query Parameters:**
- `limit`: Number of products (default: 8)

### 5. Create Product (Admin Only)
**POST** `/api/products`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Electronics",
  "brand": "Brand Name",
  "stock": 50,
  "images": [
    {
      "url": "/uploads/products/image.jpg",
      "alt": "Product image"
    }
  ],
  "tags": ["tag1", "tag2"]
}
```

### 6. Update Product (Admin Only)
**PUT** `/api/products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

### 7. Delete Product (Admin Only)
**DELETE** `/api/products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

---

## Cart Endpoints

All cart endpoints require authentication.

### 1. Get Cart
**GET** `/api/cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": "user_id",
    "items": [
      {
        "product": { ... },
        "quantity": 2,
        "price": 99.99
      }
    ],
    "totalPrice": 199.98,
    "totalItems": 2
  }
}
```

### 2. Add to Cart
**POST** `/api/cart/items`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### 3. Update Cart Item
**PUT** `/api/cart/items/:productId`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "quantity": 3
}
```

### 4. Remove from Cart
**DELETE** `/api/cart/items/:productId`

**Headers:**
```
Authorization: Bearer <token>
```

### 5. Clear Cart
**DELETE** `/api/cart`

**Headers:**
```
Authorization: Bearer <token>
```

---

## Order Endpoints

All order endpoints require authentication.

### 1. Create Order
**POST** `/api/orders`

Create an order from the current user's cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "1234567890"
  },
  "notes": "Please deliver after 5 PM"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderNumber": "ORD-20240115-12345",
    "user": { ... },
    "items": [ ... ],
    "shippingAddress": { ... },
    "pricing": {
      "subtotal": 199.98,
      "tax": 19.99,
      "shipping": 0,
      "total": 219.97
    },
    "status": "Placed"
  }
}
```

### 2. Get User Orders
**GET** `/api/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by status (Placed, Processing, Shipped, Delivered, Cancelled)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### 3. Get Single Order
**GET** `/api/orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

### 4. Cancel Order
**PUT** `/api/orders/:id/cancel`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reason": "Changed my mind"
}
```

---

## Admin Endpoints

All admin endpoints require authentication and admin role.

### 1. Get Dashboard Statistics
**GET** `/api/admin/stats`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 150,
      "totalProducts": 200,
      "totalOrders": 500,
      "totalRevenue": 45000
    },
    "ordersByStatus": [ ... ],
    "recentOrders": [ ... ],
    "lowStockProducts": [ ... ],
    "bestSellingProducts": [ ... ]
  }
}
```

### 2. Get All Users
**GET** `/api/admin/users`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `search`: Search by name or email
- `role`: Filter by role (user/admin)
- `isActive`: Filter by active status
- `page`: Page number
- `limit`: Items per page

### 3. Update User Status
**PUT** `/api/admin/users/:id/status`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "isActive": false
}
```

### 4. Delete User
**DELETE** `/api/admin/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

### 5. Get All Orders (Admin View)
**GET** `/api/admin/orders`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status`: Filter by status
- `search`: Search by order number
- `page`: Page number
- `limit`: Items per page

### 6. Update Order Status
**PUT** `/api/admin/orders/:id/status`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "Shipped",
  "note": "Order shipped via FedEx"
}
```

**Valid Statuses:**
- Placed
- Processing
- Shipped
- Delivered
- Cancelled

---

## Upload Endpoints

All upload endpoints require authentication and admin role.

### 1. Upload Product Images
**POST** `/api/upload/product`

Upload multiple product images (max 5).

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `images`: File[] (max 5 images)
- `alt`: String (optional)

**Response (200):**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": [
    {
      "url": "/uploads/products/123456789-image.jpg",
      "alt": "Product image"
    }
  ]
}
```

### 2. Upload Single Image
**POST** `/api/upload/single`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `image`: File

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized / Invalid Token |
| 403 | Forbidden / Access Denied |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Product Categories

Available categories:
- Electronics
- Clothing
- Books
- Home & Kitchen
- Sports & Outdoors
- Toys & Games
- Health & Beauty
- Automotive
- Food & Grocery
- Other

---

## Order Status Flow

```
Placed → Processing → Shipped → Delivered
   ↓
Cancelled (can be cancelled before shipping)
```

---

## Pricing Calculation

Orders automatically calculate:
- **Subtotal**: Sum of all items (price × quantity)
- **Tax**: 10% of subtotal
- **Shipping**: $10 (FREE for orders over $100)
- **Total**: Subtotal + Tax + Shipping

---

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Error handling without exposing sensitive data

---

## Development Notes

### Creating an Admin User

To create an admin user, you can either:

1. **Register normally and manually update in database:**
   ```javascript
   // In MongoDB, update user role
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Modify the User model temporarily** to allow admin registration

### Testing the API

Use tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL
- Insomnia

Import the base URL and start testing endpoints!

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

## Changelog

### Version 1.0.0
- Initial release
- Complete authentication system
- Product management with search & filters
- Shopping cart functionality
- Order management
- Admin dashboard
- Image upload support
- Vercel deployment configuration

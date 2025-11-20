# Backend Integration Guide

This document describes how the frontend is integrated with the backend API.

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_API_URL=http://localhost:5000/api
```

Or set it in your deployment environment.

### 2. Backend Server

Make sure the backend server is running on port 5000 (or update the URL accordingly).

```bash
cd backend
npm install
npm start
```

## API Integration

### Centralized API Utility

All API requests go through `src/utils/api.js` which:
- Automatically adds authentication tokens to requests
- Handles error responses consistently
- Provides helper methods (get, post, put, delete)

### API Modules

#### Authentication (`src/api/auth.js`)
- `register(userData)` - Register new user
- `login(email, password)` - Login user
- `getMe()` - Get current user
- `logout()` - Logout user

#### Products (`src/api/products.js`)
- `getProducts(filters)` - Get all products with filters
- `getProductById(id)` - Get single product
- `getFeaturedProducts()` - Get featured products
- `getCategories()` - Get all categories
- `createProduct(productData)` - Create product (Admin)
- `updateProduct(id, productData)` - Update product (Admin)
- `deleteProduct(id)` - Delete product (Admin)

#### Categories (`src/api/categories.js`)
- `getCategories()` - Get all categories
- `getCategoryBySlug(slug)` - Get category by slug

#### Cart (`src/api/cart.js`)
- `getCart()` - Get user's cart
- `addToCart(productId, quantity)` - Add item to cart
- `updateCartItem(productId, quantity)` - Update cart item
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Clear entire cart

#### Orders (`src/api/orders.js`)
- `getUserOrders(params)` - Get user's orders
- `getOrder(orderId)` - Get single order
- `createOrder(orderData)` - Create new order
- `cancelOrder(orderId, reason)` - Cancel order

#### Admin (`src/api/admin.js`)
- `getDashboardStats()` - Get dashboard statistics
- `getAllUsers(params)` - Get all users with filters
- `updateUserStatus(userId, isActive)` - Update user status
- `deleteUser(userId)` - Delete user
- `getAllOrders(params)` - Get all orders
- `updateOrderStatus(orderId, status, note)` - Update order status
- `getAllProducts(params)` - Get all products (admin view)
- `createProduct(productData)` - Create product
- `updateProduct(productId, productData)` - Update product
- `deleteProduct(productId)` - Delete product

## Authentication Flow

1. User logs in via `login()` API call
2. Token is stored in localStorage with user data
3. `AuthContext` automatically includes token in all subsequent requests
4. Token is verified on app load via `getMe()` call
5. If token is invalid, user is logged out automatically

## Error Handling

All API functions throw errors that can be caught and displayed to users:

```javascript
try {
  const user = await login(email, password);
  // Success
} catch (error) {
  // error.message contains the error message from backend
  console.error(error.message);
}
```

## Response Format

Backend responses follow this format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

The API utility automatically extracts the `data` field and handles errors.

## Image URLs

Product images are automatically prefixed with the API base URL:

```javascript
// Backend returns: "/uploads/products/image.jpg"
// Frontend uses: "http://localhost:5000/uploads/products/image.jpg"
```

## Testing the Integration

1. Start the backend server
2. Start the frontend: `npm run dev`
3. Test login/register functionality
4. Test product listing
5. Test admin dashboard (requires admin user)

## Troubleshooting

### CORS Errors
- Make sure backend CORS is configured to allow your frontend URL
- Check `backend/server.js` CORS settings

### 401 Unauthorized
- Check if token is being sent in Authorization header
- Verify token is valid by checking localStorage
- Token might have expired - user needs to login again

### Network Errors
- Verify backend server is running
- Check `VITE_API_URL` environment variable
- Check browser console for detailed error messages




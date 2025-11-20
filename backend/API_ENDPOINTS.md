# API Endpoints Quick Reference

Base URL: `http://localhost:5000/api`

🔓 = Public | 🔒 = Requires Auth | 👑 = Requires Admin

---

## Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | 🔓 | Register new user |
| POST | `/auth/login` | 🔓 | Login user |
| GET | `/auth/me` | 🔒 | Get current user |
| POST | `/auth/logout` | 🔒 | Logout user |

---

## Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/users/profile` | 🔒 | Get user profile |
| PUT | `/users/profile` | 🔒 | Update profile |
| PUT | `/users/password` | 🔒 | Update password |
| DELETE | `/users/account` | 🔒 | Delete account |

---

## Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/products` | 🔓 | Get all products (with filters) |
| GET | `/products/:id` | 🔓 | Get single product |
| GET | `/products/categories/list` | 🔓 | Get all categories |
| GET | `/products/featured/list` | 🔓 | Get featured products |
| POST | `/products` | 👑 | Create product |
| PUT | `/products/:id` | 👑 | Update product |
| DELETE | `/products/:id` | 👑 | Delete product |

### Product Query Parameters

```
?search=laptop
?category=Electronics
?minPrice=100&maxPrice=1000
?sort=price_asc|price_desc|name_asc|name_desc|newest|rating
?page=1&limit=12
?featured=true
?inStock=true
```

---

## Cart

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/cart` | 🔒 | Get user cart |
| POST | `/cart/items` | 🔒 | Add item to cart |
| PUT | `/cart/items/:productId` | 🔒 | Update item quantity |
| DELETE | `/cart/items/:productId` | 🔒 | Remove item |
| DELETE | `/cart` | 🔒 | Clear cart |

---

## Orders

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/orders` | 🔒 | Create order from cart |
| GET | `/orders` | 🔒 | Get user orders |
| GET | `/orders/:id` | 🔒 | Get single order |
| PUT | `/orders/:id/cancel` | 🔒 | Cancel order |

### Order Query Parameters

```
?status=Placed|Processing|Shipped|Delivered|Cancelled
?page=1&limit=10
```

---

## Admin

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/admin/stats` | 👑 | Dashboard statistics |
| GET | `/admin/users` | 👑 | Get all users |
| PUT | `/admin/users/:id/status` | 👑 | Activate/deactivate user |
| DELETE | `/admin/users/:id` | 👑 | Delete user |
| GET | `/admin/orders` | 👑 | Get all orders |
| PUT | `/admin/orders/:id/status` | 👑 | Update order status |

### Admin Query Parameters

**Users:**
```
?search=john
?role=user|admin
?isActive=true|false
?page=1&limit=10
```

**Orders:**
```
?status=Placed|Processing|Shipped|Delivered|Cancelled
?search=ORD-20240115
?page=1&limit=10
```

---

## File Upload

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/upload/product` | 👑 | Upload multiple images (max 5) |
| POST | `/upload/single` | 👑 | Upload single image |

---

## Example Requests

### 1. Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

# Response includes token - save it!
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Products with Filters

```bash
GET /api/products?category=Electronics&minPrice=50&maxPrice=500&sort=price_asc&page=1&limit=10
```

### 4. Add to Cart

```bash
POST /api/cart/items
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "productId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 2
}
```

### 5. Create Order

```bash
POST /api/orders
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

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

### 6. Create Product (Admin)

```bash
POST /api/products
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "category": "Electronics",
  "stock": 100,
  "images": [
    {
      "url": "/uploads/products/mouse.jpg",
      "alt": "Wireless Mouse"
    }
  ]
}
```

### 7. Update Order Status (Admin)

```bash
PUT /api/admin/orders/ORDER_ID/status
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "Shipped",
  "note": "Shipped via FedEx, tracking: 123456789"
}
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Paginated Response

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

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Header Format

For all protected routes (🔒 and 👑):

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Product Categories

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

## Order Status Values

- `Placed` - Order created
- `Processing` - Being prepared
- `Shipped` - On the way
- `Delivered` - Completed
- `Cancelled` - Cancelled

---

## Test Credentials (After Seeding)

```
Admin:
Email: admin@example.com
Password: admin123

User:
Email: john@example.com
Password: password123
```

---

## Quick Testing with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get cart (with auth)
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

For detailed documentation, see [README.md](README.md)

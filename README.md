# Elite Shop - Full E-Commerce Ordering System

A complete full-stack e-commerce platform with user authentication, email verification, product management, order tracking, and Discord payment code integration.

## Features

✅ **User Management**
- User registration and login
- Email verification system
- User profiles

✅ **Shopping**
- Product catalog
- Shopping cart
- Order creation and tracking

✅ **Admin Dashboard**
- Product management (add/edit/delete)
- Order management
- Dashboard statistics
- Order status updates

✅ **Payment System**
- Unique payment code generation
- Email notifications with payment codes
- Discord bot integration to post payment codes
- Manual payment verification

✅ **Security**
- JWT authentication
- Bcrypt password hashing
- Protected admin routes

## Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- React Hot Toast for notifications
- Vite for bundling

**Backend:**
- Node.js + Express
- PostgreSQL database
- JWT for authentication
- Nodemailer for emails
- Discord.js for bot integration

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL database
- Gmail account (for email)
- Discord bot token

### 1. Clone and Install

```bash
git clone https://github.com/headphonelord8-sys/elite-shop-web.git
cd elite-shop-web

# Install server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Setup Database

```bash
# Create PostgreSQL database
createdb elite_shop

# Run migrations
npm run db:migrate
```

### 3. Configure Environment

Create `.env` file in root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/elite_shop

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@eliteshop.com

# Discord
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_CHANNEL_ID=your_channel_id

# App
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 4. Run Application

```bash
# Run both server and client
npm run dev

# Server runs on: http://localhost:5000
# Client runs on: http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `GET /api/auth/verify/:token` - Verify email
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/:id/generate-payment-code` - Generate payment code

### Dashboard (Admin)
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/orders` - Get all orders
- `PUT /api/dashboard/orders/:id/status` - Update order status

## Payment Flow

1. User creates order and checks out
2. User clicks "Generate Payment Code"
3. System generates unique code: `PAY-{timestamp}-{random}`
4. Code is sent to user's email
5. Code is posted to Discord channel for admin visibility
6. User shares code on Discord to confirm payment
7. Admin updates order status to "paid" in dashboard

## Discord Integration

The Discord bot automatically posts payment codes to your channel in this format:

```
🛍️ New Payment Code Generated
💳 Code: PAY-...
💰 Amount: $XX.XX
👤 Customer: John Doe
📧 Email: john@example.com
```

## Admin Setup

1. Create your account and verify email
2. Contact database admin to set `is_admin = TRUE` in users table
3. Access dashboard at `/dashboard`
4. Add products, manage inventory, and track orders

## Troubleshooting

**Email not sending:**
- Enable "Less secure app access" in Gmail
- Or use App Password if 2FA is enabled

**Discord bot not posting:**
- Verify bot has message permissions in channel
- Check DISCORD_CHANNEL_ID is correct
- Ensure bot is in the server

**Database connection failed:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

## License

MIT

## Support

For issues and questions, please open a GitHub issue.

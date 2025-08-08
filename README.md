# Education Platform Backend

This is the backend for an education platform built with Node.js, Express, and Drizzle ORM.

## Database Setup

### Prerequisites

- PostgreSQL database
- Node.js 18+

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
NODE_ENV=development
```

### Database Commands

1. **Generate migrations** (when schema changes):

   ```bash
   npm run db:generate
   ```

2. **Push schema changes directly** (for development):

   ```bash
   npm run db:push
   ```

3. **Run migrations** (for production):

   ```bash
   npm run db:migrate
   ```

4. **Run migrations programmatically**:

   ```bash
   npm run db:run-migrations
   ```

5. **Open Drizzle Studio** (database GUI):
   ```bash
   npm run db:studio
   ```

### Schema Structure

- `src/db/schema.js` - Main schema file that exports all tables
- `src/db/schema/users.js` - Users table with role enum
- `src/db/schema/courses.js` - Courses table with instructor relationship
- `src/db/connection.db.js` - Database connection and migration utilities

### Running the Application

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Database Schema

### Users Table

- `id` - Primary key (serial)
- `name` - User's full name
- `email` - Unique email address
- `password_hash` - Hashed password
- `role` - User role (student, instructor, admin)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Courses Table

- `id` - Primary key (serial)
- `title` - Course title
- `description` - Course description
- `price` - Course price in cents
- `instructor_id` - Foreign key to users table
- `created_at` - Timestamp
- `updated_at` - Timestamp

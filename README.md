# Soccer Platform

A web application for tracking live soccer matches and scores using Vue.js and Express.js.

## Features
- User Authentication (Register/Login)
- Live Match Tracking
- Today's Matches Schedule
- Real-time Score Updates
- League Information

## Project Structure
```
fusocoFutbol/
├── frontend/           # Vue.js frontend
│   ├── src/
│   │   ├── views/
│   │   ├── components/
│   │   ├── store/
│   │   └── router/
│   └── package.json
│
└── backend/           # Express.js backend
    ├── config/		   # MongoDb connection 
    ├── models/		   # Mongoose Scheme 
    ├── routes/
    ├── middleware/
    ├── server.js
    └── package.json
```

## Installation

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add the following to .env:
#In this case I make public my .env for ease the usage
PORT=3000
MONGODB_URI= 'mongodb+srv://ggarcia:admin123@cluster0.ywga3.mongodb.net/'
JWT_SECRET= secret_key
RAPID_API_KEY = 'ace8e72b70msh1b9228100d116b3p1b1f0ejsn045e20c6254c'
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Running the Application

### Start Backend Server
```bash
cd backend

node server.js
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/user` - Get user profile (protected)

### Soccer Data
- GET `/api/soccer/fixtures/live` - Get live matches
- GET `/api/soccer/fixtures/date/:date` - Get matches by date

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAPID_API_KEY=your_api_football_key
```

## Technologies Used
- Frontend:
  - Vue.js 3
  - Vue Router
  - Axios
  - Tailwind CSS
- Backend:
  - Express.js
  - MongoDB/Mongoose
  - JSON Web Tokens
  - API-Football (RapidAPI)

## Development

### Adding New Features
1. Create new components in `frontend/src/components`
2. Add new routes in `backend/routes`
3. Create new models in `backend/models`
4. Update API endpoints as needed

### API Integration
The project uses API-Football from RapidAPI. To add more endpoints:
1. Add new routes in `backend/routes/soccer.js`
2. Update frontend services to use new endpoints
3. Implement new features in Vue components

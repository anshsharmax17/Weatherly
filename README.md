# Weatherly — MERN Weather Web Application

Weatherly is a deployment-ready MERN stack weather dashboard with a polished SaaS-style UI, JWT authentication, MongoDB persistence, OpenWeatherMap integration, Chart.js forecasting, PWA support, favorites, recent searches, and animated glassmorphism backgrounds.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Context API, Axios, React Router, Framer Motion, Chart.js, PWA
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, express-validator
- **Security:** Helmet, CORS, rate limiting, password hashing, protected routes
- **Weather API:** OpenWeatherMap current weather and 5-day forecast APIs

## Folder Structure

```text
.
├── client/                  # Vite React frontend
│   ├── public/              # PWA icons and static assets
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Navbar, cards, loader, search, charts
│       ├── context/         # Auth, theme, weather state providers
│       ├── hooks/           # Debounce hook
│       ├── pages/           # Home, Login, Register, Dashboard, Favorites
│       └── utils/           # Weather formatting helpers
├── server/                  # Express API backend
│   └── src/
│       ├── config/          # Environment and database setup
│       ├── controllers/     # Auth, weather, user controllers
│       ├── middleware/      # Auth, validation, errors, rate limits
│       ├── models/          # Mongoose User schema with favorites/history
│       ├── routes/          # REST API routes
│       ├── services/        # JWT and OpenWeatherMap service/cache
│       └── utils/           # Async and response helpers
├── render.yaml              # Render backend blueprint
├── railway.json             # Railway backend config
└── vercel.json              # Vercel frontend config
```

## Features

### Frontend

- Responsive dashboard with reusable components and glassmorphism effects
- Search weather by city name with debounced requests
- Geolocation-based weather lookup
- Current temperature, condition, humidity, wind speed, feels like, sunrise, and sunset
- 5-day forecast cards with dynamic OpenWeatherMap icons
- Weather-driven animated gradient backgrounds
- Dark/light theme toggle persisted in local storage
- Skeleton loading UI, toast notifications, and API error handling
- Favorite cities and recently searched cities
- Chart.js temperature trend visualization
- PWA manifest and auto-updating service worker

### Backend

- Express REST API with MVC folder structure
- JWT register/login/profile flow
- Protected weather, favorites, and history routes
- MongoDB User model with embedded favorite cities and search history
- bcrypt password hashing
- OpenWeatherMap API integration with normalized responses
- In-memory API response caching with configurable TTL
- express-validator request validation
- Helmet, CORS, rate limiting, and centralized error middleware

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Create a user and return a JWT |
| POST | `/api/auth/login` | No | Login and return a JWT |
| GET | `/api/auth/me` | Yes | Load current user profile |
| GET | `/api/weather/current?city=London` | Yes | Current weather by city |
| GET | `/api/weather/current?lat=51.5&lon=-0.1` | Yes | Current weather by geolocation |
| GET | `/api/weather/forecast?city=London` | Yes | 5-day forecast |
| GET | `/api/user/favorites` | Yes | List favorite cities |
| POST | `/api/user/favorites` | Yes | Save favorite city |
| DELETE | `/api/user/favorites/:id` | Yes | Remove favorite city |
| GET | `/api/user/history` | Yes | List recent searches |
| DELETE | `/api/user/history` | Yes | Clear recent searches |

Send protected requests with:

```http
Authorization: Bearer <jwt-token>
```

## Database Schema

The main MongoDB collection is `users`:

```js
{
  name: String,
  email: String,
  password: String, // bcrypt hash, select:false
  favoriteCities: [{ name: String, country: String, lat: Number, lon: Number }],
  searchHistory: [{ city: String, country: String, condition: String, temperature: Number }],
  createdAt: Date,
  updatedAt: Date
}
```

## Sample API Responses

### Register/Login

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "6650...", "name": "Alex", "email": "alex@example.com", "favoriteCities": [], "searchHistory": [] },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
}
```

### Current Weather

```json
{
  "success": true,
  "message": "Current weather loaded",
  "data": {
    "city": "London",
    "country": "GB",
    "coordinates": { "lon": -0.1257, "lat": 51.5085 },
    "temperature": 16,
    "feelsLike": 15,
    "humidity": 70,
    "windSpeed": 4.6,
    "condition": "Clouds",
    "description": "broken clouds",
    "icon": "04d",
    "sunrise": 1715489600,
    "sunset": 1715545200
  }
}
```

### Forecast

```json
{
  "success": true,
  "message": "Forecast loaded",
  "data": {
    "city": "London",
    "country": "GB",
    "forecast": [
      { "date": "2026-05-12 12:00:00", "temperature": 16, "min": 14, "max": 17, "humidity": 70, "windSpeed": 4.6, "condition": "Clouds", "description": "broken clouds", "icon": "04d" }
    ]
  }
}
```

## Local Setup

### Prerequisites

- Node.js 20+
- MongoDB running locally or MongoDB Atlas connection string
- OpenWeatherMap API key

### Install

```bash
npm run install:all
```

### Environment Variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update `server/.env` with your MongoDB URI, JWT secret, and OpenWeatherMap API key.

### Run Development Servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

### Production Build

```bash
npm run build
npm start
```

## Deployment

### MongoDB Atlas

1. Create an Atlas cluster.
2. Add a database user and password.
3. Allow your backend host IP or use `0.0.0.0/0` for managed platform access.
4. Copy the connection string into `MONGO_URI`.

### Vercel Frontend

1. Import the repository into Vercel.
2. Set the project root to `client` or use the included root `vercel.json`.
3. Add `VITE_API_URL=https://your-backend.example.com/api`.
4. Deploy with build command `npm run build` and output directory `dist` if using `client` as root.

### Render Backend

1. Create a new Web Service or use `render.yaml`.
2. Set root directory to `server`.
3. Add environment variables from `server/.env.example`.
4. Use build command `npm install` and start command `npm start`.

### Railway Backend

1. Create a Railway project from the repo.
2. Set the service root to `server`.
3. Add `MONGO_URI`, `JWT_SECRET`, `OPENWEATHER_API_KEY`, and `CLIENT_URL`.
4. Railway can use the included `railway.json` start command.

## Notes

- Weather routes are protected intentionally so saved search history can be associated with the authenticated user.
- OpenWeatherMap responses are cached in memory for `CACHE_TTL_SECONDS` to reduce external API usage.
- The frontend uses Axios interceptors to attach JWT tokens automatically.

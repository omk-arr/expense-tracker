export const appConfig = {
    port: process.env.PORT || 3000,
    db: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: '1d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Vite's default port
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        maxAge: 600
    },
    logLevel: process.env.LOG_LEVEL || 'info',
};
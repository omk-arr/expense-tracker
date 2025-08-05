const JWT_SECRET = process.env.JWT_SECRET 

export default function isAuthenticated() {
    return function (req, res, next) {
        const accessToken = req.headers.autherization.split(' ')[1]
        if (!accessToken) return res.status(401).json({ error: 'Access token missing' })
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded // e.g. { userId, email, iat, exp }
            next()
        } catch (err) {
            return res.status(403).json({ error: 'Invalid or expired token' })
        }
    }
}
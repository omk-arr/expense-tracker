import bcrypt from 'bcryptjs'
import ServiceBase from "../../libs/serviceBase.js"
import { DatabaseService } from '../database.service.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_dev_secret'
const JWT_EXPIRES_IN = '1h' // Or '1h', etc.

export class LoginService extends ServiceBase {
    async run() {
        const { email, password } = this.args

        try {

            // Hash password
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)

            // Check if user exists
            const userArr = await DatabaseService.getUserByEmail(email)
            const user = userArr[0]
            const isPasswordMatch = await bcrypt.compare(password, user.password_hash)

            if (user && user.email === email && isPasswordMatch) {
                delete user.password_hash
                // ✅ Generate JWT token
                const authToken = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: JWT_EXPIRES_IN }
                )
                user.token = authToken
                return user
            }
            else if (user && user.email === email && !isPasswordMatch) {
                this.addError('WrongPassword', 'please try again!')
                return null
            }
            else {
                this.addError('User', 'does not exists')
                return null
            }

        } catch (error) {
            console.error('Error in LoginServie:', error)
            this.addError('Service', 'failed to Sign in user')
            return null
        }
    }
}
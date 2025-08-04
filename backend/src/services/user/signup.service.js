import bcrypt from 'bcryptjs'
import ServiceBase from "../../libs/serviceBase.js"
import { DatabaseService } from '../database.service.js'

export class SignupService extends ServiceBase {
  async run() {
    const { username, email, password, firstName, lastName } = this.args

    try {
      // Check if user already exists
      const existingUser = await DatabaseService.getUserByEmail(email)
      if (existingUser && existingUser.email === email) {
        this.addError('Email', 'is already taken')
        return null
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)

      // Create user
      const user = await DatabaseService.createUser({
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        countryCode: this.args.countryCode,
        mobileNumber: this.args.mobileNumber,
        age: this.args.age ? parseInt(this.args.age) : null,
        gender: this.args.gender
      })
      if (!user) throw new Error('User creation failed')
      // Remove password hash from response
      delete user.password_hash

      return user
    } catch (error) {
      console.error('Error in SignupService:', error)
      this.addError('Service', 'failed to create user')
      return null
    }
  }
}


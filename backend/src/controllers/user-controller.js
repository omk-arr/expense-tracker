import { SignupService } from '../services/user/signup.service.js'
import { LoginService } from '../services/user/login.service.js'

export class UserController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async signup (req, res, next) {
    try {
      const result = await SignupService.execute({ ...req.body, ...req.query}, req.context)
      if (result.success) res.status(200).send(result.result)
    //   decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async login (req, res, next) {
    try {
      const result = await LoginService.execute({ ...req.body, ...req.query}, req.context)
      // if (result.success && result?.result?.user?.id) result.result.accessToken = await createSession(req, result.result.user.id, result.result.user.sessionLimit)
      if (result.success) res.status(200).send(result.result)
      // decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async logout (req, res, next) {
    try {
      const result = await LogoutService.execute({ userId: req.authenticated.userId }, req.context)
      destroySession(req)
      decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async update (req, res, next) {
    try {
      const result = await UpdateUserService.execute({ ...req.body, userId: req.authenticated.userId }, req.context)
      decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async getUser (req, res, next) {
    try {
      const result = await GetUserService.execute({ userId: req.authenticated.userId }, req.context)
      decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  static async forgotPassword (req, res, next) {
    try {
      const result = await ForgotPasswordService.execute(req.body, req.context)
      decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
  static async resetPassword (req, res, next) {
    try {
      const result = await ResetPasswordService.execute({ ...req.body }, req.context)
      decorateResponse({ req, res, next }, result)
    } catch (error) {
      console.log(error, 'controller error')
      next(error)
    }
  }
}
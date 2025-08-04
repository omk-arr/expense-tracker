import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import morgan from 'morgan'
import {appConfig} from './src/configs/app.config.js'
import { router } from './src/routes/index.js'
import { checkDatabaseConnection } from './src/configs/db.health.js'
import chalk from 'chalk'




(async () => {
  const port = process.env.PORT || 3000
  const app = express()

  app.use(cors({
    origin: appConfig.cors,
    credentials: true
  }))

  app.use(helmet())

  app.use(bodyParser.json({ limit: '1mb' }))

  app.use(morgan('tiny'))

  app.use(bodyParser.urlencoded({ extended: true }))

//   app.use(contextMiddleware)

  app.use(router)

//   app.use(errorHandlerMiddleware)

  // Check database connection before starting the server
  const dbStatus = await checkDatabaseConnection()
  
  if (!dbStatus.isConnected) {
    console.error('\n❌ Database Connection Error:', dbStatus.error)
    process.exit(1)
  }

  const httpServer = createServer(app)

  httpServer.listen({ port }, () => {
    console.log('\n🚀 Server Status:')
    console.log('------------------')
    console.log('🌐 Server:', chalk.green('Running'))
    console.log('🚪 Port:', chalk.yellow(port))
    console.log('🌍 Environment:', chalk.yellow(process.env.NODE_ENV || 'development'))
    console.log('\n📊 Database Status:')
    console.log('------------------')
    console.log('🔌 Connection:', chalk.green('Connected'))
    console.log('🗄️  Tables Health Check:')
    console.log('   - Users:', dbStatus.healthCheck.users ? chalk.green('✓') : chalk.red('✗'))
    console.log('   - Categories:', dbStatus.healthCheck.categories ? chalk.green('✓') : chalk.red('✗'))
    console.log('   - Expenses:', dbStatus.healthCheck.expenses ? chalk.green('✓') : chalk.red('✗'))
    console.log('\n📝 API Documentation:', chalk.blue('http://localhost:' + port + '/api-docs'))
    console.log('------------------\n')
  })
})()

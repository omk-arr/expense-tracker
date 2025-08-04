import { supabase } from './db.config.js'

export async function checkDatabaseConnection() {
  try {
    // Try to fetch a single category to verify database connection
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .limit(1)

    if (error) throw error

    // Additional health check to verify schema
    const healthCheck = {
      categories: false,
      users: false,
      expenses: false
    }

    // Check categories table
    const { error: categoriesError } = await supabase
      .from('categories')
      .select('count')
      .single()
    healthCheck.categories = !categoriesError

    // Check users table
    const { error: usersError } = await supabase
      .from('users')
      .select('count')
      .single()
    healthCheck.users = !usersError

    // Check expenses table
    const { error: expensesError } = await supabase
      .from('expenses')
      .select('count')
      .single()
    healthCheck.expenses = !expensesError

    return {
      isConnected: true,
      healthCheck,
      message: 'Successfully connected to Supabase database'
    }
  } catch (error) {
    console.log(error)
    return {
      isConnected: false,
      error: error.message,
      message: 'Failed to connect to Supabase database'
    }
  }
}

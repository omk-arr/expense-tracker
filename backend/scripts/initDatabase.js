import { supabase } from '../src/configs/db.config.js'

async function initializeDatabase() {
  try {
    // Check if default categories exist
    const { data: existingCategories, error: checkError } = await supabase
      .from('categories')
      .select('name')
      .eq('is_default', true)

    if (checkError) {
      console.error('Error checking categories:', checkError)
      throw checkError
    }

    // Only insert default categories if none exist
    if (!existingCategories || existingCategories.length === 0) {
      const defaultCategories = [
        { name: 'Food & Dining', description: 'Restaurants, groceries, and dining out', is_default: true },
        { name: 'Transportation', description: 'Public transport, fuel, and vehicle maintenance', is_default: true },
        { name: 'Shopping', description: 'Clothing, electronics, and general purchases', is_default: true },
        { name: 'Bills & Utilities', description: 'Rent, utilities, and recurring payments', is_default: true },
        { name: 'Entertainment', description: 'Movies, games, and recreational activities', is_default: true }
      ]

      const { error: insertError } = await supabase
        .from('categories')
        .upsert(defaultCategories, { 
          onConflict: 'name',
          ignoreDuplicates: true 
        })

      if (insertError) {
        console.error('Error inserting default categories:', insertError)
        throw insertError
      }

      console.log('Successfully inserted default categories!')
    } else {
      console.log('Default categories already exist.')
      console.log('Existing categories:', existingCategories.map(c => c.name).join(', '))
    }
    // Additional verification
    console.log('Verifying table structure...')

    // Check users table
    const { error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1)

    if (usersError) {
      console.log('Users table needs to be created. Please run the SQL script in the Supabase dashboard.')
    } else {
      console.log('Users table exists and is accessible.')
    }

    // Check expenses table
    const { error: expensesError } = await supabase
      .from('expenses')
      .select('id')
      .limit(1)

    if (expensesError) {
      console.log('Expenses table needs to be created. Please run the SQL script in the Supabase dashboard.')
    } else {
      console.log('Expenses table exists and is accessible.')
    }

    console.log('Database initialization and verification completed!')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initializeDatabase()

// initializeDatabase()

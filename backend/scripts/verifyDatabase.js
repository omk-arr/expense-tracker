import { supabase } from '../src/configs/db.config.js'

async function verifyDatabase() {
  try {
    // Test database connection by checking categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('name, description, is_default')
      .eq('is_default', true)

    if (categoriesError) {
      console.error('Error connecting to database:', categoriesError)
      throw categoriesError
    }

    console.log('Successfully connected to database!')
    console.log('Default categories found:', categories.length)
    console.log('Categories:', categories.map(c => c.name).join(', '))
  } catch (error) {
    console.error('Error verifying database:', error)
    process.exit(1)
  }
}

verifyDatabase()

import { supabase } from '../configs/db.config.js'

export class DatabaseService {
    static async createUser({ username, email, passwordHash, firstName, lastName, countryCode, mobileNumber, age, gender }) {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username,
                    email,
                    password_hash: passwordHash,
                    first_name: firstName,
                    last_name: lastName,
                    country_code: countryCode,
                    mobile_number: mobileNumber,
                    age,
                    gender
                }
            ])
            .select()

        if (error) throw error
        if (!data || data.length === 0) {
            throw new Error('No user returned from insert')
        }
        return data[0]
    }

    static async getUserByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .limit(1)
        if (error) throw error
        return data
    }

    static async createExpense({ amount, description, date, userId, categoryId }) {
        const { data, error } = await supabase
            .from('expenses')
            .insert([
                {
                    amount,
                    description,
                    date,
                    user_id: userId,
                    category_id: categoryId
                }
            ])
            .select()

        if (error) throw error
        return data[0]
    }

    static async getExpenses(userId, { startDate, endDate, categoryId, page = 1, limit = 10 }) {
        let query = supabase
            .from('expenses')
            .select(`
        *,
        categories (
          name,
          description
        )
      `)
            .eq('user_id', userId)
            .order('date', { ascending: false })

        if (startDate) query = query.gte('date', startDate)
        if (endDate) query = query.lte('date', endDate)
        if (categoryId) query = query.eq('category_id', categoryId)

        // Add pagination
        const from = (page - 1) * limit
        const to = from + limit - 1
        query = query.range(from, to)

        const { data, error, count } = await query

        if (error) throw error
        return { expenses: data, count }
    }

    static async getCategories(userId) {
        const { data, error } = await supabase
            .from('categories')
            .select()
            .or(`user_id.eq.${userId},is_default.eq.true`)
            .order('name')

        if (error) throw error
        return data
    }

    static async createCategory({ name, description, userId }) {
        const { data, error } = await supabase
            .from('categories')
            .insert([
                {
                    name,
                    description,
                    user_id: userId,
                    is_default: false
                }
            ])
            .select()

        if (error) throw error
        return data[0]
    }
}

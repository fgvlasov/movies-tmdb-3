require('dotenv').config()

// Initialize DB connection

// @ts-ignore
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { Database } from './database.types'

export const supabase = createClient<Database>(
  process.env.SUPA_URL!,
  process.env.SUPA_APIKEY!
)

console.log("SupaDB is connected")
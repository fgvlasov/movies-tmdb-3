import { initSupabase } from '@/modules/supabase/init.js'

export const initModules = async () => {
  await initSupabase()
}

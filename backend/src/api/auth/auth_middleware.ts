import { supabaseAuthMiddleware } from "@/modules/supabase/auth/supabaseAuthMiddleware.js"

export const auth_middleware = async (req, res, next) => {
  supabaseAuthMiddleware(req, res, next)
}
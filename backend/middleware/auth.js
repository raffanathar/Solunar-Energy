import { supabase } from '../lib/supabase.js'

export const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Authentication required' })

    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid or expired token' })

    const role = data.user.user_metadata?.role
    if (role !== 'admin') return res.status(403).json({ error: 'Admin access required' })

    req.user = {
      id: data.user.id,
      email: data.user.email,
      role,
    }
    next()
  } catch (e) {
    res.status(500).json({ error: 'Auth check failed' })
  }
}

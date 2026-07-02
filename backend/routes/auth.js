import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(401).json({ error: error.message })
    const user = data.user
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email?.split('@')[0],
        role: user.user_metadata?.role || 'user',
      },
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, ...meta } = req.body
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: meta },
    })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otpCode } = req.body
    const { data, error } = await supabase.auth.verifyOtp({
      email, token: otpCode, type: 'signup',
    })
    if (error) return res.status(400).json({ error: error.message })
    res.json({ access_token: data.session?.access_token })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body
    const { error } = await supabase.auth.resend({ email, type: 'signup' })
    if (error) return res.status(400).json({ error: error.message })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return res.status(400).json({ error: error.message })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.json(null)
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data?.user) return res.json(null)
    const user = data.user
    res.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split('@')[0],
      role: user.user_metadata?.role || 'user',
    })
  } catch {
    res.json(null)
  }
})

export default router

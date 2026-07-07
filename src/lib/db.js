import { supabase } from './supabase'

const API = import.meta.env.VITE_API_URL || '/api'

const getToken = () => localStorage.getItem('solunar_token')

const authHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const handleRes = async (res) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

const db = {
  auth: {
    isAuthenticated: async () => {
      const user = await db.auth.me()
      return !!user
    },

    me: async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { headers: authHeaders() })
        return handleRes(res)
      } catch {
        return null
      }
    },

    loginViaEmailPassword: async (email, password) => {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await handleRes(res)
      if (data.access_token) {
        localStorage.setItem('solunar_token', data.access_token)
      }
      return data
    },

    loginWithProvider: async (provider, redirectTo) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectTo || window.location.origin },
      })
      if (error) throw error
    },

    register: async ({ email, password, ...meta }) => {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, ...meta }),
      })
      return handleRes(res)
    },

    verifyOtp: async ({ email, otpCode }) => {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode }),
      })
      const data = await handleRes(res)
      if (data.access_token) {
        localStorage.setItem('solunar_token', data.access_token)
      }
      return data
    },

    setToken: (token) => {
      if (token) localStorage.setItem('solunar_token', token)
    },

    resendOtp: async (email) => {
      const res = await fetch(`${API}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      return handleRes(res)
    },

    resetPasswordRequest: async (email) => {
      const res = await fetch(`${API}/auth/reset-password-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      return handleRes(res)
    },

    resetPassword: async ({ resetToken, newPassword }) => {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ resetToken, newPassword }),
      })
      return handleRes(res)
    },

    logout: () => {
      localStorage.removeItem('solunar_token')
    },

    redirectToLogin: (redirect) => {
      window.location.href = `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`
    },
  },

  entities: new Proxy({}, {
    get: (_, name) => ({
      list: async (orderBy, limit) => {
        const params = new URLSearchParams()
        if (orderBy) params.set('orderBy', orderBy)
        if (limit) params.set('limit', limit)
        const res = await fetch(`${API}/entities/${name}/list?${params}`, { headers: authHeaders() })
        return handleRes(res)
      },

      filter: async (query, orderBy, limit) => {
        const params = new URLSearchParams()
        if (orderBy) params.set('orderBy', orderBy)
        if (limit) params.set('limit', limit)
        for (const [key, val] of Object.entries(query)) {
          params.set(key, val)
        }
        const res = await fetch(`${API}/entities/${name}/filter?${params}`, { headers: authHeaders() })
        return handleRes(res)
      },

      get: async (id) => {
        const res = await fetch(`${API}/entities/${name}/${id}`, { headers: authHeaders() })
        return handleRes(res)
      },

      create: async (data) => {
        const res = await fetch(`${API}/entities/${name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders() },
          body: JSON.stringify(data),
        })
        return handleRes(res)
      },

      update: async (id, data) => {
        const res = await fetch(`${API}/entities/${name}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', ...authHeaders() },
          body: JSON.stringify(data),
        })
        return handleRes(res)
      },

      delete: async (id) => {
        const res = await fetch(`${API}/entities/${name}/${id}`, {
          method: 'DELETE',
          headers: authHeaders(),
        })
        return handleRes(res)
      },
    }),
  }),

  integrations: {
    Core: {
      UploadFile: async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${API}/upload`, { method: 'POST', body: formData })
        return res.json()
      },
    },
  },
}

globalThis.__B44_DB__ = db
export default db

import { Router } from 'express'
import { supabase } from '../lib/supabase.js'
import { requireAdmin } from '../middleware/auth.js'

const ENTITY_TABLE_MAP = {
  BlogPost: 'blog_posts',
  ContactInfo: 'contact_infos',
  CustomerReview: 'customer_reviews',
  Product: 'products',
  Project: 'projects',
  QuoteRequest: 'quote_requests',
  Service: 'services',
  SolarPackage: 'solar_packages',
}

const FIELD_ALIASES = {
  created_date: 'created_at',
  order: 'sort_order',
}

const toSnake = (str) => str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)

const mapField = (field) => FIELD_ALIASES[field] || toSnake(field)

const mapData = (data) => {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(mapData)
  const result = {}
  for (const [key, val] of Object.entries(data)) {
    result[mapField(key)] = val
  }
  return result
}

const toCamel = (str) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

const unmapData = (data) => {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(unmapData)
  const result = {}
  for (const [key, val] of Object.entries(data)) {
    const alias = Object.entries(FIELD_ALIASES).find(([, v]) => v === key)
    result[alias ? alias[0] : toCamel(key)] = val
  }
  return result
}

const parseOrder = (orderBy) => {
  if (!orderBy) return { column: 'created_at', ascending: false }
  const desc = orderBy.startsWith('-')
  return { column: mapField(desc ? orderBy.slice(1) : orderBy), ascending: !desc }
}

const router = Router()

router.get('/:entity/list', async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    if (!table) return res.json([])
    const { column, ascending } = parseOrder(req.query.orderBy)
    const limit = parseInt(req.query.limit) || 100
    const { data } = await supabase
      .from(table).select('*')
      .order(column, { ascending })
      .limit(limit)
    res.json(unmapData(data || []))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:entity/filter', async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    if (!table) return res.json([])
    let query = supabase.from(table).select('*')
    const { column, ascending } = parseOrder(req.query.orderBy)
    if (req.query.orderBy) query = query.order(column, { ascending })
    if (req.query.limit) query = query.limit(parseInt(req.query.limit))
    for (const [key, val] of Object.entries(req.query)) {
      if (['orderBy', 'limit'].includes(key)) continue
      query = query.eq(mapField(key), val)
    }
    const { data } = await query
    res.json(unmapData(data || []))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:entity/:id', async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    if (!table) return res.json(null)
    const { data } = await supabase.from(table).select('*').eq('id', req.params.id).single()
    res.json(unmapData(data))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Public lead capture: QuoteRequest (free quote form) and CustomerReview (review form)
// are submitted by anonymous site visitors, so they must NOT require admin auth.
// All other entities remain admin-only (managed via the CMS panel).
const PUBLIC_CREATE_TABLES = ['quote_requests', 'customer_reviews']

router.post('/:entity', async (req, res, next) => {
  const table = ENTITY_TABLE_MAP[req.params.entity]
  if (!table) return res.status(400).json({ error: 'Unknown entity' })
  if (!PUBLIC_CREATE_TABLES.includes(table)) return requireAdmin(req, res, next)
  next()
}, async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    const data = { ...req.body }
    // Never let anonymous visitors set their own moderation/status values.
    if (table === 'quote_requests') data.status = 'new'
    if (table === 'customer_reviews') data.status = 'pending'
    const { data: inserted, error } = await supabase
      .from(table).insert(mapData(data)).select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(unmapData(inserted))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.patch('/:entity/:id', requireAdmin, async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    if (!table) return res.status(400).json({ error: 'Unknown entity' })
    const { data } = await supabase
      .from(table).update(mapData(req.body)).eq('id', req.params.id).select().single()
    res.json(unmapData(data))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:entity/:id', requireAdmin, async (req, res) => {
  try {
    const table = ENTITY_TABLE_MAP[req.params.entity]
    if (!table) return res.status(400).json({ error: 'Unknown entity' })
    await supabase.from(table).delete().eq('id', req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router

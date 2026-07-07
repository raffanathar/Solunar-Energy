import express from 'express'
import multer from 'multer'
import cors from 'cors'
import 'dotenv/config'
import { supabase } from './lib/supabase.js'
import authRoutes from './routes/auth.js'
import entityRoutes from './routes/entities.js'

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const ext = req.file.originalname.split('.').pop() || 'bin'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      })
    if (error) return res.status(500).json({ error: error.message })
    const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName)
    res.json({ file_url: publicUrl })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/entities', entityRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})

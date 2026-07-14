import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
})

async function createBucket() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const bucketName = 'uploads'

    // 1. Check if bucket already exists
    const { rows } = await client.query(
      `SELECT id FROM storage.buckets WHERE id = $1`,
      [bucketName]
    )
    if (rows.length > 0) {
      console.log(`Bucket "${bucketName}" already exists.`)
    } else {
      // 2. Create the bucket
      await client.query(
        `INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
         VALUES ($1, $2, true, false, 10485760, NULL)`,
        [bucketName, bucketName]
      )
      console.log(`Bucket "${bucketName}" created.`)
    }

    // 3. Ensure RLS policies exist for anonymous uploads
    // Drop existing policies first to avoid conflicts
    await client.query(`
      DROP POLICY IF EXISTS "Give users access to own folder 1g7lq8_0" ON storage.objects;
      DROP POLICY IF EXISTS "Give users access to own folder 1g7lq8_1" ON storage.objects;
      DROP POLICY IF EXISTS "Give users access to own folder 1g7lq8_2" ON storage.objects;
    `)

    // Policy: Public SELECT on objects in the bucket
    await client.query(`
      CREATE POLICY "Public SELECT uploads"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'uploads')
    `)

    // Policy: Public INSERT into the bucket
    await client.query(`
      CREATE POLICY "Public INSERT uploads"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'uploads')
    `)

    // Policy: Public UPDATE on objects in the bucket
    await client.query(`
      CREATE POLICY "Public UPDATE uploads"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'uploads')
      WITH CHECK (bucket_id = 'uploads')
    `)

    // Policy: Public DELETE on objects in the bucket
    await client.query(`
      CREATE POLICY "Public DELETE uploads"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'uploads')
    `)

    await client.query('COMMIT')
    console.log('RLS policies created for bucket "uploads".')
    console.log('Bucket setup complete!')
  } catch (e) {
    await client.query('ROLLBACK')
    console.error('Error setting up bucket:', e.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

createBucket()

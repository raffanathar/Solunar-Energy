/**
 * Usage: node backend/scripts/set-admin.js <email>
 *
 * Promotes a user to admin by updating their auth metadata.
 * Requires DB_PASSWORD in .env (already there, just uncomment it).
 *
 * The script runs psql with the direct DB connection.
 */

import 'dotenv/config'
import { execSync } from 'child_process'

const email = process.argv[2]
if (!email) {
  console.error('Usage: node backend/scripts/set-admin.js <email>')
  process.exit(1)
}

const host = process.env.DB_HOST || 'aws-1-ap-south-1.pooler.supabase.com'
const port = process.env.DB_PORT || '6543'
const db = process.env.DB_NAME || 'postgres'
const user = process.env.DB_USER || 'postgres.qzhrgvadbqdsxvqhoamr'
const password = process.env.DB_PASSWORD

if (!password) {
  console.error('ERROR: DB_PASSWORD not set in .env')
  console.error('Add this to your .env:')
  console.error('  DB_PASSWORD=LPqYiLEtrs8Ea2Qp')
  process.exit(1)
}

const sql = `UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb WHERE email = '${email.replace(/'/g, "''")}' RETURNING id, email;`

try {
  const out = execSync(
    `PGPASSWORD="${password}" psql -h ${host} -p ${port} -d ${db} -U ${user} -c "${sql}" -t -A`,
    { encoding: 'utf-8', timeout: 10000 }
  )
  if (out.trim()) {
    console.log(`✅ "${email}" is now an admin.`)
  } else {
    console.error(`User "${email}" not found. Register first via the app, then re-run.`)
    process.exit(1)
  }
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
}

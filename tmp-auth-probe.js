const { createClient } = require('@supabase/supabase-js')
const url = 'https://wvsmprxajhjoovmaeqsb.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2c21wcnhhamhqb292bWFlcXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNjA0ODcsImV4cCI6MjEwODczNjQ4N30.5h02UwABNbjK60DwB5WA43m4rhqsgoJHl9lSvqjXRjI'
const supabase = createClient(url, key)
const accounts = [
  ['demo@estudiante.com', 'demo1234'],
  ['demo@estudiante.com', 'Demo1234'],
  ['demo@estudiante.com', 'demo12345'],
  ['admin@estudiante.com', 'admin1234'],
  ['admin@estudiante.com', 'Admin1234'],
  ['docente@estudiante.com', 'demo1234'],
  ['orientacion@estudiante.com', 'demo1234'],
]

;(async () => {
  for (const [email, password] of accounts) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('TRY', email, password, 'ERR=', error ? error.message : 'NO_ERROR', 'SESSION=', data?.session ? 'YES' : 'NO')
  }
})().catch((e) => {
  console.error('FATAL', e)
  process.exit(1)
})

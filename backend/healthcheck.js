// Script de vérification de santé du serveur
const http = require('http')

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 10000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
}

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Serveur en bonne santé')
    process.exit(0)
  } else {
    console.log('❌ Serveur en erreur:', res.statusCode)
    process.exit(1)
  }
})

req.on('error', (err) => {
  console.log('❌ Erreur de connexion:', err.message)
  process.exit(1)
})

req.on('timeout', () => {
  console.log('❌ Timeout de connexion')
  req.destroy()
  process.exit(1)
})

req.end()
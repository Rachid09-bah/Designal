// Script pour exécuter la correction des URLs d'images
const { exec } = require('child_process')

console.log('🔧 Correction des URLs d\'images en cours...')

exec('npm run fix-images', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erreur:', error)
    return
  }
  
  if (stderr) {
    console.error('⚠️ Avertissement:', stderr)
  }
  
  console.log('✅ Résultat:', stdout)
  console.log('🎉 Correction terminée!')
})
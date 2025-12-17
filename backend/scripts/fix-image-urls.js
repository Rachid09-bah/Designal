const mongoose = require('mongoose')
require('dotenv').config()

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  subcategory: String,
  style: String,
  status: String,
  featured: Boolean,
  client: String,
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  createdBy: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)

async function fixImageUrls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    const projects = await Project.find({})
    console.log(`Found ${projects.length} projects`)
    
    for (const project of projects) {
      let updated = false
      
      if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
          if (image.url && image.url.includes('localhost:5001')) {
            image.url = image.url.replace('http://localhost:5001', '')
            updated = true
          }
        })
      }
      
      if (updated) {
        await project.save()
        console.log(`Updated project: ${project.title}`)
      }
    }
    
    console.log('Image URLs fixed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

fixImageUrls()
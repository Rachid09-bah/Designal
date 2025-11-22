const express = require('express')
const { adminAuth } = require('../middleware/auth')
const { getDashboard, getUsers, updateUser, deleteUser, createAdmin } = require('../controllers/adminController')
const router = express.Router()

// Routes d'administration
router.get('/dashboard', adminAuth, getDashboard)
router.get('/users', adminAuth, getUsers)
router.put('/users/:id', adminAuth, updateUser)
router.delete('/users/:id', adminAuth, deleteUser)
router.post('/create-admin', adminAuth, createAdmin)

module.exports = router
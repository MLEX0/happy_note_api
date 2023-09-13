const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth.controller')
const upload = require('../middleware/upload')

router.post('/login', authController.login)
router.post('/signup', upload.single('image') ,authController.register)

module.exports = router
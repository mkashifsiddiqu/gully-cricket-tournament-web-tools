// * Importing to use express Router
import express from 'express'
const router = express.Router()
// * Imported Controller Files
import {
  authUser,
  registerUser,
} from '../controllers/userController.js'

router.route('/register').post(registerUser)
router.post('/register', registerUser)
router.post('/login', authUser)



export default router

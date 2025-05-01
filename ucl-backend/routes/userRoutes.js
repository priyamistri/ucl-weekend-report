import express from 'express';
import { GETALLUSERS, registerUser, UpdateStatus } from '../controllers/userController.js';
import { LoginUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/Login', LoginUser);
router.post('/Get_All_Users', GETALLUSERS);
router.post('/Update_User_Status', UpdateStatus);

export default router;

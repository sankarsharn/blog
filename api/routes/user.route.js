import express from 'express';
import { test, updateUser, deleteUser, signout, getUsers, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, upload.single('profilePicture'), updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers); // This should come first
router.get('/:userId', verifyToken, getUser);   // This should come after

export default router;
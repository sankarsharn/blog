import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { create, getposts, deletePost, updatePost } from '../controllers/post.controller.js';
import {upload} from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/create', verifyToken, upload.single('image'), create);
router.get('/getposts', getposts);
router.delete('/deletePost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);

export default router
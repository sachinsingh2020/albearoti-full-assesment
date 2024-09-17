import express from 'express';
import singleUpload from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { createBlog, deleteBlog, getBlog, getBlogs } from '../controllers/blogController.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, singleUpload, createBlog);

router.route("/blogs").get(getBlogs);

router.route("/delete/:id").delete(deleteBlog);

router.route("/get/:id").get(getBlog);

export default router;

// sachin 
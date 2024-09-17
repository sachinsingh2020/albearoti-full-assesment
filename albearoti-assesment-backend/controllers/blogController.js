import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import ApiFeatures from "../utils/apiFeatures.js";


export const createBlog = catchAsyncError(async (req, res, next) => {
    const { blogTitle, blogContent } = req.body;

    if (!blogTitle || !blogContent) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const file = req.file;

    if (!file) {
        return next(new ErrorHandler('Please upload an image file', 400));
    }

    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);


    const blog = await Blog.create({
        blogTitle,
        blogContent,
        blogImage: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    })


    res.status(201).json({
        success: true,
        message: "Blog created successfully",
    });
});

export const getBlogs = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const blogsCount = await Blog.countDocuments();
    const apiFeatures = new ApiFeatures(Blog.find(), req.query)
        .search()
        .filter()

    let blogs = await apiFeatures.query;
    let filteredBlogsCount = blogs.length;
    const reversedBlogs = blogs.reverse();

    // Pagination 
    let page = Number(req.query.page) || 1;
    let startIndex = (page - 1) * resultPerPage;
    let endIndex = page * resultPerPage;
    const paginatedBlogs = reversedBlogs.slice(startIndex, endIndex);

    res.status(200).json({
        success: true,
        blogs: paginatedBlogs,
        blogsCount,
        resultPerPage,
        filteredBlogsCount,
    });
});

export const getBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
    }

    await cloudinary.v2.uploader.destroy(blog.blogImage.public_id);

    await Blog.findByIdAndDelete(req.params.id);


    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
});
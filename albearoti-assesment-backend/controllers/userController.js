import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';


export const register = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    console.log({ firstName, lastName, email, password });
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler('All fields are required', 400));
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already exists", 409));
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        password,
    });

    sendToken(res, user, "Registered Successfully", 201);

});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // console.log({ email, password });

    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Password", 401));

    sendToken(res, user, `Welcome back, ${user.firstName} ${user.lastName}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
            isAuthenticated: false,
        });
});

export const isUserLoggedIn = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(200).json({
            success: true,
            message: "User is not logged in",
            isAuthenticated: false,
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById(decoded._id);
    let isAuthenticated = false;
    if (user) {
        isAuthenticated = true;
    }

    res.status(200).json({
        success: true,
        user,
        isAuthenticated,
        message: "User is logged in",
    });
});





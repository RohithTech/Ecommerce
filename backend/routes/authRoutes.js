import Logins from "../models/LoginSchema.mjs";
import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import {loginController} from '../controllers/authController.js'
import {signUpController} from '../controllers/authController.js'
import {updatePassword} from '../controllers/authController.js'
import {getUser} from '../controllers/authController.js'
import authMiddleware from "../middleware/authMiddleware.js"
import { sendOtpController } from "../controllers/authController.js";
import {productsAdd, productsget} from '../controllers/productController.js'
import upload from '../multer/imageStorage.js'

const router = Router();

// Authentication routes
router.post("/", loginController);
router.post("/login", signUpController);
router.patch('/login', updatePassword)
router.post('/auth/otp',sendOtpController)
router.get('/user', getUser);

// Products routes
router.post('/products',authMiddleware,upload.single('image'),productsAdd)
router.get('/products',productsget)

export default router;
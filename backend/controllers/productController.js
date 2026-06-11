import Product from "../models/Products.mjs"
import 'dotenv/config'
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'
// import {products} from '../data/products.js'


const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  }
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const productsAdd = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required"
      });
    }

    const imageName = randomImageName();
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 800, width: 1000, fit: "contain" })
      .toBuffer();

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const imageURL = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${imageName}`;

    const data = {
      image: imageURL,
      images: [imageURL],
      ...req.body
    };

    const {
      name,
      slug,
      image,
      images,
      description,
      price,
      originalPrice,
      rating,
      reviewCount,
      stock,
      category,
      brand,
      status,
      colors,
      sizes,
      isTrending,
      isBestSeller,
      isFlashSale
    } = data;

    const parsedPrice = Number(price);
    const parsedOriginalPrice = originalPrice === "" || originalPrice === undefined || originalPrice === null
      ? null
      : Number(originalPrice);
    const parsedRating = rating === "" || rating === undefined || rating === null ? 0 : Number(rating);
    const parsedReviewCount = reviewCount === "" || reviewCount === undefined || reviewCount === null
      ? 0
      : Number(reviewCount);
    const parsedStock = Number(stock);

    const parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors;
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedImages = typeof images === "string" ? JSON.parse(images) : images;

    if (!name || !parsedPrice || !description || Number.isNaN(parsedStock) || parsedStock < 0 || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const finalSlug = slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct = await Product.create({
      name,
      slug: finalSlug,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      rating: parsedRating,
      reviewCount: parsedReviewCount,
      description,
      stock: parsedStock,
      category,
      brand: brand || "",
      status: status || "active",
      image,
      images: parsedImages || [image],
      colors: Array.isArray(parsedColors) ? parsedColors : [],
      sizes: Array.isArray(parsedSizes) ? parsedSizes : [],
      isTrending: Boolean(isTrending),
      isBestSeller: Boolean(isBestSeller),
      isFlashSale: Boolean(isFlashSale)
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully ✅",
      product: newProduct
    });

  } catch (error) {

    console.error("Product Add Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product"
    });

  }
};

export const productsget = async (req, res) =>{
  const products = await Product.find()
  return res.status(200).send(products)
}
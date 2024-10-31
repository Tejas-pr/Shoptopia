const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const User = require("../models/User");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const jwt = require("jsonwebtoken");
const authFetchUser = require("../middleware/authMiddleware");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
dotenv.config();

const userSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email().min(3).max(30),
  password: z
    .string()
    .min(3)
    .max(10)
    .refine(
      (val) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(val),
      {
        message:
          "Password must contain lowercase, uppercase, and special character.",
      }
    ),
});

router.use("/images", express.static(path.join(__dirname, "uploads/images")));

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) =>
      cb(null, `images/${Date.now()}_${file.originalname}`),
  }),
});

// Route to upload an image to AWS
router.post("/upload", upload.single("product"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: 0,
        message: "Image upload failed. Please try again.",
      });
    }

    const listParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: "images/",
    };

    const listedObjects = await s3.send(new ListObjectsV2Command(listParams));

    const imageCount = listedObjects.Contents
      ? listedObjects.Contents.length
      : 0;

    if (imageCount >= 100) {
      return res.status(400).json({
        success: 0,
        message: "Upload limit reached. Delete images first.",
      });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: req.file.key,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));

      return res.status(400).json({
        success: 0,
        message: "Image size should be less than 2 MB.",
      });
    }

    res.json({
      success: 1,
      image_url: req.file.location,
    });
  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).json({
      success: 0,
      message: "An error occurred during image upload. Please try again later.",
    });
  }
});

// Route to add a new product
router.post("/add-product", async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 }).limit(1);
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await newProduct.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Route to remove a product
router.post("/remove-product", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: `Product with ID ${req.body.id} removed`,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    return handleError(res, "Failed to remove product");
  }
});

// Route to get all products
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
});

// User Register
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const parsedData = userSchema.safeParse({
      username,
      email,
      password,
    });

    if (!parsedData.success) {
      const errorMessage = parsedData.error;
      return res.status(400).json({ success: false, message: errorMessage });
    }
    const {
      username: validUsername,
      email: validEmail,
      password: validPassword,
    } = parsedData.data;

    const saltValue = Number(process.env.SALT_ROUNDS) || 5;
    const hashPass = await bcrypt.hash(validPassword, saltValue);

    const userInDb = await User.findOne({ email: validEmail });
    if (userInDb) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      name: validUsername,
      email: validEmail,
      password: hashPass,
      cartData: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ success: true, token: token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.json({ success: true, token: token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
});

// Latest Products
router.get("/newcollection", async (req, res) => {
  try {
    const product = await Product.find({});
    const newcollection = product.slice(1).slice(-8);
    res.send(newcollection);
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch products",
    });
  }
});

//Popular products
router.get("/popular-products", async (req, res) => {
  try {
    const product = await Product.find({ category: "men" });
    const popularProducts = product.slice(0, 4);
    res.send(popularProducts);
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch products",
    });
  }
});

// Add to cart
router.post("/addtocart", authFetchUser, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { [`cartData.${req.body.itemId}`]: 1 } },
      { new: true }
    );
    res.json({ message: "Added to cart" });
  } catch (e) {
    console.error("Error adding to cart:", e);
    return handleError(res, "Failed to add to cart");
  }
});

// Remove from cart
router.post("/removefromcart", authFetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });

    if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.itemId] -= 1;
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    return res.json({ message: "removed from cart" });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Failed to remove from cart",
    });
  }
});

// get cart data
router.post("/getcart", authFetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    return res.json(userData.cartData);
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Failed to get cart data",
    });
  }
});

module.exports = router;

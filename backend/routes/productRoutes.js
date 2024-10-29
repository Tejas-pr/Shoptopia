const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const authFetchUser = require("../middleware/authMiddleware");

router.use("/images", express.static(path.join(__dirname, "uploads/images")));
// Set up the image storage engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Route to upload images
router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
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
    if (deletedProduct) {
      res.json({
        success: true,
        message: `Product with ID ${req.body.id} removed`,
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove product" });
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
    const userInDb = await User.findOne({ email: req.body.email });
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
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const passMatch = req.body.password === user.password;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
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
    // console.log(newcollection);
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
    const userData = await User.findOne({ _id: req.user.id });

    userData.cartData[req.body.itemId] += 1;
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    return res.json({ message: "added to cart" });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Failed to add to cart",
    });
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
    console.log("get cart");
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

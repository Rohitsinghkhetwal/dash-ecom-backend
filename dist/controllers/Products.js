"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.placeOrder = exports.verifyOtp = exports.sendOtp = exports.getProductsAccordingTags = exports.getAllProducts = exports.AddProducts = void 0;
const db_1 = require("../db");
const Nodemailer_1 = require("../EmailService/Nodemailer");
//-------------------API for creating the products in the database----------------------------------------
const AddProducts = async (req, res) => {
    const { imageUrl, name, type, brand, rating, price, oldPrice, weight, dietType, tag } = req.body;
    try {
        if (!imageUrl || !type || !brand || !name || !rating || !price || !oldPrice || !weight || !dietType || !tag) {
            return res.status(401).json({ error: "Fields are required " });
        }
        const query = `
      INSERT INTO products 
      (image_url,name, type, brand, rating, price, old_price, weight, diet_type, tag)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
        const values = [
            imageUrl,
            name,
            type,
            brand,
            rating,
            price,
            oldPrice,
            weight,
            dietType,
            tag
        ];
        const result = await db_1.pool.query(query, values);
        res.status(201).json({
            message: "Product stored successfully",
            product: result.rows[0],
        });
    }
    catch (err) {
        console.log("Something went wrong while Adding the product", err);
        res.status(500).json({ messsage: "Product not created " });
    }
};
exports.AddProducts = AddProducts;
//--------------------Getting all Products available in the database ---------------------------------------------
const getAllProducts = async (req, res) => {
    try {
        const result = await db_1.pool.query("SELECT * FROM products ORDER BY id DESC");
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log("Something went wrong while getting the products ", err);
        return res.status(400).json({ error: "Internal Server Error " });
    }
};
exports.getAllProducts = getAllProducts;
//-----------------------getting the data according the tags------------------------------
const getProductsAccordingTags = async (req, res) => {
    try {
        const result = await db_1.pool.query("SELECT * FROM products");
        const products = result.rows;
        //after filtering the products sending the json to frontend
        const popularProducts = products.filter(p => p.tag === "popular-products");
        const dealsOfTheDay = products.filter(p => p.tag === "Deals-of-the-day");
        const bestoftheDay = products.filter(p => p.tag === "Daily-Best-Sells");
        return res.status(200).json({
            popularProducts,
            dealsOfTheDay,
            bestoftheDay
        });
    }
    catch (err) {
        console.log("Something went wrong while getting the Products ", err);
        return res.status(400).json({ error: "Error on getting the products here ." });
    }
};
exports.getProductsAccordingTags = getProductsAccordingTags;
// ---------------API for sending the otp to the user -----------------------
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await db_1.pool.query(`
      INSERT INTO email_verification (email, otp , is_verified)
      VALUES ($1, $2, false)
      ON CONFLICT (email)
      DO UPDATE SET otp = EXCLUDED.otp, is_verified = false;
      
      `, [email, otp]);
        await (0, Nodemailer_1.sendMail)(email, "Your OTP code ", `Your Otp is : ${otp}`);
        return res.status(200).json({ message: "OTP sent successfully " });
    }
    catch (err) {
        return res.status(500).json({ error: "Server error while sending the mail" });
    }
};
exports.sendOtp = sendOtp;
//----------------API for verifying the otp--------------------------
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await db_1.pool.query("SELECT otp FROM email_verification WHERE email = $1", [email]);
        if (result.rowCount === 0) {
            return res.status(400).json({ error: "Email not found " });
        }
        if (result.rows[0].otp != otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        await db_1.pool.query("UPDATE email_verification SET is_verified = true, verified_at = NOW() WHERE email = $1", [email]);
        return res.status(200).json({ message: "OTP Verified success ." });
    }
    catch (err) {
        console.log("Something went wrong while verifying the otp ", err);
        return res.status(500).json({ error: "Internal server error " });
    }
};
exports.verifyOtp = verifyOtp;
//-------------API for placing the order -----------------------------
const placeOrder = async (req, res) => {
    const { email, firstName, lastName, address, city, country, paymentMethod, items, postCode, regionState } = req.body;
    try {
        const verifyCheck = await db_1.pool.query("SELECT is_verified FROM email_verification WHERE email = $1", [email]);
        if (!verifyCheck.rows[0]?.is_verified) {
            return res.status(400).json({ error: "Email not verified" });
        }
        const orderResult = await db_1.pool.query(`INSERT INTO orders 
     (email, first_name, last_name, address, city, country, payment_method, post_code, region_state)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING id`, [
            email,
            firstName,
            lastName,
            address,
            city,
            country,
            paymentMethod,
            postCode,
            regionState
        ]);
        const orderId = orderResult.rows[0].id;
        for (let item of items) {
            await db_1.pool.query(`INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES ($1,$2,$3,$4)`, [orderId, item.id, item.quantity, item.price]);
        }
        const summary = items.map((item) => `• ${item.name} - $${item.price}`);
        (0, Nodemailer_1.sendMail)(email, "Order Placed Successfully! 🎉", `We're excited to let you know that your order  has been successfully placed.
      We will notify you once your items are shipped.

      Order Summary 
      ${summary}
                 
     
     Thank you for shopping with us!`);
        return res.status(200).json({ message: "Order plaed successfully !" });
    }
    catch (err) {
        console.log("Something went wrong while placing the order ", err);
        return res.status(400).json({ error: "Internal server error while placing the order ! " });
    }
};
exports.placeOrder = placeOrder;
// ------------get the productby Id API ----------------------------
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db_1.pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        return res.status(200).json({ product: response.rows[0] });
    }
    catch (err) {
        console.log("Something went wrong while getting the products", err);
        return res.status(500).json({ message: "Internal server error " });
    }
};
exports.getProductById = getProductById;

import express from "express";
import { AddProducts , getAllProducts, getProductsAccordingTags, sendOtp,verifyOtp, placeOrder ,getProductById } from "../controllers/Products"

const router = express.Router();


router.post("/create-product", AddProducts );
router.get("/getAll", getAllProducts);
router.get("/get-products", getProductsAccordingTags);
router.post('/send-otp', sendOtp)
router.post("/verify", verifyOtp)
router.post("/place-order",placeOrder)
router.get("/product/:id", getProductById)

export default router;
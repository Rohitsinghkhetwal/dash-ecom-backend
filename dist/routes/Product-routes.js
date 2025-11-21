"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Products_1 = require("../controllers/Products");
const router = express_1.default.Router();
router.post("/create-product", Products_1.AddProducts);
router.get("/getAll", Products_1.getAllProducts);
router.get("/get-products", Products_1.getProductsAccordingTags);
router.post('/send-otp', Products_1.sendOtp);
router.post("/verify", Products_1.verifyOtp);
router.post("/place-order", Products_1.placeOrder);
router.get("/product/:id", Products_1.getProductById);
exports.default = router;

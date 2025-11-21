"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const Product_routes_1 = __importDefault(require("./routes/Product-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/test", (req, res) => {
    res.json("Hey there !");
});
//function for testing the postgresql database 
async function testDBConnection() {
    try {
        await db_1.pool.query("SELECT 1");
        console.log("Database connected successfully!");
    }
    catch (error) {
        console.error(" Database connection failed:", error.message);
    }
}
app.use("/api", Product_routes_1.default);
app.listen(PORT, async () => {
    console.log(`Server running at ${PORT}`);
    await testDBConnection();
});

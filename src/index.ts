import express from "express"
import { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { pool } from "./db"
import ProductRoutes from "./routes/Product-routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())


app.get("/test", (req:Request, res: Response) => {
  res.json("Hey there !")
})

//function for testing the postgresql database 

async function testDBConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(" Database connection failed:", (error as Error).message);
  }
}

app.use("/api", ProductRoutes)


app.listen(PORT, async () => { 
  console.log(`Server running at ${PORT}`)
  await testDBConnection();
})


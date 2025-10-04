import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.post("/api/chat", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: req.body.messages,
            }),
        })

        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
})

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"))
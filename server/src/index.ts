import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import apiRoutes from "./routes/api";

config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", apiRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Not Found",
        path: req.path,
        method: req.method
    });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📝 API health available at http://localhost:${port}/api/health`);
});

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

// Example API endpoint
router.get("/hello", (req: Request, res: Response) => {
    res.json({
        message: "Hello from server!",
        timestamp: new Date().toISOString()
    });
});

// Example POST endpoint
router.post("/data", (req: Request, res: Response) => {
    const { name, value } = req.body;

    if (!name || !value) {
        return res.status(400).json({
            error: "Missing required fields: name, value"
        });
    }

    res.status(201).json({
        id: Math.random().toString(36).substr(2, 9),
        name,
        value,
        created_at: new Date().toISOString()
    });
});

// Example GET with ID
router.get("/data/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        id,
        name: "Sample Data",
        value: "Sample Value",
        retrieved_at: new Date().toISOString()
    });
});

export default router;

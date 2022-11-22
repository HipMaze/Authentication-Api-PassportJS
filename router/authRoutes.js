import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	return res.status(200).json({ success: true, data });
});

router.post("/register", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	return res.status(200).json({ success: true, data: null });
});

export default router;

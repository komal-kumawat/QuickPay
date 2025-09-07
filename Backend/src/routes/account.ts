import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware";
import { Account } from "../db";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ balance: account.balance });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { amount, to } = req.body;

    if (!amount || !to) {
      return res
        .status(400)
        .json({ message: "Amount and recipient are required" });
    }

    const fromAccount = await Account.findOne({ userId: req.userId });
    if (!fromAccount || fromAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
      return res.status(400).json({ message: "Invalid recipient account" });
    }

    // Update balances
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    );
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    res.json({ message: "Transfer successful" });
  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ message: "Transfer failed", error: err });
  }
});

export default router;

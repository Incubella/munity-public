// src/models/bannedWallet.js

import mongoose, { model, models, Schema } from "mongoose";

const BannedWalletSchema = new Schema({
  walletId: { type: String, required: true, unique: true },
});

module.exports =
  models.BannedWallet || model("BannedWallet", BannedWalletSchema);

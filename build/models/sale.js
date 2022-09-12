"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const saleProductSchema = new mongoose_1.default.Schema({
    product_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
}, { _id: false });
const saleSchema = new mongoose_1.default.Schema({
    total: {
        type: Number,
        required: true,
    },
    products: {
        type: [saleProductSchema],
        required: true,
    },
}, { timestamps: { createdAt: true, updatedAt: false } });
saleSchema.statics.build = (attr) => {
    return new Sale(attr);
};
const Sale = mongoose_1.default.model('Sale', saleSchema);
exports.Sale = Sale;

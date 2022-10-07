"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreaseStock = exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getProducts = exports.addProduct = void 0;
const product_1 = require("../models/product");
function addProduct(attr) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = product_1.Product.build(attr);
        yield product.save();
        return product;
    });
}
exports.addProduct = addProduct;
function getProducts(ids = []) {
    return __awaiter(this, void 0, void 0, function* () {
        let products;
        if (ids.length == 0) {
            products = yield product_1.Product.find();
        }
        else {
            products = yield product_1.Product.find({ '_id': { $in: ids } });
        }
        return products;
    });
}
exports.getProducts = getProducts;
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findById(id);
        if (product == null) {
            throw { message: `document with id = ${id} not found` };
        }
        return product;
    });
}
exports.getProductById = getProductById;
function updateProductById(id, attr) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findByIdAndUpdate(id, attr, { new: true });
        if (product == null) {
            throw { message: `document with id = ${id} not found` };
        }
        return product;
    });
}
exports.updateProductById = updateProductById;
function deleteProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findByIdAndDelete(id);
        if (product == null) {
            throw { message: `document with id = ${id} not found` };
        }
        return product;
    });
}
exports.deleteProductById = deleteProductById;
function decreaseStock(id, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findById(id);
        product.stock -= amount;
        product.save();
        return product;
    });
}
exports.decreaseStock = decreaseStock;

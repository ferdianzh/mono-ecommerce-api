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
exports.SaleServices = void 0;
const sale_1 = require("../models/sale");
const product_services_1 = require("./product.services");
const productServices = new product_services_1.ProductServices();
class SaleServices {
    addSale(attr) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            const productIds = attr.map(product => product.product_id);
            const refProducts = yield productServices.getProducts(productIds);
            const products = attr.map(product => {
                const refProduct = refProducts.find(refProduct => refProduct._id == product.product_id);
                if (refProduct.stock < product.amount) {
                    throw { message: `insufficient ${refProduct.name} stock, only ${refProduct.stock}` };
                }
                const subtotal = refProduct.price * product.amount;
                total += subtotal;
                return Object.assign(Object.assign({}, product), { subtotal });
            });
            products.forEach(({ product_id, amount }) => __awaiter(this, void 0, void 0, function* () {
                yield productServices.decreaseStock(product_id, amount);
            }));
            const request = { total, products };
            const sale = sale_1.Sale.build(request);
            yield sale.save();
            return request;
        });
    }
    getSales() {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield sale_1.Sale.find();
            return sales;
        });
    }
    getSaleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield sale_1.Sale.findById(id);
            if (sale == null) {
                throw { message: `document with id = ${id} not found` };
            }
            return sale;
        });
    }
    deleteSaleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield sale_1.Sale.findByIdAndDelete(id);
            if (sale == null) {
                throw { message: `document with id = ${id} not found` };
            }
            return sale;
        });
    }
}
exports.SaleServices = SaleServices;

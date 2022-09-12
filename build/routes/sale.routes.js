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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleRouter = void 0;
const express_1 = __importDefault(require("express"));
const sale_services_1 = require("../services/sale.services");
const product_services_1 = require("../services/product.services");
const router = express_1.default.Router();
exports.saleRouter = router;
const saleServices = new sale_services_1.SaleServices();
const productServices = new product_services_1.ProductServices();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        const sale = yield saleServices.addSale(products);
        return res.status(201).send({
            status: 'success',
            data: sale,
        });
    }
    catch (e) {
        return res.status(422).send({
            status: 'fail',
            message: e.message,
        });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield saleServices.getSales();
    return res.status(200).send({
        status: 'success',
        data: sales,
    });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield saleServices.getSaleById(req.params.id);
        return res.status(200).send({
            status: 'success',
            data: sale,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: e.message
        });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield saleServices.deleteSaleById(req.params.id);
        return res.status(200).send({
            status: 'success',
            data: sale,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: e.message,
        });
    }
}));

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
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const product_services_1 = require("../services/product.services");
const router = express_1.default.Router();
exports.productRouter = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description = '', price, stock } = req.body;
        const product = yield (0, product_services_1.addProduct)({
            name, description, price, stock
        });
        return res.status(201).send({
            status: 'success',
            data: product,
        });
    }
    catch (e) {
        if (e instanceof mongoose_1.Error.ValidationError) {
            return res.status(422).send({
                status: 'fail',
                message: e.message,
            });
        }
        return res.status(500).send({
            status: 'fail',
            message: e.message,
        });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_services_1.getProducts)();
    return res.status(200).send(products);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_services_1.getProductById)(req.params.id);
        return res.status(200).send({
            status: 'success',
            data: product,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: `document with id = ${req.params.id} not found`,
        });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_services_1.updateProductById)(req.params.id, req.body);
        return res.status(200).send({
            status: 'success',
            data: product,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: e.message,
        });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_services_1.deleteProductById)(req.params.id);
        return res.status(200).send({
            status: 'success',
            data: product,
        });
    }
    catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: e.message,
        });
    }
}));

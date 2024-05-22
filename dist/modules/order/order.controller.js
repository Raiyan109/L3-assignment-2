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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDB({ email, productId, price, quantity });
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.email || '';
        const query = {
            email: { $regex: search, $options: 'i' }
        };
        const result = yield order_service_1.OrderServices.getAllOrderFromDB(query);
        const message = search
            ? `Orders fetched successfully for user email!`
            : "Orders fetched successfully!";
        res.status(200).json({
            success: true,
            message: message,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
        console.log(error);
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders
};

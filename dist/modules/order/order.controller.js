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
const order_validation_1 = require("./order.validation");
const product_model_1 = require("../product/product.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        // Joi validation check
        const { error, value } = order_validation_1.orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        // Check if the product exists in the database
        const product = yield product_model_1.ProductModel.findOne({ _id: productId });
        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found',
            });
        }
        // Check if the product has enough quantity in stock
        if (product.inventory.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        // Reduce the quantity in stock
        product.inventory.quantity -= quantity;
        // Update inStock status
        product.inventory.inStock = product.inventory.quantity > 0;
        // Save the updated product
        yield product.save();
        // Creating order
        const result = yield order_service_1.OrderServices.createOrderIntoDB(value);
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
        let query = {};
        // Only add the email search criteria if a search string is provided
        if (search) {
            query = {
                email: { $regex: search, $options: 'i' }
            };
        }
        const result = yield order_service_1.OrderServices.getAllOrderFromDB(query);
        // check if any orders found
        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order not found',
            });
        }
        // message dynamically
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

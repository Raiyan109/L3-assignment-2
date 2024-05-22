import { Request, Response } from "express"
import { OrderServices } from "./order.service"
import { orderSchema } from "./order.validation";
import { ProductServices } from "../product/product.service";
import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { email, productId, price, quantity } = req.body

        // check if the productId is not in the database
        const product = await ProductModel.findOne({ _id: productId })
        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Joi validation check
        const { error, value } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // Creating order
        const result = await OrderServices.createOrderIntoDB(value)
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        })
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const search = req.query.email as string || ''
        let query = {};

        // Only add the email search criteria if a search string is provided
        if (search) {
            query = {
                email: { $regex: search, $options: 'i' }
            };
        }

        const result = await OrderServices.getAllOrderFromDB(query)

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
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        })
        console.log(error);

    }
}

export const OrderControllers = {
    createOrder,
    getAllOrders
}
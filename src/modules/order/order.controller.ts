import { Request, Response } from "express"
import { OrderServices } from "./order.service"
import { orderSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { error, value } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
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
        const query = {
            email: { $regex: search, $options: 'i' }
        }
        const result = await OrderServices.getAllOrderFromDB(query)

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
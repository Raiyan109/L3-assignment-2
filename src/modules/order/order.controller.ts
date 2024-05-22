import { Request, Response } from "express"
import { OrderServices } from "./order.service"

const createOrder = async (req: Request, res: Response) => {
    try {
        const { email, productId, price, quantity } = req.body

        const result = await OrderServices.createOrderIntoDB({ email, productId, price, quantity })

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        })
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const search = req.query.searchTerm as string || ''
        const query = {
            name: { $regex: search, $options: 'i' }
        }
        const result = await OrderServices.getAllOrderFromDB()

        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
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
import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, tags, variants, inventory } = req.body
        console.log(name, description, price, category, tags, variants, inventory);

        const result = await ProductServices.createProductIntoDB({ name, description, price, category, tags, variants, inventory })

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
        const result = await ProductServices.getAllProductFromDB()

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
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const result = await ProductServices.getSingleProductFromDB(productId)

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

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct
}
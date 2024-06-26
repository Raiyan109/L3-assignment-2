import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        // Validating the request body before proceeding with db operations
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await ProductServices.createProductIntoDB(value)

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
        const result = await ProductServices.getAllProductFromDB(query)

        const message = search ?
            `Products matching search term '${search}' fetched successfully!` :
            'Product fetched successfully!'

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
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const result = await ProductServices.getSingleProductFromDB(productId)
        console.log(result);


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


const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const { name, description, price, category, tags, variants, inventory } = req.body
        const result = await ProductServices.updateProductIntoDB(productId, {
            name, description, price, category, tags, variants, inventory
        })
        console.log(result);


        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
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

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const result = await ProductServices.deleteProductFromDB(productId)

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
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
    getSingleProduct,
    updateProduct,
    deleteProduct
}
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";


const createProductIntoDB = async (product: Product) => {
    const result = await ProductModel.create(product)
    return result
}
const getAllProductFromDB = async () => {
    const result = await ProductModel.find()
    return result
}
const getSingleProductFromDB = async (id: string) => {
    const result = await ProductModel.findById(id)
    return result
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB
}
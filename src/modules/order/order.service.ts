import { FilterQuery } from "mongoose"
import { Order } from "./order.interface"
import { OrderModel } from "./order.model"

const createOrderIntoDB = async (order: Order) => {
    const result = await OrderModel.create(order)
    return result
}

const getAllOrderFromDB = async (query: FilterQuery<Order>) => {
    const result = await OrderModel.find(query)
    return result
}

export const OrderServices = {
    createOrderIntoDB,
    getAllOrderFromDB
}
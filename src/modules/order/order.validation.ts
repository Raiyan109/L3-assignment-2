import Joi from "joi";

const orderSchema = Joi.object({
    email: Joi.string().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),

})

export { orderSchema };
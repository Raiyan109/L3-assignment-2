import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from "./modules/product/product.route";
import { OrderRoutes } from './modules/order/order.route';

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)


// Not found route 
app.get('*', function (req: Request, res: Response) {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

export default app
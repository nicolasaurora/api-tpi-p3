import express from 'express';
import "./models/associations.js";

import { PORT } from './config/config.js';
import { sequelize } from './config/db.js';
import cors from "cors";

import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';

const app = express();

try {

    await sequelize.authenticate();
    await sequelize.sync();

    app.use(express.json());
    
    app.use(cors({
        origin: "http://localhost:5173",
    }));
    
    app.use(userRoutes, productRoutes, purchaseOrderRoutes);

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    });
    
} catch (error) {
    console.log(`Hubo un error en la inicialización`, error);
}





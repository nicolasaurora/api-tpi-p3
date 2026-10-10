import express from 'express';
import "./models/associations.js";

import { PORT } from './config/config.js';
import userRoutes from './routes/user.routes.js';
import { sequelize } from './config/db.js';

const app = express();

try {

    await sequelize.authenticate();
    await sequelize.sync()

    app.use(userRoutes);

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    });
    
} catch (error) {
    console.log(`Hubo un error en la inicialización`, error);
}





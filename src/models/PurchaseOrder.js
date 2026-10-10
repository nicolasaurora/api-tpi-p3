import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PurchaseOrder = sequelize.define("orden_de_compra", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id",
        },
    },
    total: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
});
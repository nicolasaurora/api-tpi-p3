import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PurchaseOrder = sequelize.define("purchase_order", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
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
}, {
    tableName: "purchase_orders",
});

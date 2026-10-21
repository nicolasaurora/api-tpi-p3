import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const OrderDetails = sequelize.define("order_detail", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    purchaseOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "purchase_orders",
            key: "id",
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id",
        },
    },
},

// Prevents the same product from being included twice in one order.
{
  indexes: [
    {
      unique: true,
      fields: ["purchaseOrderId", "productId"],
    },
  ],
    tableName: "order_details",
});

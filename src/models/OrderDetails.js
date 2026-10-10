import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const OrderDetails = sequelize.define("detalle_orden", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    orden_de_compra_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orden_de_compras",
            key: "id",
        },
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "productos",
            key: "id",
        },
    },
},

// Para evitar que el mismo producto se repita dos veces en la misma orden.
{
  indexes: [
    {
      unique: true,
      fields: ["orden_de_compra_id", "producto_id"],
    },
  ],
});
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('superadmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
});
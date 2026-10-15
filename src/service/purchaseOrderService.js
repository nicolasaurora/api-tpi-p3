import { PurchaseOrder } from '../models/PurchaseOrder.js';
import { OrderDetails } from "../models/OrderDetails.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { sequelize } from "../config/db.js";


export const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll();

        res.json(purchaseOrders);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener ordenes de compra."
        });
    }
}

export const createPurchaseOrder = async (req, res) => {
  const { usuario_id, items } = req.body;

  if (!usuario_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "El usuario y al menos un producto son obligatorios.",
    });
  }

  let transaction;

  try {
    transaction = await sequelize.transaction();

    const user = await User.findByPk(usuario_id, { transaction });

    if (!user) {
      await transaction.rollback();

      return res.status(404).json({
        message: "El usuario no existe.",
      });
    }

    let total = 0;
    const details = [];

    for (const item of items) {
      const { producto_id, cantidad } = item;

      if (
        !producto_id ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0
      ) {
        await transaction.rollback();

        return res.status(400).json({
          message: "Cada producto debe tener un ID y una cantidad mayor a cero.",
        });
      }

      const product = await Product.findByPk(producto_id, {
        transaction,
      });

      if (!product) {
        await transaction.rollback();

        return res.status(404).json({
          message: `El producto con id ${producto_id} no existe.`,
        });
      }

      if (product.stock < cantidad) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Stock insuficiente para ${product.nombre}.`,
        });
      }

      total += Number(product.precio) * cantidad;

      details.push({
        product,
        cantidad,
      });
    }

    const purchaseOrder = await PurchaseOrder.create(
      {
        usuario_id,
        total: total.toFixed(2),
      },
      { transaction }
    );

    for (const detail of details) {
      await OrderDetails.create(
        {
          orden_de_compra_id: purchaseOrder.id,
          producto_id: detail.product.id,
          cantidad: detail.cantidad,
          precio_unitario: detail.product.precio,
        },
        { transaction }
      );

      await detail.product.update(
        {
          stock: detail.product.stock - detail.cantidad,
        },
        { transaction }
      );
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Orden de compra creada correctamente.",
      orden: purchaseOrder,
    });
    
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    return res.status(500).json({
      message: "Error al crear la orden de compra.",
    });
  }

}
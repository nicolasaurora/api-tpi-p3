import { PurchaseOrder } from '../models/PurchaseOrder.js';
import { OrderDetails } from "../models/OrderDetails.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { sequelize } from "../config/db.js";


export const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll({
          include: [
            {
              model: User,
              as: "user",
              attributes: ["firstName", "lastName"],
            },
          ],
        });

        res.json(purchaseOrders);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener ordenes de compra."
        });
    }
}

export const getMyPurchaseOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "El token no contiene un usuario válido. Inicia sesión nuevamente."
      });
    }

    const orders = await PurchaseOrder.findAll({
      where: {
        userId
      }
    });

    return res.json(orders);
    
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener tus órdenes de compra."
    });
  }
};


export const getPurchaseOrder = async(req, res) => {
  try {
    const { id } = req.params;

    const purchaseOrder = await PurchaseOrder.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName"],
        },
        {
          model: OrderDetails,
          as: "orderDetails",
          attributes: ["quantity", "unitPrice"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "image", "category"],
            }  
          ],
        }
      ]
    });

    if(!purchaseOrder) {
      return res.status(404).send({
        message: "La orden de compra no existe."
      });
    }

    const isAdmin = req.user.role === "admin" || req.user.role === "superadmin";

    const isOwner = purchaseOrder.userId === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).send({
        message: "No tenés permiso para ver esta orden."
      });
    }

    res.json(purchaseOrder);

  } catch (error) {
    return res.status(500).send({
      message: "Error al obtener la orden de compra."
    });
  }
}


export const createPurchaseOrder = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "El usuario y al menos un producto son obligatorios.",
    });
  }

  let transaction;

  try {
    transaction = await sequelize.transaction();

    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      await transaction.rollback();

      return res.status(404).json({
        message: "El usuario no existe.",
      });
    }

    let total = 0;
    const details = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !Number.isInteger(quantity) || quantity <= 0) {

        await transaction.rollback();

        return res.status(400).json({
          message: "Cada producto debe tener un ID y una cantidad mayor a cero.",
        });
      }

      const product = await Product.findByPk(productId, {
        transaction,
      });

      if (!product) {
        await transaction.rollback();

        return res.status(404).json({
          message: `El producto con id ${productId} no existe.`,
        });
      }

      if (product.stock < quantity) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}.`,
        });
      }

      total += Number(product.price) * quantity;

      details.push({
        product,
        quantity,
      });
    }

    const purchaseOrder = await PurchaseOrder.create(
      {
        userId,
        total: total.toFixed(2),
      },
      { transaction }
    );

    for (const detail of details) {
      await OrderDetails.create(
        {
          purchaseOrderId: purchaseOrder.id,
          productId: detail.product.id,
          quantity: detail.quantity,
          unitPrice: detail.product.price,
        },
        { transaction }
      );

      await detail.product.update(
        {
          stock: detail.product.stock - detail.quantity,
        },
        { transaction }
      );
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Orden de compra creada correctamente.",
      order: purchaseOrder,
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



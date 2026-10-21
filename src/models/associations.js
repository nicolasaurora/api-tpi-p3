import { User } from "./User.js";
import { Product } from "./Product.js";
import { PurchaseOrder } from "./PurchaseOrder.js";
import { OrderDetails } from "./OrderDetails.js";

// Usuario 1 — N Orden de compra
User.hasMany(PurchaseOrder, {
  foreignKey: "userId",
  as: "purchaseOrders",
});

PurchaseOrder.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});



// Orden de compra 1 — N Detalle de orden
PurchaseOrder.hasMany(OrderDetails, {
  foreignKey: "purchaseOrderId",
  as: "orderDetails",
});

OrderDetails.belongsTo(PurchaseOrder, {
  foreignKey: "purchaseOrderId",
  as: "purchaseOrder",
});



// Producto 1 — N Detalle de orden
Product.hasMany(OrderDetails, {
  foreignKey: "productId",
  as: "orderDetails",
});

OrderDetails.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

import { User } from "./User.js";
import { Product } from "./Product.js";
import { PurchaseOrder } from "./PurchaseOrder.js";
import { OrderDetails } from "./OrderDetails.js";

// Usuario 1 — N Orden de compra
User.hasMany(PurchaseOrder, {
  foreignKey: "usuario_id",
});

PurchaseOrder.belongsTo(User, {
  foreignKey: "usuario_id",
});



// Orden de compra 1 — N Detalle de orden
PurchaseOrder.hasMany(OrderDetails, {
  foreignKey: "orden_de_compra_id",
});

OrderDetails.belongsTo(PurchaseOrder, {
  foreignKey: "orden_de_compra_id",
});



// Producto 1 — N Detalle de orden
Product.hasMany(OrderDetails, {
  foreignKey: "producto_id",
});

OrderDetails.belongsTo(Product, {
  foreignKey: "producto_id",
});
import { Product } from '../models/Product.js';

export const findProducts = async (req, res) => {
    const products = await Product.findAll();

    res.json(products);
};

export const findProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if(!product) {
        res.status(404).send({
            message: "Producto no encontrado."
        });
    }

    res.json(product);
};

export const createProduct = async (req, res) => {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio === undefined) {
        res.status(400).send({
            message: "El nombre y el precio son datos obligatorios."
        });
    }    
    
    const nombreLower = nombre.trim().toLowerCase();

    const existingNombre = await Product.findOne({
        where: { nombre: nombreLower }
    });

    if(existingNombre) {
        res.status(400).send( {
            message: "El producto ya existe."
        });
    }


    const newProduct = await Product.create({
        nombre,
        precio,
        stock
    });


    res.status(201).send({
        message: "Producto creado correctamente.",
        Producto: `${newProduct.nombre}`
    });
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id)
    const { nombre, precio, stock } = req.body;

    if(!product) {
        res.status(400).send({
            message: "El producto no existe."
        });
    }

    
    await product.update({
        nombre,
        precio,
        stock
    });

    res.status(200).send({
        message: `Producto actualizado: ${product.nombre}.`
    });

}

export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        res.status(400).send({
            message: "El producto no existe."
        });
    }

    await product.destroy();

    res.status(204).send({
        message: `Producto con id: ${id} eliminado.`
    });
}

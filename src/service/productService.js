import { Product } from '../models/Product.js';

export const findProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos." });
    }
};

export const findProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).send({
                message: "Producto no encontrado."
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto." });
    }
};

export const createProduct = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto." });
    }
}


export const updateProduct = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto." });
    }

}

export const deleteProduct = async(req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto." });
    }
}

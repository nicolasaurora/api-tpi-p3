import { Product } from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.json(products);
    } catch (error) {
        return res.status(500).json({
            message: `Error al otener productos. ${error}.`
        })
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({
                message: "Producto no encontrado."
            });
        }

        res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: `Error al otener el producto. ${error}.`
        })
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;

        if (!nombre || precio === undefined) {
            return res.status(400).json({
                message: "El nombre y el precio son datos obligatorios."
            });
        }    
        
        const nombreLower = nombre.trim().toLowerCase();

        const existingNombre = await Product.findOne({
            where: { nombre: nombreLower }
        });

        if(existingNombre) {
            return res.status(400).json( {
                message: "El producto ya existe."
            });
        }


        const newProduct = await Product.create({
            nombre,
            precio,
            stock
        });


        res.status(201).json({
            message: "Producto creado correctamente.",
            Producto: `${newProduct.nombre}`
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al crear el producto. ${error}.`
        })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id)
        const { nombre, precio, stock } = req.body;

        if(!product) {
            return res.status(400).json({
                message: "El producto no existe."
            });
        }

        
        await product.update({
            nombre,
            precio,
            stock
        });

        res.status(200).json({
            message: `Producto actualizado: ${product.nombre}.`
        });
    } catch (error) {
       return res.status(500).json({
            message: `Error al actualizar el producto. ${error}.`
        })
    }

}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
           return res.status(400).json({
                message: "El producto no existe."
            });
        }

        await product.destroy();

        res.status(200).json({
            message: `Producto con id: ${id} eliminado.`
        });
    } catch (error) {
       return res.status(500).json({
            message: `Error al eliminar producto. ${error}.`
        })
    }
}

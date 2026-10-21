import { Product } from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener productos."
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
            message: "Error al obtener el producto."
        })
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, image, category } = req.body;

        if (!name || price === undefined || !image || !category) {
            return res.status(400).json({
                message: "El nombre, precio, imagen y categoría son datos obligatorios."
            });
        }    
        
        const nameLower = name.trim().toLowerCase();
        const categoryLower = category.trim().toLowerCase();

        const existingProduct = await Product.findOne({
            where: { name: nameLower }
        });

        if(existingProduct) {
            return res.status(400).json( {
                message: "El producto ya existe."
            });
        }


        const newProduct = await Product.create({
            name: nameLower,
            price,
            stock,
            image,
            category: categoryLower,
        });


        res.status(201).json({
            message: "Producto creado correctamente.",
            product: `${newProduct.name}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el producto."
        });
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id)
        const { name, price, stock, image, category } = req.body;

        if(!product) {
            return res.status(400).json({
                message: "El producto no existe."
            });
        }

        
        await product.update({
            name,
            price,
            stock,
            image,
            category,
        });

        res.status(200).json({
            message: `Producto actualizado: ${product.name}.`
        });
    } catch (error) {
       return res.status(500).json({
            message: "Error al actualizar el producto."
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
            message: "Error al eliminar el producto."
        })
    }
}

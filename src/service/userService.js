import { User } from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json(users);
    } catch (error) {
        return res.status(500).send({ message: "Error al obtener usuarios." });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }

        res.json(user);
    } catch (error) {
        return res.status(500).send({ message: "Error al obtener el usuario." });
    }
}

export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        if (!nombre || !apellido || !email || !password ) {
           return res.status(400).send({ 
            message: "El nombre, apellido, email y password son datos obligatorios." 
            });
        }

        const emailLower = email.trim().toLowerCase();
        
        const existingUser = await User.findOne({
            where: { email: emailLower},
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El mail ya se encuentra registrado." 
            });
        }

        const newUser = await User.create( {
            nombre,
            apellido,
            email: emailLower,
            password
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            usuario: `${newUser.nombre}  ${newUser.apellido}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario." 
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, password} = req.body;

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({
                message: "El usuario no existe."
            });
        }

        await user.update({
            nombre,
            apellido,
            email,
            password
        });

        res.json(`Usuario actualizado: ${user.nombre} ${user.apellido}`);
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el usuario." });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(400).json({
                message: "El usuario no existe."
            });
        }
        await user.destroy();

        res.status(200).json({
            message: `Usuario con id: ${id} eliminado.`
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el usuario." });
    }
}

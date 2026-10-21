import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password ) {
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

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create( {
            firstName,
            lastName,
            email: emailLower,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            user: `${newUser.firstName} ${newUser.lastName}`
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
        const { firstName, lastName, email, password} = req.body;

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({
                message: "El usuario no existe."
            });
        }

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        await user.update({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        res.json(`Usuario actualizado: ${user.firstName} ${user.lastName}`);
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



export const loginUser = async (req,res) => {
    const { email, password } = req.body;

    const emailLower = email.trim().toLowerCase();

    const user = await User.findOne({
        where: { email: emailLower }
    });

    if(!user) {
        return res.status(401).send({
            message: "Usuario no existente."
        });
    }

    const coincide = await bcrypt.compare(password, user.password);

    if(!coincide) {
        return res.status(401).send({
            message: "Email y/o contraseña incorrecta."
        })
    }

    const secretKey = 'programacion-3-2026';

    const token = jwt.sign({ id: user.id, email, role: user.role }, secretKey, { expiresIn: '3h' });

    return res.json(token);

}

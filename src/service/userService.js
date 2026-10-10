import { User } from "../models/User.js";


export const findUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

export const findUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).send({ message: "Usuario no encontrado." });
    }

    res.json(user);
}

export const createUser = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password ) {
        res.status(400).send({ message: "El nombre, apellido, email y password son datos obligatorios." });
    }

    const newUser = await User.create( {
        nombre,
        apellido,
        email,
        password
    });

    res.status(201).json(`Usuario creado correctamente: ${newUser}`);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, password} = req.body;

    const user = await User.findByPk(id);

    await user.update({
        nombre,
        apellido,
        email,
        password
    });

    res.json(`Usuario actualizado: ${user}`);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    await user.destroy();

    res.send(`Usuario con id: ${id} eliminado.`);
}
const { response } = require("express");
const User = require("../Models/users");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const listUsers = await User.find();
        res.json(listUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un  error ha ocurrido" });

    }
};

// Buscar un usuario por nombre /getByName/:name
const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const userByName = await User.find({ name: name });
        res.json(userByName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un error ha ocurrido mientras se buscaba el usuario" });

    }
};

// Añadir un nuevo usuario
const addUser = async (req, res) => {
    try {
        const newUser = req.body;
        const findUser = await User.find({ name: newUser.name });

        if (findUser.length === 0) {
            // Si el usuario no está en la BD
            const user = new User(newUser);
            const createdUser = await user.save();
            res.status(201).json(createdUser);
        } else {
            res.status(200).json({ message: "el usuario ya existe" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un error ha ocurrido mientras se busca el usuario" });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);

        if (deleteUser) {
            res.status(201).json({ success: true, message: "usuario eliminado correctamente", data: deleteUser });
        } else {
            res.status(404).json({ success: false, message: "el id de usuario no existe" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un error ha ocurrido mientras se elimana el usuario" });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const userBody = req.body;
        const updateUser = await User.findByIdAndUpdate(id, userBody, { new: true });

        if (!updateUser) {
            res.status(404).json({ success: false, message: "el id de usuario no existe" });
        } else {
            res.json(updateUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un error ha ocurrido mientras se actualiza el usuario" });
    }
};

module.exports = { getUsers, getUserByName, addUser, deleteUser, updateUser };
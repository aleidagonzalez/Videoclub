const { response } = require("express");
const Movie = require("../Models/movies");

// Obtener todas las películas
const getMovies = async (req, res) => {
    try {
        const listMovies = await Movie.find();
        res.json(listMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ha ocurrido un error al obtener la Pelicula." });
    }
};

// Buscar una película por nombre /getByName/:name
const getMovieByName = async (req, res) => {
    try {
        const { name } = req.params;
        const movieByName = await Movie.find({ name: name });
        res.json(movieByName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Un error ha ocurrido mientras se obtiene la pelicula." });
    }
};

// Añadir una nueva película
const addMovie = async (req, res) => {
    try {
        const newMovie = req.body;
        const findMovie = await Movie.find({ name: newMovie.name });

        if (findMovie.length === 0) {
            // Si la película no está en la BD
            const movie = new Movie(newMovie);
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        } else {
            res.status(200).json({ message: "La pelicula ya existe." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ha ocurrido un error mientras se añade la pelicula." });
    }
};

// Eliminar una película
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMov = await Movie.findByIdAndDelete(id);

        if (deleteMov) {
            res.status(201).json({ success: true, message: "Pelicula eliminada con éxito.", data: deleteMov });
        } else {
            res.status(404).json({ success: false, message: "El  id de la película no existe." });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un  error ha ocurrido mientras se elimina la película." });

    }
};

// Actualizar una película
const updateMovie = async (req, res) => {
    try {
        const { id } = req.query;
        const movieBody = req.body;
        const updateMov = await Movie.findByIdAndUpdate(id, movieBody, { new: true });

        if (!updateMov) {
            res.status(404).json({ success: false, message: "el  id de la película no existe." });

        } else {
            res.json(updateMov);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "un error ha ocurrido mientras se actualiza la película." });

    }
};

module.exports = { getMovies, getMovieByName, addMovie, deleteMovie, updateMovie };
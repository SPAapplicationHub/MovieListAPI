const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Import middlewares
const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

// Get All Movies
router.get("/", [auth, viewer], async (req, res) => {
 try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}); 

//Get movie by id
router.get("/:id",[auth, viewer], getMovie, (req, res) => {
    res.json(res.movie);
});

// Create Movie(s)
router.post("/", [auth, editor], async (req, res) => {
    const movie = new Movie({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description
    });
    try {
      const newMovie = await movie.save();
      res.status(201).json({ newMovie });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

//Delete Movie By ID
router.delete(":id", [auth, admin], getMovie, async (req, res) => {
    try {
      await res.movie.deleteOne();
      res.json({ message: "Movie has been deleted"});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getMovie(req, res, next) {
    let movie;
    try {
      movie = await Movie.findOne({ id : req.params.id});
      if (movie == null) {
        return res.status(404).json({ message: "Cannot find the movie" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.movie = movie;
    next();
}


module.exports = router;
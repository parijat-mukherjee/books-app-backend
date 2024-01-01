import express from "express";
import Book from "../models/booksModel.js";

const router = express.Router();

//Post route to save a book to the database
router.post("/", async (req, res) => {
  try {
    if (!req.body.author || !req.body.title || !req.body.publishYear) {
      return res.status(400).send("Bad Request: Required fields missing...");
    }

    const newBook = {
      author: req.body.author,
      title: req.body.title,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Writing to MongoDB...");
  }
});

//Get route to get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Reading from MongoDB...");
  }
});

//Get route to get one book by id from database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Reading from MongoDB...");
  }
});

//Put route for updating a book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Bad Request: Required fields missing...");
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      console.log("Book not found...");
      return res.status(404).send("Book not found...");
    } else {
      const updatedBook = await Book.findById(id);
      res.status(200).send(updatedBook);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Updating To MongoDB...");
  }
});

//Delete a book using id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      console.log("Book not found...");
      return res.status(404).send("Book not found...");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Deleting From MongoDB...");
  }
});

export default router;

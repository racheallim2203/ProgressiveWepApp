const express = require("express");
const categoryCont = require("../controllers/category-controller");
const router = express.Router();

/**
 * Express router for handling category-related routes.
 * @namespace CategoryRouter
 */

// MIDDLEWARE IMPORTS
// Multer middleware used for handling multipart/form-data, primarily used for uploading files.
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({

  /**
   * Specifies the destination directory for uploaded files.
   * @function
   * @memberof CategoryRouter
   * @param {Object} request - The HTTP request object.
   * @param {Object} file - The uploaded file object.
   * @param {function} cb - The callback function to call when destination is determined.
   */

  destination: (request, file, cb) => {
    cb(null, 'Images/'); // Uploads will be stored in the 'Images/' folder
  },

   /**
   * Specifies the filename for uploaded files.
   * @function
   * @memberof CategoryRouter
   * @param {Object} request - The HTTP request object.
   * @param {Object} file - The uploaded file object.
   * @param {function} cb - The callback function to call when filename is determined.
   */

  filename: (request, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  }
});

// Multer middleware for handling file uploads.
const upload = multer({
  storage: storage
});

/**
 * Route to add a new category.
 * @name POST /add
 * @function
 * @memberof CategoryRouter
 * @inner
 * @param {string} path - Express route path.
 * @param {function} middleware - Middleware function for file upload.
 * @param {function} handler - Request handler function for adding a category.
 */

router.post("/add-category", upload.single('categoryImage'), categoryCont.addCategory);

/**
 * Route to list all categories.
 * @name GET /list
 * @function
 * @memberof CategoryRouter
 * @inner
 * @param {string} path - Express route path.
 * @param {function} handler - Request handler function for listing categories.
 */

router.get('/list', categoryCont.listCategories);

/**
 * Route to delete a category by ID.
 * @name DELETE /delete
 * @function
 * @memberof CategoryRouter
 * @inner
 * @param {string} path - Express route path.
 * @param {function} handler - Request handler function for deleting a category by ID.
 */

router.delete('/delete', categoryCont.deleteById);

/**
 * Route to update a category by ID.
 * @name PUT /update
 * @function
 * @memberof CategoryRouter
 * @inner
 * @param {string} path - Express route path.
 * @param {function} handler - Request handler function for updating a category by ID.
 */

router.put('/update', categoryCont.updateCategoryById);

/**
 * Module exports for the CategoryRouter.
 * @module CategoryRouter
 */

module.exports = router;
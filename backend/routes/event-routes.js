const express = require("express");
const eventCont = require("../controllers/event-controller");
const router = express.Router();


// MIDDLEWARE IMPORTS
// Multer middleware used for handling multipart/form-data, primarily used for uploading files.
const multer = require("multer");


/**
 * Represents a configuration object for multer storage.
 * @typedef {Object} MulterStorageConfig
 * @property {function} destination - The function to determine the storage destination.
 * @property {function} filename - The function to determine the file's name.
 */

/**
 * Represents a multer middleware instance for handling file uploads.
 * @typedef {Object} MulterMiddleware
 * @property {function} storage - The storage configuration for multer.
 */


// Multer Configuration 
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'Images/'); // Uploads will be stored in the 'Images/' folder
    },

    filename: (request, file, cb) => {
        cb(null, file.originalname); // Keep the original filename
    }
});

/**
 * Multer middleware for handling file uploads.
 * @type {MulterMiddleware}
 */

const upload = multer({
    storage: storage
});

/**
 * Express router POST endpoint for adding an event.
 * @name POST /add
 * @function
 * @memberof module:router/eventRouter
 * @param {string} path - The route path for adding an event.
 * @param {function} middleware - The multer middleware for handling file uploads.
 * @param {function} controller - The controller function for adding an event.
 */

router.post("/add-event", upload.single('eventImage'), eventCont.addEvent);


/**
 * Express router GET endpoint for listing events.
 * @name GET /list
 * @function
 * @memberof module:router/eventRouter
 * @param {string} path - The route path for listing events.
 * @param {function} controller - The controller function for listing events.
 */

router.get('/list', eventCont.listEvents);

/**
 * Express router DELETE endpoint for deleting an event by ID.
 * @name DELETE /delete
 * @function
 * @memberof module:router/eventRouter
 * @param {string} path - The route path for deleting an event.
 * @param {function} controller - The controller function for deleting an event by ID.
 */

router.delete('/delete', eventCont.deleteEventById);

/**
 * Express router PUT endpoint for updating an event by ID.
 * @name PUT /update
 * @function
 * @memberof module:router/eventRouter
 * @param {string} path - The route path for updating an event.
 * @param {function} controller - The controller function for updating an event by ID.
 */

router.put('/update', eventCont.updateEventById);


/**
 * Module exports for the event router.
 * @module router/eventRouter
 */

module.exports = router;
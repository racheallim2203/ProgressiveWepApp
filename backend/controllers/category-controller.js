const Category = require("../models/eventCategory");
const Event = require("../models/events");
const statsOperation = require('../models/operation');



/**
 * @typedef {object} CategoryObject
 * @property {string} categoryName - The name of the category.
 * @property {string} categoryDescription - The description of the category.
 * @property {string} categoryImage - The path to the category's image.
 */

/**
 * Controller module for handling category-related operations.
 * @namespace CategoryController
 */


module.exports = {

  /**
   * Add a new category.
   * @async
   * @function
   * @memberof CategoryController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  /*
  The async keyword indicates that the function is asynchronous, 
  meaning it can perform asynchronous operations using the await keyword.

  req: Represents the Express request object. This contains information about the HTTP request, 
  	 such as headers, query strings, and the body of the request.
  res: Represents the Express response object. This is used to send responses back to the client. 
  
  asynchronous function that creates a new category with the data from the req.body and req.file.path 
  for the image */

	addCategory: async function(req, res) {
		try {
		
        	let category = new Category({ 
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            categoryImage: req.file.path
        	});
	
			await category.save();
	
			// Increment the 'add count' in the operation model after a successful addition
			await statsOperation.incrementAddCount();
	
			// Send a response back to the client in JSON format
			res.json(category);

		} catch (error) {
			console.error("Failed to add category:", error);
			res.status(400).json({ error: "Invalid Data" });
		}
	},

  /**
   * List all categories with populated events.
   * @async
   * @function
   * @memberof CategoryController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  /*This is an asynchronous function that fetches and responds with all 
  categories and their populated event lists from the database.*/

  listCategories: async function (req, res) {
    try {
      // Fetch all categories from the database and populate the eventsList array
      // Essentially, for each category, the eventsList field, which likely contains references (IDs) to events, 
      // will be replaced with the actual event documents from the related collection.
      const categories = await Category.find().populate('eventsList');

      // Once the categories are fetched and their events populated, 
      // the function sends these populated categories back to the client as a JSON response
      res.json(categories);

    } catch (err) {
      //Try-catch block to handle errors gracefully and respond with a 400 status and an error message.
      res.status(400).json({
        error: 'Failed to fetch categories and events.'
      });
    }
  },

  /**
   * Delete a category by ID along with associated events.
   * @async
   * @function
   * @memberof CategoryController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  /*This function deletes a category and its associated events by ID, passed in req.body.categoryId. */
  deleteById: async function (req, res) {
    try {
      // Extracts the category ID from the request body.
      const categoryId = req.body.categoryId;

      // Find the category in the database with the provided ID.
      const category = await Category.findOne({
        categoryId: categoryId
      });

      if (!category) {
        return res.status(400).json({
          message: "Category not found."
        });
      }

      //  Iterates over each event ID in the eventsList of the found category.
      for (const eventId of category.eventsList) {
        //  The loop is called to delete each event by its ID.
        await Event.findByIdAndDelete(eventId);
      }

      // After deleting all associated events, the category itself is deleted from the database.
      await Category.deleteOne({
        categoryId: categoryId
      });

      // Increment the deleteCount and deletedCount in the Operation model
      await statsOperation.incrementDeleteCount();

      //  After deleting, fetches and sends the updated delete count in the response.
      const stats = await statsOperation.getStats();

      res.json({
        acknowledged: true,
        deleteCount: stats.deletedCount,
        message: "Category and associated events deleted successfully."
      });

    } catch (err) {
      res.status(404).json({
        error: 'Failed to delete category'
      });
    }
  },

  /**
   * Update a category's name and description by ID.
   * @async
   * @function
   * @memberof CategoryController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  updateCategoryById: async function (req, res) {
    try {
      // Extracts the category ID, categoryName and categoryDescription from the request body.
      const {
        categoryId,
        categoryName,
        categoryDescription
      } = req.body;
  
      // Update the category with the provided values.
      const updatedCategory = await Category.findOneAndUpdate({
        categoryId: categoryId
      }, {
        categoryName: categoryName,
        categoryDescription: categoryDescription
      }, {
        new: true,
        runValidators: true // This will run the model's validators, including the one for categoryName
      });
  
      // Check if the category was found and updated
      if (!updatedCategory) {
        return res.status(404).json({ status: "ID not found" });
      }
  
      // Increment the update count in the Operation model
      await statsOperation.incrementUpdateCount();
  
      res.json({
        status: "Category updated successfully"
      });
  
    } catch (err) {
      // If there's a validation error, it will come through here.
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          error: err.message
        });
      }
      res.status(400).json({
        error: 'Failed to update category'
      });
    }
  },

	getCategoryDetails: async function(req, res) {
		try {
			// Extract the categoryId from the request parameters
			const categoryId = req.params.categoryId;
	
			// Find the category by its ID and populate its eventsList
			const category = await Category.findOne({ categoryId: categoryId }).populate('eventsList');
	
			// If no category is found, send a 404 Not Found response
			if (!category) {
				return res.status(404).json({ message: "Category not found." });
			}
	
			// Send the found category (with its associated events) as a response
			res.json(category);
	
		} catch (err) {
			console.error("Failed to fetch category details:", err);
			res.status(400).json({ error: "Failed to fetch category details" });
		}
	}
}
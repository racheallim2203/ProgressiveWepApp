const Category = require("../models/eventCategory");
const Event = require("../models/events");
const statsOperation = require('../models/operation');

/**
 * @typedef {object} EventObject
 * @property {string} eventName - The name of the event.
 * @property {string} eventDescription - The description of the event.
 * @property {string} eventDate - The date of the event.
 * @property {string} eventDuration - The duration of the event.
 * @property {boolean} eventIsActive - Indicates whether the event is active.
 * @property {string} eventImage - The path to the event's image.
 * @property {number} eventCapacity - The capacity of the event.
 * @property {number} eventTicketQty - The number of tickets available for the event.
 * @property {string} eventCategories - Comma-separated category IDs associated with the event.
 * @property {Array<string>} eventCategoriesList - Array of category IDs associated with the event.
 */

/**
 * Controller module for handling event-related operations.
 * @namespace EventController
 */

module.exports = {

  /**
   * Add a new event and associate it with categories.
   * @async
   * @function
   * @memberof EventController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  addEvent: async function (req, res) {

    try {
      let aEvent = new Event({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventDuration: req.body.eventDuration,
        eventIsActive: req.body.eventIsActive,
        eventImage: req.file ? '/Uploads/' + req.file.filename : null,
        eventCapacity: req.body.eventCapacity,
        eventTicketQty: req.body.eventTicketQty,
        eventCategories: req.body.eventCategories,
      });

      // split apart a string separated by commas into an array
      const inputCategories = aEvent.eventCategories
      aEvent.eventCategoriesList = inputCategories.split(',').map(item => item.trim());

      // check if event is valid: WHAT IS INVALID DATA?
      // if (
      //   aEvent.eventDuration < 0 ||
      //   aEvent.eventTicketQty < 0 ||
      //   aEvent.eventCapacity < 10 || aEvent.eventCapacity > 2000
      // ) {
      //   return res.status(400).json({
      //     message: "Invalid data. Please check eventDuration, eventTicketQty, and eventCapacity."
      //   });
      // }


      // Increment the addCount and createdCount in the Counter model
      await statsOperation.incrementAddCount();

      // Add the event to multiple categories
      for (const categoryId of aEvent.eventCategoriesList) {

        // Find the category by categoryId
        const category = await Category.findOne({
          categoryId: categoryId
        });

        // If category isn't found
        if (!category) {
          console.log("category found status: " + !category)
          return res.status(404).json({
            message: "Category not found."
          });

        } else {
          // pushing the category into the categoryList 
          console.log("adding category into the database")
          aEvent.categoryList.push(category._id)

          // push event into category eventList
          category.eventsList.push(aEvent._id);

          // Save the both updated event and category
          await category.save();
          await aEvent.save();
        }
      }
      res.json(aEvent)
    } catch (error) {
      console.error("Failed to add event:", error);
      res.status(400).json({
        error: "Invalid Data"
      });
    }
  },


  /**
   * List all events with populated categories.
   * @async
   * @function
   * @memberof EventController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  listEvents: async function (req, res) {
    try {
      // Fetch all events from the database and populate the categories for each category
      const events = await Event.find().populate('categoryList');

      // Send the populated categories as a response
      res.json(events);

    } catch (err) {
      res.status(400).json({
        error: 'Failed to fetch categories and events.'
      });
    }
  },

  /**
   * Delete an event by ID and remove its association with categories.
   * @async
   * @function
   * @memberof EventController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  // Delete category by ID
  deleteEventById: async function (req, res) {
    try {
      let eventId = req.body.eventId;
      let deleteCount = 0;

      // Find the event by eventId
      const event = await Event.findOne({
        eventId: eventId
      });

      if (!event) {
        return res.status(404).json({
          message: "Category not found."
        });
      } else {

        // Delete the event from all categories it belongs to
        for (let categoryId of event.eventCategoriesList) {

          const category = await Category.findOne({
            categoryId: categoryId
          });

          for (let i = 0; i < category.eventsList.length; i++) {

            if (category.eventsList[i].equals(event._id)) {
              category.eventsList.splice(i, 1); // Remove the element at index i
              await category.save(); // save the changes made to the eventList
              i--; // Adjust the index after removal
              deleteCount++;
            }
          }
        }

        // After deleting all associated categories, the event itself is deleted from the database.
        await Event.deleteOne({
          eventId: eventId
        });

        // Increment the deleteCount and deletedCount in the Counter model
        await statsOperation.incrementDeleteCount();

        // Fetch the updated deleteCount from the Counter model
        const stats = await statsOperation.getStats();

        res.json({
          acknowledged: true,
          deleteCount: stats.deletedCount,
          message: "Event and associated categories deleted successfully."
        });
      }
    } catch (err) {
      res.status(400).json({
        error: 'Failed to delete event'
      });
    }
  },


  /**
   * Update an event's name and capacity by ID.
   * @async
   * @function
   * @memberof EventController
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {void}
   */

  updateEventById: async function (req, res) {
    try {
      const {
        eventId,
        eventName,
        eventCapacity
      } = req.body;


      // check if event is valid: WHAT IS INVALID DATA?
      if (req.body.eventCapacity < 10 || req.body.eventCapacity > 2000) {
        return res.status(400).json({
          message: "Invalid data. Please check eventCapacity."
        });
      }

      // Update the event using its custom eventId, new name, and capacity
      const updatedEvent = await Event.findOneAndUpdate({
        eventId: eventId
      }, {
        eventName: eventName,
        eventCapacity: eventCapacity
      }, {
        new: true
      }); // 'new: true' returns the updated document

      // Check if the event was found and updated
      if (!updatedEvent) {
        return res.status(404).json({
          status: "ID not found"
        });
      }

      // Increment the updatecount in the Counter model
      await statsOperation.incrementUpdateCount();

      res.json({
        status: "Event updated successfully"
      });

    } catch (err) {
      res.status(400).json({
        error: 'Failed to update event'
      });
    }
  },

  getEventDetails: async function (req, res) {
    try {
      // Extract the categoryId from the request parameters
      const eventId = req.params.eventId;

      // Find the category by its ID
      const event = await Event.findOne({
        eventId: eventId
      });

      // If no category is found, send a 404 Not Found response
      console.log("the result of !event is: " + !event)
      if (!event) {
        return res.status(404).json({
          message: "Event not found."
        });
      }

      // Send the found category as a response
      res.json(event);

    } catch (err) {
      console.error("Failed to fetch event details:", err);
      res.status(400).json({
        error: "Failed to fetch event details"
      });
    }
  }
}
